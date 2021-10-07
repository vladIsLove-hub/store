export const hidenSidebarWhenResizing = (handleClose: () => void): void => {
  window.addEventListener('resize', (e: UIEvent) => {
    const w = e.target as Window;
    const resolutionForTablets = 990;
    if (w.innerWidth > resolutionForTablets) {
      handleClose();
    }
  });
};

export default hidenSidebarWhenResizing;
