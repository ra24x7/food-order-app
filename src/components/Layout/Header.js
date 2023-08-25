import { Fragment } from "react";
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCardButton";
import foodizImage from '../../assets/Foodiz-banner.jpg'

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>Foodiez</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src= {foodizImage}  alt="Foodiez" />
        </div>

       
    </Fragment>
};

export default Header;