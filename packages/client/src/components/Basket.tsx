import React from 'react';
import { Link } from 'react-router-dom';

import BasketIcon from '../icons/BasketIcon.svg';

interface IButtonProps {
  visibility: boolean;
}

const Basket = ({ visibility }: IButtonProps) => {
  return (
    <Link className={`header__basket ${visibility ? 'bk_show' : 'bk_hidden'}`} to="/basket">
      <img src={BasketIcon} alt="Basket" className="header-top__basket" />
    </Link>
  );
};

export default Basket;
