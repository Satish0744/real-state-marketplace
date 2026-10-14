import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (property) => {
    if (compareList.find((p) => p.id === property.id)) {
      toast.error('Already in compare list');
      return;
    }
    if (compareList.length >= 4) {
      toast.error('You can compare up to 4 properties');
      return;
    }
    setCompareList([...compareList, property]);
    toast.success('Added to compare');
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter((p) => p.id !== id));
    toast.success('Removed from compare');
  };

  const clearCompare = () => {
    setCompareList([]);
    toast.success('Compare list cleared');
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};