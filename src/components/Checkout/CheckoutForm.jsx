import React, {useEffect, useReducer, useState} from 'react';
import { FormGroup } from 'reactstrap';
import Loading from "../Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {addOrder, getAllCarts} from "../Cart/CartSlice";
import {useHistory} from "react-router-dom";
import { getUser } from 'features/Auth/authSlice';

export default function CheckoutForm() {
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState('');

  const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]: event.target.value
    }
  }

  const [formData, setFormData] = useReducer(formReducer, {});

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
  }, [dispatch]);

  console.log({errorSubmit});

  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    setBtnLoading(true);

    try {
      const checkoutData = await dispatch(addOrder({ body: { ...formData, carts } }));

      if (checkoutData.payload.success) {
        await dispatch(getUser());
        history.push('/');
      } else {
        setBtnLoading(false);
        setErrorSubmit(checkoutData.payload.message);
      }
    } catch (error) {
      console.log(error.message);
    } 
  }

  return (
    <div className="checkout__form">
      <h3>Billing Details</h3>
      <div className="checkout__form__body">
        <form onSubmit={handleSubmit}>
          <p className="checkout__form__row">
            <label className="required">Address</label>
            <input
              className="input-text"
              name="address"
              placeholder="Enter the address"
              onInput={setFormData}
            />
          </p>
            
          <p className="checkout__form__row">
            <label className="required">Phone number</label>
            <input
              className="input-text"
              name="phoneNumber"
              placeholder="Enter the phone"
              onInput={setFormData}
            />
          </p>
          {
            errorSubmit && <p style={{ color: 'red', fontSize: '12px' }}>{ errorSubmit }</p>
          }
          <FormGroup>
            <button type="submit" className="checkout__form__submit--button">
              { isBtnLoading ? <Loading /> : 'Place order' }
            </button>
          </FormGroup>
        </form>
      </div>
    </div>
  )
}
