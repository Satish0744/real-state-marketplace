import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Star, Award, Users, Languages, ChevronLeft, User } from 'lucide-react';
import { agents } from '../data/agents';
import { properties } from '../data/properties';
import PropertyCard from '../components/property/PropertyCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const AgentDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const agent = agents.find((a) => a.id === Number(id));

  if (!agent) {
    return (
      <div className="container-custom py-20">
        <EmptyState
          icon={User}
          title="Agent not found"
          description="The agent you're looking for doesn't exist."
          action={<Link to="/agents" className="btn-primary">View All Agents</Link>}
        />
      </div>
    );
  }

  const agentProperties = properties.filter((p) => p.agent.id === agent.id);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <Link to="/agents" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 font-medium">
          <ChevronLeft size={18} /> Back to Agents
        </Link>

        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-primary-100"
              />
              <h1 className="text-2xl font-bold mt-4">{agent.name}</h1>
              <p className="text-gray-500 mb-3">Real Estate Agent</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{agent.rating}</span>
                <span className="text-sm text-gray-500">({agent.dealsClosed} deals)</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed">{agent.bio}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Award, label: 'Experience', value: agent.experience },
                  { icon: Users, label: 'Properties', value: agent.properties },
                  { icon: MapPin, label: 'Location', value: agent.location },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                    <item.icon size={20} className="text-primary-600 mb-2" />
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.specializations.map((s) => (
                    <span key={s} className="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Languages size={18} /> Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((l) => (
                    <span key={l} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {user ? (
                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${agent.phone}`}>
                    <Button className="flex items-center gap-2">
                      <Phone size={16} /> {agent.phone}
                    </Button>
                  </a>
                  <a href={`mailto:${agent.email}`}>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Mail size={16} /> Send Email
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-700 mb-3">Login to view contact details</p>
                  <Link to="/login"><Button size="sm">Login</Button></Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {agentProperties.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Properties by {agent.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentProperties.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDetail;