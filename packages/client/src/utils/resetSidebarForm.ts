const resetSidebarForms = (): void => {
  document.querySelectorAll('.reset-sidebar-form').forEach(elem => {
    const htmlElem: HTMLElement = elem as HTMLElement;
    htmlElem.click();
  });
};

export default resetSidebarForms;
