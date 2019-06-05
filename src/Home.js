import React, { Component } from 'react';
import Addtask from './Addtask';
import axios from './Axios';
import Homescreen from './Homescreen';
import List from './List';
import Loader from './Loader';
import Parent from './Parent';
import Parent2 from './Parent2';
import editSvg from './Edit.svg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // var FontAwesome = require('react-fontawesome');
import classes from './Home.module.css';
class Home extends Component{
    constructor(props){
        // const email=localStorage.getItem("user");
        // console.log('email in constructor',email);
        super(props);     
        this.state={
            isClicked:false,
            email:'',
            addTask:false,
            names:[],
            isLoading:false,
            response:false,
            addedTask: true,
            deletedTask:true,
            keys:[],
            dates:[],
            tests:[],
            updateTask:false,
            eventId:'',
            isChecked:false
        }
    }
    componentDidMount() {
        // console.log("check for common function in COMPONENT DID MOUNT")
        if(!this.state.response){
            this.commonFunction();
        }
        // this.setState({isLoading:false})
        //this.commonFunction();
    }
    commonFunction=()=>{
        // console.log("check for common function")
        let email;
        // console.log('EMIL FRM APP:::::',this.props.email)
        if(!this.props.email){
            email=localStorage.getItem("user");
            // console.log('email in constructor',email);
        }
        else{
            email=this.props.email;
        }
        // console.log('email in home:',this.props.email);
        // console.log("main email:",email)
        if(!email){   
            return;
        }
            // if(!this.state.isLoading){
            //     // alert('Loader true');
            // this.setState({
            //     isLoading:true
            // });
            // }
        // console.log("mail before call:",email)
        axios.get(`tasks.json?orderBy="email"&equalTo="${email}"`)
            .then((response)=> {
                // this.setState({
                //     isLoading:true
                // });
                const obj=response.data;
                // console.log('response:',obj)
                // console.log(Object.keys(obj).length);
                // var len=Object.keys(obj).length;
                // console.log(len)
                // console.log('response in len:',obj[len])
                let isClicked;
                if(Object.keys(obj).length === 0 && obj.constructor === Object){
                isClicked=true;
                //Loading=false;
                // this.setState({
                //     isLoading:false
                // });
            } 
            let names=[];
            let tests=[];
            let dates=[];
            // console.log(Object.keys(obj).length);
            for(var task in obj){
                let name=obj[task].value;
                console.log(name);
                names.push(name);
                names.push(name);
                let date=obj[task].date;
                dates.push(date);
                tests.push({date:obj[task].date,
                    value:obj[task].value
                })
            }
            let keys=(Object.keys(obj));
            // console.log(keys);
            if(this.state.names.length===0&&!this.state.response){
                this.setState({
                    isClicked:isClicked,
                    names:names,
                    isLoading:false,
                    response:false,
                    keys:keys,
                    tests:tests,
                    dates:dates,
                    updateTask:false
                });
            }
            else if(this.state.names!==names){
                this.setState({
                    names:names,
                    isLoading:false,
                    response:true,
                    addedTask:true,
                    keys:keys,
                    dates:dates,
                    tests:tests,
                    updateTask:false   
                });      
            }
        })
        .catch( (error) =>{
            console.log(error);
        })
    }
    componentDidUpdate() {
        if(!this.state.response&&!this.state.addTask&&!this.state.isClicked) {
            // console.log("check for common function in COMPONENT DID UPDATE")
            this.commonFunction();
        }
    }    
    addtask=()=>{
        let responseVal;
        let loading;
        if(this.state.tests.length===0){
            responseVal=false;
            loading=true;
        }
        else{
            responseVal=true;
            loading=false;
        }
        console.log("responseVal:",responseVal)
        console.log(loading);
        this.setState({
            addTask:true,
            response:responseVal,
            
        });
    }
    updateTask=(event)=>{
        console.log("updateTask before setstate:",this.state.updateTask);
        console.log("isChecked before setstate:",this.state.isChecked);
         if(!this.state.updateTask){
       let  eventId=event.target.id;
    //    console.log(this.state.eventId);
       console.log(eventId);
        this.setState({
            updateTask:true,
            eventId:eventId    
        });
        console.log(this.state.eventId);
        console.log(this.state.updateTask);   
     }
}
    taskChange=()=>{
        console.log(this.state.tests.length)
        console.log(this.state.isLoading);
        if(!this.state.isLoading){
            this.setState({
                addTask:false,
                // isLoading:true,
                // isLoading:false,
                 updateTask:false,
                response:true,    
            });
        }
        console.log("after cancel response:",this.state.response)
        console.log("after cancel addtask:",this.state.addTask)
        console.log("after cancel isloading:",this.state.isLoading)
        console.log("after cancel isClicked:",this.state.isClicked)
    }
    taskChange1=()=>{
        console.log(this.state.tests.length)
        console.log(this.state.isLoading);
        if(!this.state.isLoading){
            let responseVal;
            if(this.state.tests.length===0){
                responseVal=false;
            }
            else{
                responseVal=true;
            }
            console.log(responseVal);
            this.setState({
                addTask:false,
                // isLoading:true,
                // isLoading:false,
                 updateTask:false,
                response:responseVal,
                
            });
        }
        console.log("after cancel response:",this.state.response)
        console.log("after cancel addtask:",this.state.addTask)
        console.log("after cancel isloading:",this.state.isLoading)
        console.log("after cancel isClicked:",this.state.isClicked)
    }
    taskChange2=()=>{
        let responseVal;
        if(this.state.eventId===0){
            responseVal=false;
        }
        else{
            responseVal=true;
        }
        // if(this.state.updateTask){
            this.setState({
                addTask:false,
                isLoading:false,
                updateTask:false,
                 eventId:'',
                 response:responseVal,
                 isClicked:true
            });
        // }
        // console.log("after cancel updatetask:",this.state.updateTask,)
        // console.log("after cancel addtask:",this.state.addTask)
        // console.log("after cancel isloading:",this.state.isLoading)
        // console.log("after cancel response:",this.state.response)
        // console.log("after cancel isclicked:",this.state.isClicked)
    }
    deleteTask=(event)=>{
        const eventId=parseInt(event.target.id);
        let keys=this.state.keys
        let testDelete=(this.state.tests)[eventId];
        console.log("testDelete:",testDelete);
        var eventTotal=(this.state.keys)[eventId];
        console.log("eventTotal:",eventTotal)
        let tests=this.state.tests;
        axios.delete('tasks/'+eventTotal+'.json', ).then((response)=>{})
        let eventTest=tests[eventId];
        let resultTests=tests.filter(tests=>tests!==eventTest);
        let result=keys.filter(keys=>keys!==eventTotal);
        let responseVal;
        console.log("RESULTTEST:",resultTests.length)
        if(resultTests.length===0){
            responseVal=false;
        }
        else{
            responseVal=true;
        }
        this.setState({
            keys:result,
            tests:resultTests,
            response:responseVal,
            addTask:false,
            isClicked:true,
            // updateTask:true
            updateTask:false,
            isChecked:true
            });
            // console.log("after deletion:",this.state.updateTask)
    }
    render(){
        var i=0;
        // console.log(this.state.tests.length)
        const lists=this.state.tests.map((test)=>{
            i=i+1;
         let j=this.state.eventId;
            // console.log("eventid:",this.state.eventId);
            // console.log(this.state.updateTask);
            // console.log("value:",this.state.tests[i-1]);
            // console.log(this.state.tests);
            return (
                <div id={i-1}>
                 {this.state.updateTask&&this.state.eventId==i-1?<Parent2  eventId={this.state.eventId} value={this.state.tests[j]} loading={this.state.isLoading} keys={this.state.keys} test={this.state.addTask} updateTask={this.updateTask} taskChange2={this.taskChange2} commonFunction={this.commonFunction}/>:
                    <li id={i-1} >
                        <input id={i-1} type="checkbox" className={classes.checkBox} onClick={this.deleteTask} />{test.value}
                        <span>{test.date}</span>  
                        <img id={i-1} src={editSvg} alt="edit"  onClick={this.updateTask}></img>
                    </li>}
                </div> 
            )      
        })
        // console.log(this.state.isLoading);
        // console.log(this.state.tests.length);
        // console.log(this.state.isClicked);
        // console.log(this.state.addTask);
        // console.log(this.state.response);
        return(
            <div>
                <Addtask test={this.addtask} click={this.state.addTask}/>  
                {this.state.isClicked===false?<List list={lists}/>:null}
                {!this.state.isLoading&&this.state.isClicked===true&&this.state.addTask===false&&!this.state.response?<Homescreen test={this.addtask} click={this.state.isClicked}/>:<List list={lists}/>}
                {this.state.isLoading ? <Loader/> :null} 
                {this.state.addTask===true?<Parent  loading={this.state.isLoading} test={this.state.addTask}  taskChange={this.taskChange} taskChange1={this.taskChange1} commonFunction={this.commonFunction}/>:null}
            </div>
        )
    }
}
export default Home











