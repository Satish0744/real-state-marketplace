import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { properties } from '../../data/properties';
import PropertyCard from '../property/PropertyCard';

const FeaturedProperties = () => {
  const featured = properties.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <p className="text-primary-600 font-semibold mb-2">FEATURED LISTINGS</p>
            <h2 className="section-title">Explore Our Premium Properties</h2>
          </div>
          <Link to="/properties" className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
            View All Properties <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;