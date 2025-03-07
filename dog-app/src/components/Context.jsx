import { createContext,useEffect,useState } from 'react'
import { addFavorite, createUser, deleteFavorite, deleteUserById, getFavorites,getUsers,updateFavoriteName,updateUserProfile } from '../utils/api';
export const DogsContext = createContext();
export function DogContextProvider(props) {
  //stats
  const [activeUser,setActiveUser]=useState('');
  const [favorites, setFavorites] = useState([]);
  const [users,setUsers] = useState([]);
 // favorite handler
 const updateFavorites = () => activeUser && getFavorites(activeUser).then(setFavorites);
 useEffect(()=>{
  updateFavorites();
},[activeUser])
 const addToFavorites=(imgSrc)=>addFavorite(activeUser,imgSrc).then(updateFavorites)
 const removeFromFavorites=(favId)=>deleteFavorite(activeUser,favId).then(updateFavorites)
 const updateNameOfFavorite=(favId,name)=>updateFavoriteName(activeUser,favId,name).then(updateFavorites)
 const chooseProfile=(favId)=>updateUserProfile(activeUser,favId).then(updateFavorites)
 // users handler
 const updateUsers = () =>getUsers().then(setUsers);
 useEffect(()=>
  {updateUsers()}
 ,[]);
 const addUser = name =>createUser(name).then(updateUsers);
 const removeUser = id =>deleteUserById(id).then(updateUsers);
// value
    const value = {
      activeUser,
      setActiveUser,
      favorites,
      addToFavorites,
      removeFromFavorites,
      updateNameOfFavorite,
      chooseProfile,
      users,
      addUser,
      removeUser
    };
  return (
    <DogsContext.Provider value={value}>
      {props.children}
    </DogsContext.Provider>
  )
}

 
