import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, Star, BadgeCheck, Award, Languages } from 'lucide-react';

const AgentCard = ({ agent, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="card p-6 text-center"
    >
      <div className="relative inline-block">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-24 h-24 rounded-full mx-auto border-4 border-primary-100 object-cover"
        />
        {agent.rating >= 4.8 && (
          <span className="absolute -bottom-1 -right-1 bg-primary-600 text-white rounded-full p-1.5 border-2 border-white">
            <BadgeCheck size={14} />
          </span>
        )}
      </div>

      <h3 className="font-bold text-lg mt-4">{agent.name}</h3>
      <p className="text-sm text-gray-500 mb-2">Real Estate Agent</p>

      <div className="flex items-center justify-center gap-1 mb-3">
        <Star size={14} className="text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-semibold">{agent.rating}</span>
        <span className="text-xs text-gray-500">({agent.properties} listings)</span>
      </div>

      <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mb-3">
        <MapPin size={14} /> {agent.location}
      </p>

      <div className="flex justify-center gap-3 mb-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Award size={12} className="text-primary-600" /> {agent.dealsClosed} deals
        </span>
        <span className="flex items-center gap-1">
          <Languages size={12} className="text-primary-600" /> {agent.languages.length} langs
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center mb-4">
        {agent.specializations.slice(0, 2).map((s) => (
          <span key={s} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full">
            {s}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <a
          href={`tel:${agent.phone}`}
          className="flex-1 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone size={14} /> Call
        </a>
        <Link
          to={`/agents/${agent.id}`}
          className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-semibold transition-colors"
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  );
};

export default AgentCard;