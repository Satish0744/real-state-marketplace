import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, Hammer, MapPin, TrendingUp, Calendar, IndianRupee,
  ArrowRight, Search, Filter, HardHat, LandPlot, Clock, CheckCircle2,
} from 'lucide-react';
import { projects } from '../data/projects';
import { formatPrice } from '../utils/format';
import { cn } from '../utils/cn';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all'); // all | under-construction | future
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All');

  // Unique cities
  const cities = useMemo(() => {
    const set = new Set(projects.map((p) => p.city));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filter
  const filtered = useMemo(() => {
    let result = [...projects];
    if (activeTab !== 'all') result = result.filter((p) => p.status === activeTab);
    if (city !== 'All') result = result.filter((p) => p.city === city);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, city, search]);

  const counts = {
    all: projects.length,
    'under-construction': projects.filter((p) => p.status === 'under-construction').length,
    future: projects.filter((p) => p.status === 'future').length,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920"
            alt="bg"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20"
          >
            <HardHat size={16} className="text-accent-300" />
            <span>Ongoing & Upcoming Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
          >
            Watch Your Future Home{' '}
            <span className="text-primary-300">Being Built</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-100 max-w-2xl mx-auto"
          >
            Explore our under-construction projects and upcoming land developments.
            Track progress, view materials, and follow every brick from foundation to handover.
          </motion.p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'all', label: 'All Projects', icon: Building2 },
              { key: 'under-construction', label: 'Under Construction', icon: Hammer },
              { key: 'future', label: 'Future / Land', icon: LandPlot },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <tab.icon size={16} />
                {tab.label}
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  )}
                >
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search + City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects by name or location..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Cities' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="container-custom pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {filtered.length} {filtered.length === 1 ? 'Project' : 'Projects'} Found
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-600">Try changing filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
};

/* ---------------- Project Card ---------------- */
const ProjectCard = ({ project, index }) => {
  const isFuture = project.status === 'future';
  const unitsLeft = project.totalUnits - project.unitsSold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="card overflow-hidden group"
    >
      {/* Image */}
      <Link to={`/projects/${project.id}`} className="block relative">
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 left-4">
            {isFuture ? (
              <span className="inline-flex items-center gap-1.5 bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <LandPlot size={12} /> Future Project
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Hammer size={12} /> Under Construction
              </span>
            )}
          </div>

          {/* Progress pill */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <TrendingUp size={12} className="text-primary-600" />
            <span className="text-xs font-bold text-gray-900">
              {project.progressPercent}%
            </span>
          </div>

          {/* Bottom overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-white/80 mb-1">Starting from</p>
              <p className="text-white font-bold text-xl">
                {formatPrice(project.priceFrom)}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-primary-600 font-semibold mb-2">
          <Building2 size={12} />
          {project.projectType}
        </div>

        <Link to={`/projects/${project.id}`}>
          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1 hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 flex items-center gap-1 mb-3 line-clamp-1">
          <MapPin size={13} className="text-primary-600 flex-shrink-0" />
          {project.location}
        </p>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.tagline}
        </p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span>Construction Progress</span>
            <span className="font-bold text-primary-600">{project.progressPercent}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progressPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className={cn(
                'h-full rounded-full',
                isFuture ? 'bg-accent-500' : 'bg-primary-600'
              )}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-0.5">Total</p>
            <p className="font-bold text-sm text-gray-900">{project.totalUnits}</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-xs text-gray-500 mb-0.5">Sold</p>
            <p className="font-bold text-sm text-gray-900">{project.unitsSold}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-0.5">Left</p>
            <p className="font-bold text-sm text-primary-600">{unitsLeft}</p>
          </div>
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          View Full Details <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default Projects;