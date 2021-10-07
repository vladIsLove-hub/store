import React from 'react';
import { Link } from 'react-router-dom';

interface IHeaderAuthProps {
  visibility: boolean;
}

const HeaderAuthBlock = ({ visibility }: IHeaderAuthProps) => {
  return (
    <div className={`header-auth ${visibility ? 'auth_show' : 'auth_hidden'}`}>
      <Link to="/sign-in" className="header-auth__sign-in">
        Sign In
      </Link>
      <span className="header-auth__separator">/</span>
      <Link to="/sign-up" className="header-auth__sign-up">
        Sign Up
      </Link>
    </div>
  );
};

export default HeaderAuthBlock;
