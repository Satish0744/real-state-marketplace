import { Link } from 'react-router-dom';
import { Heart, Scale, PlusCircle, Building2, User, Settings, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { useCompare } from '../hooks/useCompare';
import PropertyCard from '../components/property/PropertyCard';

const Dashboard = () => {
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();

  const stats = [
    { label: 'Wishlist', value: wishlist.length, icon: Heart, color: 'from-red-500 to-red-600', link: '/wishlist' },
    { label: 'Comparing', value: compareList.length, icon: Scale, color: 'from-blue-500 to-blue-600', link: '/compare' },
    { label: 'Post Property', value: 'Free', icon: PlusCircle, color: 'from-green-500 to-green-600', link: '/submit-property' },
    { label: 'Browse', value: '10K+', icon: Building2, color: 'from-purple-500 to-purple-600', link: '/properties' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-primary-100 object-cover"
            />
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Welcome, {user?.name}!
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Settings size={16} /> Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.link}
              className="bg-white rounded-2xl p-5 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Link>
          ))}
        </div>

        {wishlist.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Heart size={24} className="text-red-500" /> Your Wishlist
              </h2>
              <Link to="/wishlist" className="text-primary-600 font-semibold hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.slice(0, 3).map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp size={26} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Want to sell or rent your property?</h3>
              <p className="text-primary-100 mb-4">
                List your property for free and reach thousands of potential buyers.
              </p>
              <Link to="/submit-property">
                <button className="bg-white text-primary-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                  Post Property Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;