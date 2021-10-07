import { useSelector } from 'react-redux';

import { RootState } from '../store/store';

export const useCustomSelector = () => {
  return useSelector((state: RootState) => {
    return state;
  });
};
