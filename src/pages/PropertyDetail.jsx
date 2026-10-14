import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Bed, Bath, Square, Heart, Scale, Share2, Star, Calendar,
  Check, Phone, Mail, User, ChevronLeft, Building2
} from 'lucide-react';
import { properties } from '../data/properties';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertyCard from '../components/property/PropertyCard';
import { useWishlist } from '../hooks/useWishlist';
import { useCompare } from '../hooks/useCompare';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/format';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const property = properties.find((p) => p.id === Number(id));
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCompare, compareList } = useCompare();

  if (!property) {
    return (
      <div className="container-custom py-20">
        <EmptyState
          icon={Building2}
          title="Property not found"
          description="The property you're looking for doesn't exist or has been removed."
          action={<Link to="/properties" className="btn-primary">Browse Properties</Link>}
        />
      </div>
    );
  }

  const wishlisted = isInWishlist(property.id);
  const inCompare = compareList.some((p) => p.id === property.id);

  const similarProperties = properties
    .filter((p) => p.id !== property.id && p.type === property.type)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 font-medium"
        >
          <ChevronLeft size={18} /> Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery images={property.images} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                    {property.featured && (
                      <span className="bg-accent-50 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <p className="text-gray-600 flex items-center gap-1.5">
                    <MapPin size={16} className="text-primary-600" />
                    {property.location}, {property.state}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl md:text-4xl font-bold text-primary-600">
                    {formatPrice(property.price)}
                    {property.priceType === 'rent' && <span className="text-lg text-gray-500">/mo</span>}
                  </p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{property.rating}</span>
                    <span className="text-xs text-gray-500">({property.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  variant={wishlisted ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => wishlisted ? removeFromWishlist(property.id) : addToWishlist(property)}
                  className="flex-1 sm:flex-none"
                >
                  <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                  {wishlisted ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant={inCompare ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => !inCompare && addToCompare(property)}
                  className="flex-1 sm:flex-none"
                >
                  <Scale size={16} /> {inCompare ? 'In Compare' : 'Compare'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="flex-1 sm:flex-none">
                  <Share2 size={16} /> Share
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100">
                {[
                  { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
                  { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                  { icon: Square, label: 'Area', value: `${property.area} ${property.areaUnit}` },
                  { icon: Calendar, label: 'Year Built', value: property.yearBuilt || 'N/A' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon size={22} className="text-primary-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-700">
                      <div className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-primary-600" />
                      </div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {[
                    { label: 'Type', value: property.type },
                    { label: 'Category', value: property.category },
                    { label: 'Facing', value: property.facing },
                    { label: 'Parking', value: `${property.parking} vehicles` },
                    { label: 'Price Type', value: property.priceType === 'rent' ? 'For Rent' : 'For Sale' },
                    { label: 'Status', value: property.status || 'Ready to Move' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-gray-500 mb-1">{item.label}</p>
                      <p className="font-semibold text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="rounded-xl overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={40} className="text-primary-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">{property.location}</p>
                  <p className="text-gray-600 text-sm">{property.city}, {property.state}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 space-y-6"
            >
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Listed By</h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{property.agent.name}</p>
                    <p className="text-sm text-gray-500">{property.agent.experience} experience</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold">{property.agent.rating}</span>
                    </div>
                  </div>
                </div>

                {user ? (
                  <div className="space-y-2">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      <Phone size={16} /> {property.agent.phone}
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center justify-center gap-2 w-full py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                    >
                      <Mail size={16} /> Send Email
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 text-center">
                      Please login to view contact details
                    </p>
                    <Link to="/login" className="block">
                      <Button className="w-full">Login to Contact</Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Interested in this property?</h3>
                <p className="text-sm text-primary-100 mb-4">
                  Schedule a visit with our agent to see this property in person.
                </p>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-primary-700 hover:bg-gray-100"
                  onClick={() => toast.success('Visit request sent!')}
                >
                  Schedule Visit
                </Button>
              </div>
            </motion.div>
          </aside>
        </div>

        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;