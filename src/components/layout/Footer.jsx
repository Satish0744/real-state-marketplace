import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Globe, Send, Camera, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Home className="text-white" size={22} />
              </div>
              <span className="text-xl font-bold text-white">
                Estate<span className="text-primary-400">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. Explore thousands of listings across India.
            </p>
            <div className="flex gap-3">
              {[Globe, Send, Camera, Briefcase].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Properties', 'Agents', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Property Types</h4>
            <ul className="space-y-2 text-sm">
              {['Apartments', 'Villas', 'Commercial', 'Land', 'Farmhouse'].map((item) => (
                <li key={item}>
                  <Link to="/properties" className="hover:text-primary-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span>123 Business Park, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-400 flex-shrink-0" />
                <span>hello@estatehub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2024 EstateHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-400">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400">Terms of Service</a>
            <a href="#" className="hover:text-primary-400">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;