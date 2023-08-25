import classes from './Cart.module.css';
import Modal from '../UI/Modal'
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import React from 'react';

const Cart = (props) => {
  const [checkedout,setCheckout] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `Rs.${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {};
  const cartItemAddHandler = item => {};
  const orderHandler = () => {
    
    setCheckout(true);

  };
  const submitOrderHandler = async (userData) => {

    setIsSubmitting(true);

    const response = await fetch('https://react-food-app-5e29d-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false)
    setDidSubmit(true)
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem key= {item.id} name={item.name} amount={item.amount} price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd= {cartItemAddHandler.bind(null, item)}/>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button}  onClick={orderHandler}>Order</button>}
  </div>
  )

  const cartModalContent = <React.Fragment> {cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {checkedout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
  {!checkedout && modalActions} </React.Fragment>

  const isSubmittingModalContent = <p>Sending Order Data</p>
  const didSubmitModalContent = <p>Your Order is Success!</p>

  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;