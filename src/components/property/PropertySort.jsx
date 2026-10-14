const PropertySort = ({ sortBy, setSortBy, total }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <p className="text-gray-600">
        Showing <span className="font-bold text-gray-900">{total}</span> properties
      </p>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="area">Largest Area</option>
        </select>
      </div>
    </div>
  );
};

export default PropertySort;