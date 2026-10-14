import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Square, Scale, Star } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';
import { useCompare } from '../../hooks/useCompare';
import { formatPrice } from '../../utils/format';
import { cn } from '../../utils/cn';

const PropertyCard = ({ property, index = 0 }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCompare, compareList } = useCompare();
  const wishlisted = isInWishlist(property.id);
  const inCompare = compareList.some((p) => p.id === property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="card group"
    >
      <div className="relative overflow-hidden">
        <Link to={`/property/${property.id}`}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          {property.new && (
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              New
            </span>
          )}
          {property.status === 'Under Construction' && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Under Construction
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              wishlisted ? removeFromWishlist(property.id) : addToWishlist(property);
            }}
            className={cn(
              'w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-all',
              wishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
            )}
          >
            <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!inCompare) addToCompare(property);
            }}
            className={cn(
              'w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-all',
              inCompare ? 'bg-primary-600 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
            )}
            title="Compare"
          >
            <Scale size={16} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold">{property.rating}</span>
          <span className="text-xs text-gray-500">({property.reviews})</span>
        </div>
        <div className="absolute bottom-4 right-4 bg-primary-600 text-white px-3 py-1.5 rounded-lg">
          <span className="text-lg font-bold">{formatPrice(property.price)}</span>
          {property.priceType === 'rent' && <span className="text-xs">/mo</span>}
        </div>
      </div>

      <div className="p-5">
        <Link to={`/property/${property.id}`}>
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 hover:text-primary-600 transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
          <MapPin size={14} className="text-primary-600 flex-shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-700 mb-4 py-3 border-y border-gray-100">
          <div className="flex items-center gap-1.5">
            <Bed size={16} className="text-primary-600" />
            <span className="font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={16} className="text-primary-600" />
            <span className="font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square size={16} className="text-primary-600" />
            <span className="font-medium">{property.area} {property.areaUnit}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs bg-primary-50 text-primary-700 font-semibold px-2.5 py-1 rounded-full">
            {property.type}
          </span>
          <Link
            to={`/property/${property.id}`}
            className="text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;