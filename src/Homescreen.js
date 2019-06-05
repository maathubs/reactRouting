import React, { Component } from 'react';
import homeSvg from './Homelogo.svg';
import classes from './Homescreen.module.css'
class Homescreen extends Component {
    addTask=()=>{
        this.props.test();
    }
    render() {
        return(
            <div className={classes.home}>
                <img className={classes.logo}src={homeSvg} alt="logo"></img>
                <p className={classes.subPara1}>Get a Clear view of the day ahead</p>
                <p className={classes.subPara2}>All your task are due up today will show up here</p>
                <button className={classes.Addbutton} onClick={this.addTask}>Add task</button>
            </div>
        )
    }
}
export default Homescreen



