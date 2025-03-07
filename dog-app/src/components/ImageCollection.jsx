import {useContext, useEffect,useState} from "react";
import FavoriteImage from "./FavoriteImage.jsx";
import Image from "./Image.jsx";
import './css/ImageCollection.css'
import { useParams } from "react-router-dom";
import { DogsContext } from "./Context.jsx";

function ImageCollection(props) {
    const {imgArr,emptyText,prefix} = props;
    if (!imgArr){
        return <div className="dogBox">
          <span>{emptyText}</span>
        </div>;
      } else {
        return <div className="dogBox">
          {imgArr.map((item, i)=><Image key={prefix+i} src={item}/>)}
        </div>
}}

export  function BreedImages(){
  const {breed} = useParams();
  const [images, setImages] = useState();
  const [emptyText,setEmptyText]=useState()
  useEffect(()=>{
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/70`)
      .then(res=>res.json())
      .then(obj=>{
      if (obj.status =='success'){
        setImages(obj.message)
      }else{
        setImages();
        setEmptyText(obj.message)
      }})
  }, [breed]);
  return <ImageCollection 
  imgArr={images} 
  emptyText={emptyText}
  prefix={breed}/>;
}

export  function FavoriteImages(){
  const {favorites,activeUser}=useContext(DogsContext)
  if(!activeUser){
    return <h1>you can't have favorite images becuase you are not an active user 🤨</h1>;
  }
  if (favorites.length === 0) {
    return <h1>No favorite images yet. Start adding some! 😊</h1>;
  }
return  <div className="dogBox">
{favorites.map((favorite, i) => (
  <FavoriteImage key={favorite._id || i} src={favorite.imgSrc} />
))}
</div>
}
export  function RandomImages(){
  const [images, setImages] = useState();
  useEffect(()=>{
    fetch(`https://dog.ceo/api/breeds/image/random/70`)
      .then(res=>res.json())
      .then(obj=>setImages(obj.message));
  }, []);
  return <ImageCollection 
  imgArr={images} 
  emptyText={<span className="loading">🐶</span>} 
  prefix='random'/>;
}