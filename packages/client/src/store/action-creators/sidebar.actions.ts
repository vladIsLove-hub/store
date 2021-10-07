import { Dispatch } from 'redux';

import { SidebarAction, SidebarActionTypes } from '../reducers/sidebar-reducer/sidebar.types';

export const setSidebarFormData = (dispatch: Dispatch<SidebarAction>, jsonPayload: string) => {
  const data = JSON.parse(jsonPayload);
  dispatch({
    type: SidebarActionTypes.SET_SIDEBAR_FORM_DATA,
    payload: data,
  });
};

export const clearSidebarFormData = (dispatch: Dispatch<SidebarAction>) => {
  dispatch({
    type: SidebarActionTypes.CLEAR_SIDEBAR_FORM_DATA,
  });
};
