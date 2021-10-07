import React, { useState } from 'react';

import OutgoingSidebar from './OutgoingSidebar';
import SidebarForm from './sidebar-form/SidebarForm';

const SortingSidebar = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClose = (): void => {
    setVisible(false);
  };

  const handleShow = (): void => {
    setVisible(true);
  };

  return (
    <div className="sort-sidebar-container">
      <aside className="sort-sidebar">
        <h3>Sort by:</h3>
        <SidebarForm />
      </aside>
      <button className="btn btn__open-sidebar" onClick={handleShow} />
      <OutgoingSidebar visible={visible} handleClose={handleClose} />
    </div>
  );
};

export default SortingSidebar;
