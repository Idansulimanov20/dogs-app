import {Children, useState,createContext,useContext} from 'react'
import './css/Child.css'
import PopupButton from './PopupButton';
const PageContext=createContext();

const Child = () => {
    const [myState,setMyState]=useState('first')
  return (
    <PageContext.Provider value={{changeText:setMyState}}>
      <PopupButton title='click me'>
      <ul>you are dumb</ul>
      <li>are</li>
      <li>so</li>
      <li>dumb</li>
      <li>man</li>
      <li>kill yourself</li>
    </PopupButton>
      <h1>children page</h1>
     <h2>the state is : {myState}</h2>
     <Container>
        <span>i am span </span>
     </Container>
    </PageContext.Provider>
    
  )
}

export default Child

function Container(props){
 const myContext = useContext(PageContext);
    return <div>
        {Children.map(props.children,(child,i)=>i!=1 ?<span key={i}>
            [start]
            {child}
            [end]
            <br />
        </span>:null)}
        <button onClick={()=>myContext.changeText('second')}>press here</button>
        </div>
}

function Frame(props) {
   return <div >
    <fieldset>
    <legend>{props.title}</legend>
    <Container>
      <p>"Hey, how are you doing? I was just wondering if you'd like to meet up tomorrow evening.
         Maybe we could grab a coffee or something like that. Let me know what you think!"
           Let me know if you'd like something different. 😊
      </p>
      </Container>
      </fieldset>
   </div> 
}
function Displayer(props) {
    const [select,setSelect]=useState(0)
    return <div style={{textAlign:'center'}}>
        <input type="number" 
        min={0} 
        max={ Children.count(props.children)} 
        onChange={ev=>setSelect(ev.target.value)} 
        value={select} />
       <p> {Children.count(props.children)==1?props.children:props.children[select-1]}</p>
    </div>
}
