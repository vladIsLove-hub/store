import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';

import hideSidebarWhenResizing from '../../utils/hideSidebarWhenResizing';

import SidebarForm from './sidebar-form/SidebarForm';
import { OutgoingSidebarProps } from './SidebarTypes';

const OutgoingSidebar: React.FC<OutgoingSidebarProps> = ({ visible, handleClose }) => {
  useEffect(() => {
    hideSidebarWhenResizing(handleClose);
  }, [handleClose]);

  return (
    <Offcanvas autoFocus={true} placement="end" show={visible} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sort by</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SidebarForm handleClose={handleClose} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OutgoingSidebar;
