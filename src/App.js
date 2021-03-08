import React, {useEffect, useRef, useState} from 'react';

import './App.css';

function App() {
  const[direction, setDirection]=useState('down');
  const canvasRef= useRef(null);
  const linkDownRef= useRef(null);
  const linkUpRef= useRef(null);
  const linkRightRef= useRef(null);
  const linkLeftRef= useRef(null);
  const [x, setX]=useState(100);
  const [y, setY]=useState(100);
  
  
  const move=(dir)=>{
    setDirection(dir);
    if(dir==='up')
      setY((y)=>y-20);
     

    if(dir==='down')
      setY((y)=>y+20);
 
    if(dir==='right') 
      setX((x)=>x+20);
     

    if(dir==='left') 
      setX((x)=>x-20);
      }

  //set the height and width of canvas
      useEffect(()=>{
        const context= canvasRef.current.getContext('2d');
        context.canvas.height=window.innerHeight;
        context.canvas.width=window.innerWidth;
       },[])

      //move the box if x or y changes
      useEffect(()=>{
        const context= canvasRef.current.getContext('2d');
        context.clearRect(0,0,window.innerWidth, window.innerHeight)
       // context.fillRect(x,y,100,100);
      
       let linkRef;
        if(direction === 'up') linkRef= linkUpRef
        if(direction ==='down') linkRef= linkDownRef;
        if(direction ==='left') linkRef=linkLeftRef;
        if(direction ==='right') linkRef=linkRightRef;

       context.drawImage(linkRef.current, x, y)
    },[x,y]);

    //add event listener to window to listen for arrow keys
    useEffect(()=>{
      const handleKeydown=(e)=>{
      //  console.log(e.key, e)
        if(e.key==="ArrowUp") move('up');
        if(e.key==="ArrowDown") move('down');
        if(e.key==="ArrowRight") move('right');
        if(e.key==="ArrowLeft") move('left');

      }
      window.addEventListener('keydown', handleKeydown)
    return ()=> window.removeEventListener('keydown', handleKeydown) //clean event handler after its done

    }, []);



  return (
    <div className="App">
      <canvas ref={canvasRef}/>
      <div className="arrows">
        <button onClick={()=>move('up')}>Up</button>
        <button onClick={()=>move('down')}>Down</button>
        <button onClick={()=>move('left')}>Left</button>
        <button onClick={()=>move('right')}>Right</button>
      </div>


      <div className="images">
        <img ref={linkDownRef} src="https://i.imgur.com/JYUB0m3.png" alt="Down" />
        <img ref={linkRightRef} src="https://i.imgur.com/GEXD7bk.gif" alt="Right" />
        <img ref={linkUpRef} src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img ref={linkLeftRef} src="https://i.imgur.com/4LGAZ8t.gif" alt="Left" />
      </div>

      
    </div>
  );
}

export default App;
