import React from "react";
import { useState,useEffect } from "react";


export function App(){
    const [all,setAll]=useState([]);
    const [status,setStatus]=useState([true,false,false]);
    const [active,setActive]=useState([]);
    const [completed,setCompleted]=useState([]);
    const [check,setCheck]=useState([]);
     
    const[tryNow,setTryNow]=useState(true);

    useEffect(()=>{
      

      if(!tryNow){
        let btn1=document.getElementById("btn-1");
        let btn2= document.getElementById("btn-2");
        let btn3=document.getElementById("btn-3");
             if(status[0]){
              
                btn1.style.borderBottom = "2px solid blue";
               
               

             }
            
             else{
          
               btn1.style.border="none";
               
             }
             if(status[1]){
                 btn2.style.borderBottom="2px solid blue";
                
                
             }
             else{
               btn2.style.border="none";
               
             }
             if(status[2]){
                btn3.style.borderBottom="2px solid blue";
               
             }
             else{
                btn3.style.border="none";
                
             }
          
      }


    
     

       

   
           
    });
    function newTask(){
        let add=document.getElementById("newTask") ;
      if(add.value.trim()!=="" && all.indexOf(add.value)<0){
        
        setAll([...all,add.value]);
        setActive([...active,add.value]);
        setCheck([...check,false]);
       
      }
      add.value="";
    }
     
  
function remove(index){
  if(active.indexOf(all[index])>=0){
    let duplicateActive=active;
    duplicateActive.splice(active.indexOf(all[index]),1);
    setActive([...duplicateActive]);
  }
  if(completed.indexOf(all[index])>=0){
    let duplicateCompleted=completed;
    duplicateCompleted.splice(completed.indexOf(all[index]),1);
    setCompleted([...duplicateCompleted]);
  }
  let arr=all;
  arr.splice(index,1);
  setAll([...arr]);
  let duplicateCheck=check;
  duplicateCheck.splice(index,1);
  setCheck([...duplicateCheck]);
  


}
 
function makeCompletedByActive(index){
        
  let checkedByActive= document.getElementById(`makeCompletedByActive${index}`).checked;
  console.log(checkedByActive);
 

  if(checkedByActive){
    if(completed.indexOf(active[index])<0){

      setTimeout(()=>{
      setCompleted([...completed,active[index]]);
      let duplicateCheck=check;
      duplicateCheck[all.indexOf(active[index])]=true;
      setCheck([...duplicateCheck]);
      let duplicateActive=active;
      duplicateActive.splice(index,1);
      setActive([...duplicateActive]);

      for(let i in active){
        document.getElementById(`makeCompletedByActive${i}`).checked=false;
      }
      },600);
   
     
    
    
       
       

    } 
  }
  else{
    if(completed.indexOf(active[index])>=0){
    let arr=completed;
    arr.splice(completed.indexOf(active[index]),1);
    setCompleted([...arr]);
    }
    let duplicateCheck=check;
     
    
      duplicateCheck[all.indexOf(active[index])]=false;
      setCheck([...duplicateCheck]);
  }
   
  

   
  

}
function undo(index){

   let duplicateCheck=check;
   duplicateCheck[all.indexOf(completed[index])]=false;
   setCheck([...duplicateCheck]);
  setActive([...active,completed[index]]);
  let duplicateCompleted=completed;
  duplicateCompleted.splice(index,1);
  setCompleted([...duplicateCompleted]);
  


}
    return (
       <div className="container shadow bg-body-tertiary   border rounded   ">
        
     
        {tryNow? <div className="row  p-4 "  id="theRow" >
        <h3 className=" text-center shadow border rounded col-lg-8 col-md-8 col-sm-10 col-xs-12 mx-auto p-3" id="welcome">Welcome to To Do List App</h3>
       
        <div  className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center my-2  grid align-items-center  " id="howTo">
          <div className="  p-5 shadow border rounded "><p>How to use?</p>
        <i class="fa-solid fa-lightbulb   fs-1 p-2" id="bulb"></i>   </div>
        </div>
             <div className="  col-lg-6 col-md-6 col-sm-6 col-xs-12 mx-auto   my-2 d-flex align-items-center">
          <ul  className="  col-lg-10 col-md-10 col-sm-12 cols-xs-12 mx-auto  p-5  shadow border rounded  "> Here you can ...<li>Add new Tasks. </li>
            <li>Mark Them As Completed.</li>
            <li>You can delete the task or undo the marked ones.</li>
          </ul></div>
          <blockquote  className="text-center   "> <div className="shadow border rounded position-relative p-3 mx-auto col-lg-6 col-md-6 col-sm-8 col-xs-12"><i class="fa-solid fa-bolt fs-4 text-warning   position-absolute top-0 start-50 translate-middle border rounded-circle shadow z-2 p-1 bg-body-tertiary"></i> Try this app to boost your productivity</div> </blockquote>
          <button onClick={()=>setTryNow(!tryNow)} className="col-3 mx-auto btn btn-warning">Try Now</button>
         <p className="text-end  "><span className="border-bottom">Designed By - <em>Aravind</em></span></p>
          </div> :<  div className="p-4" id="app">
          

        
       
        <div className="row p-1 ">
          <div className="col-12 d-flex justify-content-between">
          <input type="text" placeholder="New Task..." className="border border-0 w-75" id="newTask"/><button className="btn btn-primary" onClick={newTask}>Add</button>
          </div>
         
        </div>
       
        <div className="row p-3 " id="taskSelectors">
          <div className="col-12 ">
           
  <button   class=" p-2 col-2"  id="btn-1" onClick={()=>setStatus([true,false,false])}>All</button>
  <button class="   p-2 col-2" id="btn-2" onClick={()=>setStatus([false,true,false])}>Active</button>
  <button   class=" p-2 col-2 " id="btn-3" onClick={()=>setStatus([false,false,true])}>Completed</button>
 
          
          </div>
          </div>
          <div className="row p-1 my-3 " id="tasks">
          {
            status[0]?all.map((item,index)=><div className="col-12    my-1  ">
            <div className="col-12 p-1 shadow bg-body-tertiary d-flex align-items-center justify-content-around">          <label className="col-9 p-2">{check[index]?<del>{`${item}`}</del>:`${item}`}</label>  <button className="btn btn-danger col-1" onClick={()=>remove(index)}>Delete</button></div></div>):status[1]?active.map((item,index)=><div className="col-12    my-1 mx-auto ">
            <div className="col-12 p-1 shadow bg-body-tertiary d-flex align-items-center justify-content-around">          <input type="checkbox"  className="col-1  " id={`makeCompletedByActive${index}`}  onClick={()=>makeCompletedByActive(index)}  /> <label className="col-10 p-2">{item}</label>  </div></div>):completed.map((item,index)=><div className="col-12    my-1 mx-auto">
            <div className="col-12 p-1 shadow bg-body-tertiary d-flex align-items-center justify-content-around">           <label className="col-10 p-2"><del>{item}</del></label> <button className="btn btn-secondary col-1" onClick={()=>undo(index)}>Undo</button> </div></div>)
          }
         
        </div> </div>}
         
     


       </div>
    )
}
