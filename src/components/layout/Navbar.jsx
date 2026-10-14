import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Heart,
  Scale,
  User,
  LogOut,
  Home,
  Search,
  PlusCircle,
  Info,
  Phone,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWishlist } from '../../hooks/useWishlist';
import { useCompare } from '../../hooks/useCompare';
import { cn } from '../../utils/cn';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClick = () => setUserMenu(false);
    if (userMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [userMenu]);

  const navLinks = [
   
    { name: 'Properties', path: '/properties', icon: Search },
    { name: 'Projects', path: '/projects', icon: Building2 },
    { name: 'Agents', path: '/agents', icon: User },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-40 transition-all duration-300',
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-4'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
            <Home className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Estate<span className="text-primary-600">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-100'
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/wishlist"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Wishlist"
          >
            <Heart size={22} className="text-gray-700" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/compare"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Compare"
          >
            <Scale size={22} className="text-gray-700" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {compareList.length}
              </span>
            )}
          </Link>

          <Link to="/submit-property">
            <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
              <PlusCircle size={18} /> Post Property
            </button>
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenu(!userMenu);
                }}
                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full border-2 border-primary-500 object-cover"
                />
              </button>

              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <User size={16} /> Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
              <Link to="/signup">
                <button className="btn-outline py-2 px-4 text-sm">Sign Up</button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    )
                  }
                >
                  <link.icon size={18} /> {link.name}
                </NavLink>
              ))}

              <div className="border-t border-gray-100 my-3 pt-3 space-y-2">
                <Link
                  to="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg"
                >
                  <span className="flex items-center gap-3">
                    <Heart size={18} /> Wishlist
                  </span>
                  <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                </Link>

                <Link
                  to="/compare"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg"
                >
                  <span className="flex items-center gap-3">
                    <Scale size={18} /> Compare
                  </span>
                  <span className="bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {compareList.length}
                  </span>
                </Link>

                <Link
                  to="/submit-property"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg"
                >
                  <PlusCircle size={18} /> Post Property
                </Link>
              </div>

              <div className="border-t border-gray-100 pt-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 rounded-lg transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 p-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="btn-outline text-center py-2"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary text-center py-2"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;