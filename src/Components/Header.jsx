/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import iconCart from "/assets/images/iconCart.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatusTab } from "../Store/cart";

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store) => store.cart?.items ?? []); // Ensure carts is always an array
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(carts)) {
      const total = carts.reduce((sum, item) => sum + item.quantity, 0);
      setTotalQuantity(total);
    }
  }, [carts]); // Now updates state when `carts` changes

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  return (
    <header className="flex justify-between items-center mb-5">
      <Link to="/" className="text-xl font-semibold">
        Home
      </Link>
      <div
        className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative"
        onClick={handleOpenTabCart}
      >
        <img src={iconCart} alt="Cart Icon" className="w-6" />
        <span className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
          {totalQuantity}
        </span>
      </div>
    </header>
  );
};

export default Header;
