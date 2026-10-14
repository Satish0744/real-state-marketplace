import { motion } from 'framer-motion';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: Building2, value: '10,000+', label: 'Properties Listed', color: 'from-blue-500 to-blue-700' },
    { icon: Users, value: '50,000+', label: 'Happy Customers', color: 'from-green-500 to-green-700' },
    { icon: Award, value: '500+', label: 'Expert Agents', color: 'from-purple-500 to-purple-700' },
    { icon: TrendingUp, value: '25+', label: 'Cities Covered', color: 'from-orange-500 to-orange-700' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-700 to-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Thousands Across India
          </h2>
          <p className="text-primary-100 max-w-2xl mx-auto">
            Our numbers speak for themselves. Join India's fastest growing real estate community.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="text-white" size={26} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-primary-100 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;