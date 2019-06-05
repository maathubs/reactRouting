import React, { Component } from 'react';
import classes from  './Addtask.module.css'
class Addtask extends Component {
    addTask=()=>{
       this.props.test();   
    }
    render(){
      return(
        <div className={classes.task}>
          <a className={classes.addTask} href="javascript:void(0)" onClick={this.addTask}>Add Task</a>
        </div>
       )
   }
}
export default Addtask



