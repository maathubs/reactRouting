import React, { Component } from 'react';
import classes from './Parent.module.css';
import axios from './Axios';
// import List from './List';
class Parent extends Component {
  constructor(props){
    let email=localStorage.getItem("user");
    console.log('email in constructor',email);
    console.log("VALUE::::",props.value);
    super(props);
     this.addTask=this.addTask.bind(this);
    this.state={
      task:"",
      email:email,
      value:'',
      date:''   
    }
  }
  
    handleChange = (e) =>{ 
      this.setState({value: e.target.value});
    }
    
  taskFromInput=(event)=>{
    let value=event.target.value;
    this.setState({
      value:value
    });
    
  } 
  cancel=()=>{
    this.props.taskChange1();
    // this.props.loading=false;
  }
  onKeyPress = (e) => {
    if(e.which === 13) { 
      if(this.state.value){ 
        this.addTask();
        this.dateFromInput();
      }
    }
  }
  dateFromInput=()=>{
    // let date=event.target.dispatchEvent.value;
    let dateFromInput=document.getElementById("date").valueAsDate;
    let dateFromValue=document.getElementById("date").value;
    console.log("dateFromValue",dateFromValue);
    if (!dateFromValue){
      // dateFromInput=new Date();
      // console.log(dateFromInput);
    let today=new Date();
    console.log("today",new Date())
    console.log(today.getUTCDate())
    let month='0'+(today.getUTCMonth()+1);

    console.log('month',month)
    console.log(dateFromInput);
    let date=today.getUTCFullYear()+'-'+month.slice(-2)+'-'+today.getUTCDate()
    // const monthName= monthNames[dateFromInput.getMonth()]; 
    //  let date=dateFromInput.getUTCDate()+' '+monthName;
 console.log(dateFromInput)
    this.setState({
      date:date,
      dateFromValue:dateFromValue
          });
  }else{
    console.log(dateFromInput)
    console.log(dateFromValue.split('-')[0]);
    console.log(dateFromValue.split('-')[1]);
    console.log(dateFromValue.split('-')[2])
        console.log("DATE",dateFromValue.split('-')[2]+'-'+dateFromValue.split('-')[1]+'-'+dateFromValue.split('-')[0]);
  let date=dateFromValue.split('-')[0]+'-'+dateFromValue.split('-')[1]+'-'+dateFromValue.split('-')[2]
  this.setState({
    date:date,
    dateFromValue:dateFromValue
        });
      }
  //     const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

//     if (dateFromInput===null){
//       dateFromInput=new Date();
//       console.log(dateFromInput);
//     let today=new Date();
//     console.log("today",new Date())
//     console.log(today.getUTCDate())
//     console.log(today.getUTCMonth())
//     console.log(today.getUTCFullYear())
//     console.log(dateFromInput);
//     let date=today.today.getUTCFullYear()+'-'+(today.getUTCMonth()+1)+'-'+today.getUTCDate()
//     // const monthName= monthNames[dateFromInput.getMonth()]; 
//     //  let date=dateFromInput.getUTCDate()+' '+monthName;
//  console.log(dateFromInput)
//     this.setState({
//       date:date,
//       dateFromValue:dateFromValue
//           });
//   }
}
  addTask=(e)=>{
    e.preventDefault();
    let dateFromValue=document.getElementById("date").value;
    if(!dateFromValue){
      console.log("EMPTY DATE");
    }
    if(this.state.value){
      console.log(this.state.date)
      axios.post('tasks.json', {
        value:this.state.value,
        email:this.state.email,
        date:this.state.date      
      })
      .then((response)=> {
        this.props.commonFunction();
        // this.setState({
        //   response:true
        // });
      })
      .catch((error)=> {
        console.log(error);
      });
    let val=this.state.email;
    console.log("axios email:",val)
    this.refs.form.reset();
    this.props.taskChange(); 
    } 
  }
  render(){
    // console.log(this.props.value.value)
    return(
      <div className={classes.parent}>
        <form onSubmit={this.addTask} ref="form">
          <input type="text" value={this.state.value} className={classes.child_div1} onChange={this.handleChange} onKeyPress={this.onKeyPress} onKeyUp={this.taskFromInput}/>
          <input type="date" id='date' className={classes.date} onChange={this.dateFromInput}onKeyUp={this.dateFromInput} />
          <div className="buttonDiv">
            <button type="submit" className={classes.child_div2} onFocus={this.dateFromInput} onClick={this.addTask} onSubmit={this.addTask}>Add Task</button>
            <button type="button" className={classes.child_div2} onClick={this.cancel}>Cancel</button>  
          </div>
        </form>
      </div>
    )
  }
}
export default Parent
