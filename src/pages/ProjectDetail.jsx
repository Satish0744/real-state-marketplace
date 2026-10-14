import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Building2, Hammer, Calendar, TrendingUp, IndianRupee, Users,
  CheckCircle2, Clock, Phone, Mail, ChevronLeft, Star, Layers, Boxes,
  Grid3x3, DoorOpen, Zap, Home, User, FileText, Share2, Heart,
  ArrowRight, LandPlot, Award, AlertCircle, CheckCircle,
} from 'lucide-react';
import { getProjectById, projects } from '../data/projects';
import { formatPrice } from '../utils/format';
import { cn } from '../utils/cn';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import toast from 'react-hot-toast';

const materialIconMap = { Layers, Boxes, Grid3x3, DoorOpen, Zap, Home, Leaf: Home, Building2 };

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // overview | timeline | materials | customer

  if (!project) {
    return (
      <div className="container-custom py-20">
        <EmptyState
          icon={Building2}
          title="Project not found"
          description="The project you're looking for doesn't exist or has been removed."
          action={<Link to="/projects" className="btn-primary">Browse Projects</Link>}
        />
      </div>
    );
  }

  const isFuture = project.status === 'future';
  const unitsLeft = project.totalUnits - project.unitsSold;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  // Similar projects (same status, different id)
  const similar = projects
    .filter((p) => p.id !== project.id && p.status === project.status)
    .slice(0, 3);

  const tabs = [
    { key: 'overview', label: 'Overview', icon: FileText },
    { key: 'timeline', label: 'Timeline', icon: Clock },
    { key: 'materials', label: 'Materials', icon: Layers },
    { key: 'customer', label: 'Customer', icon: User },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-8">
      <div className="container-custom">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 font-medium"
        >
          <ChevronLeft size={18} /> Back to Projects
        </button>

        {/* Hero Header */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          {/* Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            <div className="lg:col-span-2 relative h-72 md:h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={project.gallery[activeImage]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

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

              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                {activeImage + 1} / {project.gallery.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-1 h-24 lg:h-96">
              {project.gallery.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'relative overflow-hidden',
                    activeImage === i ? 'ring-3 ring-primary-600 ring-inset' : 'opacity-80 hover:opacity-100'
                  )}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title block */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex-1 min-w-[260px]">
                <div className="flex items-center gap-2 text-xs text-primary-600 font-semibold mb-2">
                  <Building2 size={13} />
                  {project.projectType} • RERA: {project.reraNumber}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h1>

                <p className="text-gray-600 flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-primary-600" />
                  {project.location}
                </p>

                <p className="text-gray-700 italic mb-4">"{project.tagline}"</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Starting Price</p>
                <p className="text-2xl md:text-3xl font-bold text-primary-600 mb-3">
                  {formatPrice(project.priceFrom)}
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleShare}
                    className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => toast.success('Added to wishlist')}
                    className="p-2.5 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                  >
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress bar (large) */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 md:p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary-600" />
                  <span className="font-semibold text-gray-900">
                    Construction Progress
                  </span>
                </div>
                <span className="text-2xl font-bold text-primary-600">
                  {project.progressPercent}%
                </span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progressPercent}%` }}
                  transition={{ duration: 1.2 }}
                  className={cn(
                    'h-full rounded-full',
                    isFuture ? 'bg-accent-500' : 'bg-primary-600'
                  )}
                />
              </div>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Building2, label: 'Total Units', value: project.totalUnits },
                { icon: Users, label: 'Units Sold', value: project.unitsSold },
                { icon: Award, label: 'Available', value: unitsLeft },
                { icon: Calendar, label: 'Completion', value: new Date(project.handoverDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                  <s.icon size={18} className="text-primary-600 mb-2" />
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  <p className="font-bold text-gray-900">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <div className="border-b border-gray-100 overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all relative whitespace-nowrap',
                    activeTab === tab.key
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === 'overview' && <OverviewTab project={project} />}
                {activeTab === 'timeline' && <TimelineTab project={project} />}
                {activeTab === 'materials' && <MaterialsTab project={project} />}
                {activeTab === 'customer' && <CustomerTab project={project} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Contact / Site office */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Phone size={18} className="text-primary-600" /> Site Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Site Engineer</span>
                <span className="font-semibold">{project.contact.siteEngineer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <a href={`tel:${project.contact.phone}`} className="font-semibold text-primary-600">
                  {project.contact.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <a href={`mailto:${project.contact.email}`} className="font-semibold text-primary-600">
                  {project.contact.email}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Site Office</span>
                <span className="font-semibold text-right max-w-[60%]">{project.contact.siteOffice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Visiting Hours</span>
                <span className="font-semibold">{project.contact.visitingHours}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-3">Interested in {project.title}?</h3>
            <p className="text-primary-100 text-sm mb-5">
              Schedule a site visit or get in touch with our sales team for pricing,
              availability, and payment plans.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toast.success('Site visit request sent!')}
                className="bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Book Site Visit
              </button>
              <a
                href={`tel:${project.contact.phone}`}
                className="border-2 border-white/70 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Phone size={14} /> Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Similar projects */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="card overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-full px-3 py-1 text-xs font-bold">
                      {p.progressPercent}% complete
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 hover:text-primary-600 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                      <MapPin size={13} className="text-primary-600" /> {p.location}
                    </p>
                    <p className="text-primary-600 font-bold">
                      From {formatPrice(p.priceFrom)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= TABS ================= */

const OverviewTab = ({ project }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl font-bold mb-3">About This Project</h2>
      <p className="text-gray-700 leading-relaxed">{project.description}</p>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4">Project Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {project.highlights.map((h) => (
          <div key={h} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 size={14} className="text-primary-600" />
            </div>
            <span className="text-gray-700 text-sm">{h}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {project.amenities.map((a) => (
          <div key={a} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
            <div className="w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle size={14} className="text-primary-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{a}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4">Key Dates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Project Started', value: project.startDate },
          { label: 'Expected Completion', value: project.expectedCompletion },
          { label: 'Handover Date', value: project.handoverDate },
        ].map((d) => (
          <div key={d.label} className="bg-primary-50 rounded-xl p-4 border border-primary-100">
            <p className="text-xs text-gray-500 mb-1">{d.label}</p>
            <p className="font-bold text-gray-900">
              {new Date(d.value).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TimelineTab = ({ project }) => (
  <div>
    <h2 className="text-xl font-bold mb-6">Project Timeline</h2>
    <div className="space-y-4">
      {project.timeline.map((step, i) => {
        const isComplete = step.status === 'completed';
        const isInProgress = step.status === 'in-progress';

        return (
          <motion.div
            key={step.stage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2',
                  isComplete
                    ? 'bg-green-500 border-green-500 text-white'
                    : isInProgress
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-600'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                )}
              >
                {isComplete ? (
                  <CheckCircle size={18} />
                ) : isInProgress ? (
                  <Clock size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
              </div>
              {i < project.timeline.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 flex-1 mt-2',
                    isComplete ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex-1 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-gray-900">{step.stage}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{step.date}</span>
                  <span
                    className={cn(
                      'text-xs font-bold px-2.5 py-1 rounded-full uppercase',
                      isComplete
                        ? 'bg-green-100 text-green-700'
                        : isInProgress
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {step.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const MaterialsTab = ({ project }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold mb-2">Material & Construction Details</h2>
      <p className="text-gray-600 text-sm mb-6">
        Complete bill-of-materials used in this project — from bricks and sand to
        steel and marble. This gives full transparency into what your home is built with.
      </p>
    </div>

    {project.materials.map((cat, idx) => {
      const Icon = materialIconMap[cat.icon] || Layers;

      return (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
        >
          <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-gray-100">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Icon size={20} className="text-primary-600" />
            </div>
            <h3 className="font-bold text-gray-900">{cat.category}</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {cat.items.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 px-5 py-4 hover:bg-white transition-colors"
              >
                <div className="sm:col-span-5">
                  <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.brand}</p>
                </div>
                <div className="sm:col-span-3">
                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="font-semibold text-sm">{item.qty}</p>
                </div>
                <div className="sm:col-span-4 sm:text-right">
                  <p className="text-xs text-gray-500">Unit Rate</p>
                  <p className="font-bold text-primary-600 text-sm">{item.pricePerUnit}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    })}
  </div>
);

const CustomerTab = ({ project }) => {
  const c = project.customer;
  const hasCustomer = c.bookedOn && c.bookedOn !== '—';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Customer Information</h2>
        <p className="text-gray-600 text-sm mb-6">
          Details of the owner who has booked a unit in this project — showing
          full payment history and milestone tracking.
        </p>
      </div>

      {!hasCustomer ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={24} className="text-yellow-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-yellow-800 mb-1">Bookings Not Open Yet</h3>
            <p className="text-sm text-yellow-700">{c.name}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Customer card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-primary-100"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900">{c.name}</h3>
                <p className="text-sm text-gray-500">
                  Booked on {new Date(c.bookedOn).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Unit', value: c.unit },
                { label: 'Unit Type', value: c.unitType },
                { label: 'Payment Plan', value: c.paymentPlan },
                { label: 'Total Paid', value: formatPrice(c.totalPaid) },
                { label: 'Balance', value: formatPrice(c.balance) },
                { label: 'Next Milestone', value: c.nextMilestone },
                { label: 'Next Payment', value: formatPrice(c.nextPayment) },
                { label: 'Due Date', value: new Date(c.nextPaymentDue).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  }) },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment progress */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Payment Progress</h3>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(c.totalPaid / (c.totalPaid + c.balance)) * 100}%`,
                }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Paid: <strong className="text-green-600">{formatPrice(c.totalPaid)}</strong>
              </span>
              <span className="text-gray-500">
                Balance: <strong className="text-primary-600">{formatPrice(c.balance)}</strong>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;