import { SidebarActionTypes, SidebarAction, SidebarState } from './sidebar.types';

const initialState: SidebarState = {
  sortOptions: '',
  priceFrom: '',
  priceTo: '',
};

const sidebarReducer = (state = initialState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case SidebarActionTypes.SET_SIDEBAR_FORM_DATA:
      return {
        sortOptions: action.payload.sortOptions,
        priceFrom: action.payload.priceFrom,
        priceTo: action.payload.priceTo,
      };
    case SidebarActionTypes.CLEAR_SIDEBAR_FORM_DATA:
      return {
        sortOptions: '',
        priceFrom: '',
        priceTo: '',
      };
    default:
      return state;
  }
};

export default sidebarReducer;
