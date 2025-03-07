import {useContext, useEffect,useState} from "react";
import './css/Image.css';
import { DogsContext } from "./Context";

export default function Image({src}){
  const [liked, setLiked] = useState();
  const {activeUser , favorites , addToFavorites , removeFromFavorites} = useContext(DogsContext)
  useEffect(()=>setLiked(favorites.find(favorite=>favorite.imgSrc==src)?._id), [src,favorites]);
  const heartClick = ()=>{
    if(!activeUser){
      return;
    }
    if (liked){
      removeFromFavorites(liked);
    } else {
      addToFavorites(src);
    }
  };
  return <div className="imgContainer" onClick={heartClick}>
    <span className="heart">{liked ? '❤️' : '🤍'}</span>
    <img src={src}/>
  </div>;
}