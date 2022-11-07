import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllCarts} from "../Cart/CartSlice";
import {numberFormat} from "utils/common";

export default function CheckoutOrder() {
  const dispatch = useDispatch();

  const carts  = useSelector(state => state.carts.cartList)

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        await dispatch(getAllCarts());
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCarts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPrice = carts.reduce((acc, cur) => {
    acc += cur.product.price;

    return acc;
  }, 0);

  return (
    <div className="checkout__form">
      <h3>Your order</h3>
      <div className="checkout__form__body">
        <table>
          <tbody>
            {
              carts.map((item, key) => ((
                <tr key={key}>
                  <td className="product-name">
                    { item.product.name }
                  </td>
                  <td className="product-quantity">
                    ×{item.quantity}
                  </td>
                  <td>${ numberFormat(item.product.price) }</td>
                </tr>
              )))
            }
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>&nbsp;</th>
              <th>${ numberFormat(totalPrice) }</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
