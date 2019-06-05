import React, { Component } from 'react';
import classes from './Parent.module.css';
import axios from './Axios';
class Parent2 extends Component {
  constructor(props){
    let email=localStorage.getItem("user");
    console.log('email in constructor',email);
    console.log("VALUE::::",props.value);
    super(props);
    this.updateTask=this.updateTask.bind(this);
    this.state={
      task:"",
      email:email,
      value:'',
      date:'' ,
      prevValue:this.props.value.value,
      prevDate:this.props.value.date    }
    }
    handleChange = (e) =>{ 
      this.setState({prevValue: e.target.value});
      console.log(this.state.value)
      console.log("handle change");
      console.log("key",this.props.keys)
    }
    cancel=()=>{
      this.props.taskChange2();
    }
  onKeyPress = (e) => {
   if(e.which === 13) { 
      if(this.state.value){ 
        this.addTask();
        this.dateFromInput();
      }
    }
  }
    dateFromInput=(e)=>{
      console.log("event.target.value",e.target.value)
      let dateFromValue=document.getElementById("date").value
      if(!dateFromValue){
        let today=new Date();
            console.log("today",new Date())
            console.log(today.getUTCDate())
            console.log(today.getUTCMonth())
            console.log(today.getUTCFullYear())
           dateFromValue= today.getUTCFullYear()+'-'+(today.getUTCMonth()+1)+'-'+today.getUTCDate()
           this.setState({
            prevDate:dateFromValue
          });
          }
  //     console.log(dateFromValue);
  //     console.log(dateFromValue.split('-')[0]);
  //     let year=dateFromValue.split('-')[0];
  //     let month=dateFromValue.split('-')[1]+1;
  //     let day=dateFromValue.split('-')[2];
  //     console.log(year);
  //     console.log(month);
  //     console.log(day);
  //     let orginalDate=day+'-'+month+'-'+year;
  //     console.log("orginalDate",orginalDate);
  //  let preDate=dateFromValue.split('-')[2]+'-'+dateFromValue.split('-')[1]+'-'+dateFromValue.split('-')[0]
else{
  this.setState({
      prevDate:dateFromValue
    });}
    // console.log(preDate);
    console.log(dateFromValue);
//     let dateFromInput=document.getElementById("date").valueAsDate;
//     let dateFromValue=document.getElementById("date").value;
//     console.log(dateFromInput)
//     if (!dateFromInput){
//       dateFromInput=new Date();
//     }
//     console.log(dateFromValue);
//     const monthName= monthNames[dateFromInput.getMonth()]; 
//      let date=dateFromInput.getUTCDate()+' '+monthName;
//  console.log(dateFromInput)
//     this.setState({
//       date:date,
//       dateFromValue:dateFromValue
//           });
  }
   updateTask= event =>{
      event.preventDefault();
      console.log("updatedtask")
      console.log('Eventid',this.props.eventId);
      console.log(this.props.value)
      console.log("keys",this.props.keys)
      let j=this.props.eventId;
      console.log(j);
      console.log(this.props.value);
      console.log(this.props.keys);
      var eventTotal=(this.props.keys)[j];
      console.log("eventTotal:",eventTotal)
      axios.patch('tasks/'+eventTotal+'.json', {
          value:this.state.prevValue,
          email:this.state.email,
          date:this.state.prevDate 
        })
        .then((response)=> {
            this.props.commonFunction();
          })  
            .catch((error)=> {
                console.log(error)
            });
            this.refs.form.reset();
            this.props.taskChange2(); 
    }
  render(){
    console.log(this.state.prevValue)
    console.log(this.state.prevDate);
    return(
      <div className={classes.parent}>
         <form onSubmit={this.updateTask} ref="form">
          <input type="text"id={this.props.eventId} value={this.state.prevValue} className={classes.child_div1} onChange={this.handleChange} onKeyPress={this.onKeyPress} />
          <input type="date" id='date' value={this.state.prevDate} className={classes.date} onChange={this.dateFromInput}onKeyUp={this.dateFromInput} />
          <div className="buttonDiv">
            <button type="submit" className={classes.child_div2}  onClick={this.updateTask} onSubmit={this.updateTask} >Save</button>
            <button type="button" className={classes.child_div2} onClick={this.cancel}>Cancel</button>  
          </div>
        </form>
      </div>
    )
  }
}
export default Parent2
