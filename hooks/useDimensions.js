import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(Dimensions.get('window'));
    };

    Dimensions.addEventListener('change', updateDimensions);
    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  return dimensions;
};
