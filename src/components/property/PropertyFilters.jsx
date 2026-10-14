import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, MapPin, IndianRupee } from 'lucide-react';
import { properties } from '../../data/properties';
import { formatPrice } from '../../utils/format';

const MIN_PRICE = 100000;        // ₹1 Lakh
const MAX_PRICE = 100000000;     // ₹10 Crore
const STEP = 100000;             // ₹1 Lakh steps

const PropertyFilters = ({
  filters,
  setFilters,
  onClose,
  onClear,
  hasActiveFilters,
  isMobile,
}) => {
  const types = [
    'All',
    'Apartment',
    'Villa',
    'House',
    'Commercial',
    'Land',
    'Penthouse',
    'Farmhouse',
    'Row House',
  ];

  // Local state for the price slider (applied on release for perf)
  const [priceRange, setPriceRange] = useState([
    filters.minPrice ?? MIN_PRICE,
    filters.maxPrice ?? MAX_PRICE,
  ]);

  // Sync slider when parent filters reset
  useEffect(() => {
    setPriceRange([
      filters.minPrice ?? MIN_PRICE,
      filters.maxPrice ?? MAX_PRICE,
    ]);
  }, [filters.minPrice, filters.maxPrice]);

  // Dynamic city list from all properties with counts
  const cities = useMemo(() => {
    const cityMap = new Map();
    properties.forEach((p) => {
      cityMap.set(p.city, (cityMap.get(p.city) || 0) + 1);
    });
    return [
      { name: 'All', count: properties.length },
      ...Array.from(cityMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    ];
  }, []);

  // Auto-apply helper
  const update = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Commit price range to parent filters (called on mouse/touch release)
  const commitPrice = (range = priceRange) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: range[0],
      maxPrice: range[1],
    }));
  };

  // Percentage helper for slider track
  const minPercent = ((priceRange[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((priceRange[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  // Prevent body scroll on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [isMobile]);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm ${
        isMobile ? 'min-h-full rounded-none' : 'sticky top-24'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-primary-600" />
          <h3 className="text-lg font-bold">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="text-sm text-red-600 font-semibold hover:text-red-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              <RotateCcw size={14} /> Clear
            </button>
          )}
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update('search', e.target.value)}
              placeholder="Search by title, location..."
              className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            {filters.search && (
              <button
                onClick={() => update('search', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Listing Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Listing Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'sale', label: 'For Sale' },
              { key: 'rent', label: 'For Rent' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => update('priceType', t.key)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.priceType === t.key
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => update('type', e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* City — DROPDOWN */}
        <div>
          <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-primary-600" /> City
            </span>
            <span className="text-xs text-gray-400 font-normal">
              {cities.length - 1} cities
            </span>
          </label>
          <div className="relative">
            <select
              value={filters.city}
              onChange={(e) => update('city', e.target.value)}
              className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer bg-white"
            >
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name === 'All' ? `All Cities (${c.count})` : `${c.name} (${c.count})`}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Price Range — DUAL SLIDER */}
        <div>
          <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
            <span className="flex items-center gap-1">
              <IndianRupee size={14} className="text-primary-600" /> Price Range
            </span>
            <span className="text-xs text-gray-400 font-normal">Drag to filter</span>
          </label>

          {/* Current values */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">Min</p>
              <p className="text-sm font-bold text-primary-600">
                {formatPrice(priceRange[0])}
              </p>
            </div>
            <span className="text-gray-400 font-bold">—</span>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">Max</p>
              <p className="text-sm font-bold text-primary-600">
                {formatPrice(priceRange[1])}
              </p>
            </div>
          </div>

          {/* Dual range slider */}
          <div className="relative h-10 flex items-center">
            {/* Base track */}
            <div className="absolute left-0 right-0 h-1.5 bg-gray-200 rounded-full" />

            {/* Active (selected) track */}
            <div
              className="absolute h-1.5 bg-primary-600 rounded-full"
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />

            {/* Min slider */}
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              value={priceRange[0]}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), priceRange[1] - STEP);
                setPriceRange([val, priceRange[1]]);
              }}
              onMouseUp={() => commitPrice()}
              onTouchEnd={() => commitPrice()}
              className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
              style={{ zIndex: priceRange[0] > MAX_PRICE - 100 * STEP ? 5 : 3 }}
            />

            {/* Max slider */}
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              value={priceRange[1]}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), priceRange[0] + STEP);
                setPriceRange([priceRange[0], val]);
              }}
              onMouseUp={() => commitPrice()}
              onTouchEnd={() => commitPrice()}
              className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
              style={{ zIndex: 4 }}
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {[
              { label: 'Under ₹50L', range: [MIN_PRICE, 5000000] },
              { label: '₹50L-₹1Cr', range: [5000000, 10000000] },
              { label: '₹1-3Cr', range: [10000000, 30000000] },
              { label: '₹3-5Cr', range: [30000000, 50000000] },
              { label: 'Above ₹5Cr', range: [50000000, MAX_PRICE] },
              { label: 'Reset', range: [MIN_PRICE, MAX_PRICE] },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setPriceRange(preset.range);
                  commitPrice(preset.range);
                }}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                  priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Custom range slider styles */}
          <style>{`
            .range-thumb {
              pointer-events: none;
              height: 24px;
            }
            .range-thumb::-webkit-slider-thumb {
              pointer-events: auto;
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 9999px;
              background: #ffffff;
              border: 3px solid #2563eb;
              cursor: grab;
              box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
              transition: transform 0.15s ease, box-shadow 0.15s ease;
            }
            .range-thumb::-webkit-slider-thumb:hover {
              transform: scale(1.15);
              box-shadow: 0 4px 10px rgba(37, 99, 235, 0.5);
            }
            .range-thumb::-webkit-slider-thumb:active {
              cursor: grabbing;
              transform: scale(1.2);
            }
            .range-thumb::-moz-range-thumb {
              pointer-events: auto;
              width: 20px;
              height: 20px;
              border-radius: 9999px;
              background: #ffffff;
              border: 3px solid #2563eb;
              cursor: grab;
              box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
            }
            .range-thumb::-moz-range-thumb:active {
              cursor: grabbing;
            }
            .range-thumb::-webkit-slider-runnable-track {
              background: transparent;
              height: 24px;
            }
            .range-thumb::-moz-range-track {
              background: transparent;
              height: 24px;
            }
          `}</style>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bedrooms
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => update('bedrooms', n)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.bedrooms === n
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            ))}
          </div>
        </div>

        

        {/* Mobile action buttons */}
        {isMobile && (
          <div className="sticky bottom-0 -mx-6 -mb-6 px-6 py-4 bg-white border-t border-gray-100 flex gap-3">
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Show Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFilters;