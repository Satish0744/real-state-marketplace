import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Home, Building, MapPin, Trees, Crown } from 'lucide-react';
import { categories } from '../../data/categories';

const iconMap = { Building2, Home, Building, MapPin, Trees, Crown };

const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary-600 font-semibold mb-2">BROWSE CATEGORIES</p>
          <h2 className="section-title">Explore Property Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Discover your perfect property from our wide range of categories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/properties?type=${cat.name}`}
                  className="block bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.count}+ listings</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;