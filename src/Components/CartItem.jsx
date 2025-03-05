/** @format */

import React, { useEffect, useState } from "react";
import { products } from "../../products";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../Store/cart";

const CartItem = ({ data }) => {
  const { productId, quantity } = data;

  const [detail, setDetail] = useState([null]);
  const dispatch = useDispatch();
  useEffect(() => {
    const findDetail = products.filter(
      (product) => product.id === productId
    )[0];
    setDetail(findDetail);
  }, [productId]);

  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      })
    );
  };
  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
  };

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
      <img src={detail.image} alt="" className="w-12" />
      <h3>{detail.name}</h3>
      <p>${detail.price * quantity}</p>
      <div className="w-40 flex justify-center gap-2">
        <button
          className="bg-amber-100   rounded-full text-2xl text-black"
          onClick={handleMinusQuantity}
        >
          -
        </button>

        <span>{quantity}</span>

        <button
          className="bg-gray-200 rounded-fulltext-xl text-black"
          onClick={handlePlusQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
