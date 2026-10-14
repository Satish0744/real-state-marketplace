import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import PropertyCard from '../components/property/PropertyCard';
import EmptyState from '../components/common/EmptyState';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl">
            <EmptyState
              icon={Heart}
              title="Your wishlist is empty"
              description="Start adding your favorite properties to keep track of them."
              action={<Link to="/properties" className="btn-primary">Browse Properties</Link>}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;