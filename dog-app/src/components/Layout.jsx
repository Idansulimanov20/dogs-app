import { useEffect,useState,useContext } from "react";
import { BreedImages, FavoriteImages } from "./ImageCollection.jsx";
import './css/Layout.css'
import { Outlet,NavLink,useNavigate } from "react-router-dom";
import PopupButton from "./PopupButton.jsx";
import { DogsContext } from "./Context.jsx";

function UserBox(props){
  const {activeUser, setActiveUser} = useContext(DogsContext);
  const {name, profilePic, id} = props;
  return <div className="userBox" onClick={()=>setActiveUser(id)}>
    <div className="profilePic" style={{backgroundColor: 'orange'}}/>
    <h3 className={activeUser==id ? 'activeUser' : ''}>
      {name}
    </h3>
  </div>
}

function UsersPopup(props){
  const {users, activeUser} = useContext(DogsContext);
  const activeUserName = users.find(user=>user._id==activeUser)?.name;
  return <PopupButton title={activeUserName || 'Guest'}>
    <div className="usersCont">
      {users.map(user=><UserBox
        key={user._id}
        name={user.name}
        profilePic={user.profilePic}
        id={user._id}
      />)}
    </div>
  </PopupButton>;
}
function Header() {
  return (
    <header className="head">  
      <UsersPopup></UsersPopup>
      <h1>🐶dog-app🐶</h1>
      <nav>
    <NavLink to='/'>Random</NavLink>
    <NavLink to='/breeds/'>By Breed</NavLink>
    <NavLink to='/favorite'>Favorites</NavLink>
      </nav>
    </header>
  )
}
function SideBar(){
  const [choose, setChoose] = useState();
  useEffect(()=>{
    fetch(' https://dog.ceo/api/breeds/list/all')
      .then(res=>res.json())
      .then(obj=>setChoose(Object.keys(obj.message)));
  }, [])
  return <div className="sidebar">
    {choose?.map((item, i)=><NavLink
    to={`/breeds/${item}`}
      key={i}
      style={({isActive})=>isActive ? {textDecoration: 'underline'} : {}}>
        {item}
    </NavLink>) || <span >loading...</span>}
  </div>
}

export default function Layout(props) {
  const {breed, setBreed} = props;
  return <div className="container">
    <Header/>
    <SideBar onChoice={setBreed} activeBreed={breed}/>
    <Outlet/>
  </div>; 
}