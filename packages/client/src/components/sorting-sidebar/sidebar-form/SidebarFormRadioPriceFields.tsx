import React from 'react';

import SidebarFormRadioField from './SidebarFormRadioField';

const SidebarFormRadioPriceFields = () => {
  return (
    <div>
      <SidebarFormRadioField label="Ascending price" name="sortOptions" value="price,ASC" />
      <SidebarFormRadioField label="Descending price" name="sortOptions" value="price,DESC" />
    </div>
  );
};

export default SidebarFormRadioPriceFields;
