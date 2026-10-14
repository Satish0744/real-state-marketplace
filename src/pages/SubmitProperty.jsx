import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X, Home, MapPin, DollarSign, Info } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const SubmitProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'Apartment',
    category: 'Residential',
    priceType: 'sale',
    price: '',
    location: '',
    city: '',
    state: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    amenities: [],
    images: [],
  });
  const [imageUrl, setImageUrl] = useState('');

  const amenitiesList = ['Parking', 'Gym', 'Pool', 'Security', 'Lift', 'Power Backup', 'Garden', 'Clubhouse', 'WiFi', 'AC'];

  const toggleAmenity = (a) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
  };

  const addImage = () => {
    if (imageUrl && !form.images.includes(imageUrl)) {
      setForm({ ...form, images: [...form.images, imageUrl] });
      setImageUrl('');
    }
  };

  const removeImage = (url) => {
    setForm({ ...form, images: form.images.filter((i) => i !== url) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('Property submitted successfully! It will be reviewed shortly.');
    setLoading(false);
    navigate('/properties');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">Post Your Property</h1>
            <p className="text-primary-100">Fill in the details below to list your property. It's free!</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 space-y-8">
            {/* Basic Info */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info size={20} className="text-primary-600" /> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Property Title"
                    placeholder="e.g., Luxury 3BHK Apartment with Sea View"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="input-field"
                  >
                    {['Apartment', 'Villa', 'House', 'Commercial', 'Land', 'Penthouse', 'Farmhouse'].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-field"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-primary-600" /> Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Type</label>
                  <div className="flex gap-2">
                    {['sale', 'rent'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, priceType: t })}
                        className={`flex-1 py-3 rounded-lg font-semibold capitalize transition-colors ${
                          form.priceType === t
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        For {t}
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  label="Price (₹)"
                  type="number"
                  placeholder="e.g., 8500000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary-600" /> Location Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Area/Locality"
                  placeholder="e.g., Bandra West"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                />
                <Input
                  label="City"
                  placeholder="e.g., Mumbai"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                />
                <Input
                  label="State"
                  placeholder="e.g., Maharashtra"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Home size={20} className="text-primary-600" /> Property Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Bedrooms"
                  type="number"
                  placeholder="e.g., 3"
                  value={form.bedrooms}
                  onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                />
                <Input
                  label="Bathrooms"
                  type="number"
                  placeholder="e.g., 2"
                  value={form.bathrooms}
                  onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                />
                <Input
                  label="Area (sqft)"
                  type="number"
                  placeholder="e.g., 1500"
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  rows="5"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your property in detail..."
                  className="input-field resize-none"
                  required
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      form.amenities.includes(a)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Upload size={20} className="text-primary-600" /> Property Images
              </h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image URL here"
                  className="input-field flex-1"
                />
                <Button type="button" onClick={addImage}>Add</Button>
              </div>
              {form.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative group">
                      <img src={url} alt={`Upload ${i + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(url)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">Add at least one image URL. (Demo uses URLs)</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" isLoading={loading} className="flex-1">
                Submit Property
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitProperty;