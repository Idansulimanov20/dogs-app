import {useState} from 'react'
import './css/PopupButton.css'
export default function PopupButton(props){
   const [clicked,setClicked]=useState(false);
   return <div>
   <button className='profile' onClick={() => setClicked((prev) => !prev)}>
     {props.title}
   </button>
   {clicked && <div className='idan'>
      <button className='x' onClick={() => setClicked((prev) => !prev)}>❌</button>
      {props.children}
      </div>}
 </div>
}
