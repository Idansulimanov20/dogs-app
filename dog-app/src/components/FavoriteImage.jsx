// import { useState, useEffect, useContext } from "react";
// import "./css/Image.css";
// import { DogsContext } from "./Context";

// function FavoriteImage({ src }) {
//   const { favorites, removeFromFavorites, updateFavoriteName, updateProfile } =
//     useContext(DogsContext);
//   const [liked, setLiked] = useState(false);
//   const [likedName, setLikedName] = useState("");

//   useEffect(() => {
//     const favorite = favorites.find((fav) => fav.imgSrc === src);
//     setLiked(favorite?._id || false);
//     setLikedName(favorite?.name || "");
//   }, [src, favorites]);

//   const handleUpdateName = () => {
//     const newName = prompt("Enter a new name:");
//     if (newName) {
//       setLikedName(newName);
//       updateFavoriteName(liked, newName);
//     }
//   };

//   const handleRemove = () => {
//     if (liked) {
//       removeFromFavorites(liked);
//     }
//   };

//   const handleMakeProfile = () => {
//     if (liked) {
//       updateProfile(liked);
//     }
//   };

//   return (
//     <div className="favorite-image">
//       <div className="imgContainer" onClick={handleRemove}>
//         <span className="heart">{liked ? "❤️" : "🤍"}</span>
//         <img src={src} alt={likedName || "Favorite Dog"} />
//       </div>
//       <div className="controls">
//         <span className="liked-name">{likedName}</span>
//         <button onClick={handleUpdateName} title="Edit Name">✍</button>
//         <button onClick={handleMakeProfile} title="Set as Profile Picture">Make Profile</button>
//       </div>
//     </div>
//   );
// }

// export default FavoriteImage;
import { useState, useEffect, useContext } from "react";
import "./css/Image.css";
import { DogsContext } from "./Context";

function FavoriteImage({ src }) {
  const { favorites, removeFromFavorites, updateFavoriteName, updateProfile } =
    useContext(DogsContext);
  const [liked, setLiked] = useState(false);
  const [likedName, setLikedName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const favorite = favorites.find((fav) => fav.imgSrc === src);
    setLiked(favorite?._id || false);
    setLikedName(favorite?.name || "");
  }, [src, favorites]);

  const handleUpdateName = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setLikedName(e.target.value);
  };

  const handleBlurOrEnter = () => {
    setIsEditing(false);
    if (likedName.trim()) {
      updateFavoriteName(liked, likedName);
    }
  };

  const handleRemove = () => {
    if (liked) {
      removeFromFavorites(liked);
    }
  };

  const handleMakeProfile = () => {
    if (liked) {
      updateProfile(liked);
    }
  };

  return (
    <div className="favorite-image">
      <div className="imgContainer" onClick={handleRemove}>
        <span className="heart">{liked ? "❤️" : "🤍"}</span>
        <img src={src} alt={likedName || "Favorite Dog"} />
      </div>
      <div className="controls">
        {isEditing ? (
          <input
            type="text"
            value={likedName}
            onChange={handleNameChange}
            onBlur={handleBlurOrEnter}
            onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter()}
            autoFocus
            className="name-input"
          />
        ) : (
          <span className="liked-name" onClick={handleUpdateName}>
            {likedName || "tap to name"}
          </span>
        )}
        <button onClick={handleMakeProfile} title="Set as Profile Picture" className="">
       📸
        </button>
      </div>
    </div>
  );
}
export default FavoriteImage;
