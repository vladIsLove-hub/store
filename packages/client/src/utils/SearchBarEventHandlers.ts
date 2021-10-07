import { FocusEvent } from 'react';

const classLists: string[] = ['search-panel__focused', 'search-panel__scale'];

export const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
  e.target.closest('.search-panel')?.classList.add(...classLists);
};

export const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
  e.target.closest('.search-panel')?.classList.remove(...classLists);
};
