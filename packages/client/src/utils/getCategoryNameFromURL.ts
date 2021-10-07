const getCategoryNameFromURL = (): string | null => {
  const locationPathname = location.pathname;
  const pathnames = locationPathname.split('/');
  const categoryName: string = pathnames[2];
  const page: string = pathnames[3];
  if (locationPathname === `/categories/${categoryName}/${page}` && categoryName) {
    return categoryName;
  } else {
    return null;
  }
};

export default getCategoryNameFromURL;
