import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Building2, X, RotateCcw } from 'lucide-react';
import { properties as allProperties } from '../data/properties';
import PropertyCard from '../components/property/PropertyCard';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertySort from '../components/property/PropertySort';
import PropertyCardSkeleton from '../components/property/PropertyCardSkeleton';
import EmptyState from '../components/common/EmptyState';
import { useDebounce } from '../hooks/useDebounce';

const ITEMS_PER_PAGE = 9;

const priceRanges = {
  'All': [0, Infinity],
  'Under ₹10L': [0, 1000000],
  '₹10L - ₹50L': [1000000, 5000000],
  '₹50L - ₹1Cr': [5000000, 10000000],
  '₹1Cr - ₹5Cr': [10000000, 50000000],
  'Above ₹5Cr': [50000000, Infinity],
};

const defaultFilters = {
  search: '',
  type: 'All',
  city: 'All',
  priceRange: 'All',
  bedrooms: 0,
  priceType: 'all',
};

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...defaultFilters,
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || 'All',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);

  // Total unique cities
  const totalCities = useMemo(() => {
    const cities = new Set(allProperties.map((p) => p.city));
    return cities.size;
  }, []);

  // Loading simulation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  // Auto-reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Filtering logic (auto-applies as filters change)
  const filtered = useMemo(() => {
    let result = [...allProperties];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    if (filters.type !== 'All') result = result.filter((p) => p.type === filters.type);
    if (filters.city !== 'All') result = result.filter((p) => p.city === filters.city);
    if (filters.priceType !== 'all') result = result.filter((p) => p.priceType === filters.priceType);
    if (filters.bedrooms > 0) result = result.filter((p) => p.bedrooms >= filters.bedrooms);

    const [min, max] = priceRanges[filters.priceRange] || [0, Infinity];
    result = result.filter((p) => p.price >= min && p.price <= max);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'area': result.sort((a, b) => b.area - a.area); break;
      default: result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    return result;
  }, [filters, debouncedSearch, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.type !== 'All' ||
      filters.city !== 'All' ||
      filters.priceRange !== 'All' ||
      filters.bedrooms !== 0 ||
      filters.priceType !== 'all'
    );
  }, [filters]);

  const clearAllFilters = () => {
    setFilters(defaultFilters);
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Browse Properties
          </h1>
          <p className="text-gray-600">
            Find your perfect property from our curated listings across{' '}
            <span className="font-semibold text-primary-600">{totalCities} cities</span> and{' '}
            <span className="font-semibold text-primary-600">{allProperties.length}+ properties</span>
          </p>
        </motion.div>

        {/* Active filter chips */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {filters.search && (
                  <FilterChip
                    label={`Search: "${filters.search}"`}
                    onRemove={() => setFilters({ ...filters, search: '' })}
                  />
                )}
                {filters.type !== 'All' && (
                  <FilterChip
                    label={filters.type}
                    onRemove={() => setFilters({ ...filters, type: 'All' })}
                  />
                )}
                {filters.city !== 'All' && (
                  <FilterChip
                    label={filters.city}
                    onRemove={() => setFilters({ ...filters, city: 'All' })}
                  />
                )}
                {filters.priceRange !== 'All' && (
                  <FilterChip
                    label={filters.priceRange}
                    onRemove={() => setFilters({ ...filters, priceRange: 'All' })}
                  />
                )}
                {filters.bedrooms > 0 && (
                  <FilterChip
                    label={`${filters.bedrooms}+ BHK`}
                    onRemove={() => setFilters({ ...filters, bedrooms: 0 })}
                  />
                )}
                {filters.priceType !== 'all' && (
                  <FilterChip
                    label={`For ${filters.priceType}`}
                    onRemove={() => setFilters({ ...filters, priceType: 'all' })}
                  />
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 font-semibold hover:text-red-700 flex items-center gap-1 ml-2"
                >
                  <RotateCcw size={14} /> Clear All
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <PropertyFilters
              filters={filters}
              setFilters={setFilters}
              onClear={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter + Sort Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex-1 py-3 bg-white border border-gray-300 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors relative"
              >
                <SlidersHorizontal size={18} />
                Filters
                {hasActiveFilters && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    ✓
                  </span>
                )}
              </button>

              {/* Clear Button (visible on desktop when filters active) */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="hidden lg:flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                >
                  <RotateCcw size={16} /> Clear
                </button>
              )}

              {/* Sort Dropdown (opposite side) */}
              <div className="flex-1">
                <PropertySort
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  total={filtered.length}
                />
              </div>
            </div>

            {/* Property Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl">
                <EmptyState
                  icon={Building2}
                  title="No properties found"
                  description="Try adjusting your filters or search terms to find more properties."
                  action={
                    <button onClick={clearAllFilters} className="btn-primary">
                      Reset Filters
                    </button>
                  }
                />
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {paginated.map((p, i) => (
                    <PropertyCard key={p.id} property={p} index={i} />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>

                    {/* Page numbers with ellipsis for large counts */}
                    {getPageNumbers(currentPage, totalPages).map((page, idx) =>
                      page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-gray-50 z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <PropertyFilters
                filters={filters}
                setFilters={setFilters}
                onClose={() => setShowMobileFilters(false)}
                onClear={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
                isMobile
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Small helper component for filter chips
const FilterChip = ({ label, onRemove }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1.5 rounded-full border border-primary-100"
  >
    {label}
    <button
      onClick={onRemove}
      className="hover:bg-primary-100 rounded-full p-0.5 transition-colors"
    >
      <X size={12} />
    </button>
  </motion.span>
);

// Pagination helper: shows first, last, current ± 1, with ellipsis
function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];
  const delta = 1;

  pages.push(1);

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('...');

  pages.push(total);

  return pages;
}

export default Properties;