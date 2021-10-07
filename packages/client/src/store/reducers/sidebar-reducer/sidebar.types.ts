export enum SidebarActionTypes {
  SET_SIDEBAR_FORM_DATA = 'SET_SIDEBAR_FORM_DATA',
  CLEAR_SIDEBAR_FORM_DATA = 'CLEAR_SIDEBAR_FORM_DATA',
}

export interface SidebarState {
  sortOptions: string;
  priceFrom: string;
  priceTo: string;
}

interface SetSidebarFormData {
  type: SidebarActionTypes.SET_SIDEBAR_FORM_DATA;
  payload: {
    sortOptions: '';
    priceFrom: '';
    priceTo: '';
  };
}

interface ClearSidebarFormData {
  type: SidebarActionTypes.CLEAR_SIDEBAR_FORM_DATA;
}

export type SidebarAction = SetSidebarFormData | ClearSidebarFormData;
