import { motion } from 'framer-motion';
import { Search, MapPin, Home, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/properties?search=${search}&type=${type}`);
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <TrendingUp size={16} className="text-accent-400" />
            <span>#1 Real Estate Marketplace in India</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Find Your <span className="text-primary-400">Dream</span> Home Today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-200 mb-8"
          >
            Explore thousands of verified properties across India. Buy, sell, or rent with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-2 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-3">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by location, title..."
                  className="w-full focus:outline-none text-gray-800"
                />
              </div>
              <div className="hidden md:block w-px bg-gray-200 my-2" />
              <div className="flex items-center gap-2 px-4 py-3 md:w-40">
                <Home size={18} className="text-gray-400 flex-shrink-0" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full focus:outline-none bg-transparent text-gray-800 font-medium"
                >
                  {['All', 'Apartment', 'Villa', 'House', 'Commercial', 'Land'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 justify-center"
              >
                <Search size={18} /> Search
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mt-10 max-w-md"
          >
            {[
              { value: '10K+', label: 'Properties' },
              { value: '5K+', label: 'Happy Clients' },
              { value: '500+', label: 'Trusted Agents' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;