import React from 'react';
import { withRouter} from "react-router-dom";
// import './Layout.css'
import headSvg from './logo.svg';
import Logoutbutton from './Logoutbutton';
import classes from'./Layout.module.css'
const Layout=(props)=> {
// alert("Window Location:",window.location);
// let a=window.location;
// alert(props.location.pathname);
  return(
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={headSvg} alt="logo"></img>
        <span className={classes.headName}>My TodoList</span>
        {props.location.pathname==="/Home"?<Logoutbutton/>:null} 
      </div>
      <div className={classes.sideBar}></div>
      <div className={classes.main}>
        {props.children}
      </div>
    </div>
  )
}
export default withRouter(Layout);