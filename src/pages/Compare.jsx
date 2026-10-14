import PropertyComparison from '../components/property/PropertyComparison';

const Compare = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Compare Properties</h1>
          <p className="text-gray-600">Compare properties side-by-side to make an informed decision</p>
        </div>
        <PropertyComparison />
      </div>
    </div>
  );
};

export default Compare;