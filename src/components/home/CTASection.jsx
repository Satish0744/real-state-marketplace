import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden p-8 md:p-16"
        >
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920"
              alt="bg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Have a Property to Sell or Rent?
            </motion.h2>
            <p className="text-gray-300 text-lg mb-8">
              List your property with us and reach thousands of potential buyers and tenants. Posting is free!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/submit-property">
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors">
                  <PlusCircle size={20} /> Post Property Free
                </button>
              </Link>
              <Link to="/contact">
                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors">
                  Contact Us <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;