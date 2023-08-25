import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !==5  

const Checkout = (props) => {

   const [formInputValidity,setFormInputValidity] = useState({
    
    name:true,
    street: true,
    city: true,
    postalCode: true

   });

const nameInputRef =useRef();
const streetInputRef =useRef();
const postalCodeInputRef = useRef();
const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName= nameInputRef.current.value;
    const enteredStreet= streetInputRef.current.value;
    const enteredPostalCode= postalCodeInputRef.current.value;
    const enteredCity= cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity ({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
        
    });

    const formIsValid = 
    enteredNameIsValid && 
    enteredCityIsValid && 
    enteredPostalCodeIsValid && 
    enteredStreetIsValid;

    if (!formIsValid) {
            return;
    };

    props.onConfirm({
        name:enteredName,
        street: enteredStreet,
        city: enteredCity,
        postal: enteredPostalCode
    });
  };

  const nameControlClass = `${classes.control} 
  ${
   formInputValidity.name ? '' : classes.invalid
  }`;
 
  const streetControlClass = `${classes.control} 
  ${
   formInputValidity.street ? '' : classes.invalid
  }`;

  const cityControlClass = `${classes.control} 
  ${
   formInputValidity.city ? '' : classes.invalid
  }`;

  const postalCodeControlClass = `${classes.control} 
  ${
   formInputValidity.postalCode ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>

      <div className={nameControlClass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClass}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter a valid street name</p>}
      </div>
      <div className={postalCodeControlClass}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p>Enter valid 5 digit postal code</p>}
      </div>
      <div className={cityControlClass}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Enter valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;