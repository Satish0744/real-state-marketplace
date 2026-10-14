import { X, Star, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../../hooks/useCompare';
import { formatPrice } from '../../utils/format';
import EmptyState from '../common/EmptyState';
import { Scale } from 'lucide-react';

const PropertyComparison = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <EmptyState
        icon={Scale}
        title="No properties to compare"
        description="Add properties from the listings to compare them side by side."
        action={
          <Link to="/properties" className="btn-primary">
            Browse Properties
          </Link>
        }
      />
    );
  }

  const fields = [
    { label: 'Price', key: 'price', render: (p) => formatPrice(p.price) },
    { label: 'Type', key: 'type' },
    { label: 'Location', key: 'location' },
    { label: 'Bedrooms', key: 'bedrooms' },
    { label: 'Bathrooms', key: 'bathrooms' },
    { label: 'Area', key: 'area', render: (p) => `${p.area} ${p.areaUnit}` },
    { label: 'Year Built', key: 'yearBuilt' },
    { label: 'Facing', key: 'facing' },
    { label: 'Parking', key: 'parking' },
    { label: 'Rating', key: 'rating' },
    { label: 'Agent', key: 'agent', render: (p) => p.agent.name },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Comparing {compareList.length} Properties</h2>
        <button onClick={clearCompare} className="text-red-600 font-semibold hover:underline">
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="p-4 text-left font-semibold text-gray-700 bg-gray-50 sticky left-0">Feature</th>
              {compareList.map((p) => (
                <th key={p.id} className="p-4 text-left min-w-[250px] relative">
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <X size={14} />
                  </button>
                  <Link to={`/property/${p.id}`}>
                    <img src={p.images[0]} alt={p.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                    <p className="font-bold text-sm hover:text-primary-600">{p.title}</p>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((field, i) => (
              <tr key={field.key} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-4 font-semibold text-gray-700 sticky left-0 bg-inherit">{field.label}</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4">
                    {field.render ? field.render(p) : p[field.key] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-50">
              <td className="p-4 font-semibold text-gray-700 sticky left-0 bg-inherit">Amenities</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.amenities.slice(0, 5).map((a) => (
                      <span key={a} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                        {a}
                      </span>
                    ))}
                    {p.amenities.length > 5 && (
                      <span className="text-xs text-gray-500">+{p.amenities.length - 5} more</span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyComparison;