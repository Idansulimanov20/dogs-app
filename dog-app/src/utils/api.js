const BASE_URL = "http://localhost:3000/api";

function APICall(url,method,body){
    const options = {method}
    if(body){
        options.body = JSON.stringify(body);
        options.headers = {"content-type":"application/json"};
    }
    return fetch (BASE_URL+url,options)
    .then(res=>res.json())
    .then(res=>{
        if(res.status=="success")
            return res.data;
        else{
            throw new Error(res.message);
        }
    });
}

export const createUser = name=>APICall("/user",'POST',{name});
export const getUsers = ()=>APICall("/users",'GET');
export const getUserById = (id)=>APICall(`/user/${id}`,'GET');
export const updateUserName = (id,name)=>APICall(`/user/${id}/name`,'PATCH',{name});
export const updateUserProfile =(id,profilePic)=>APICall(`/user/${id}/profile`,'PATCH',{profilePic});
export const deleteUserById = (id)=>APICall(`/user/${id}`,'DELETE');
export const deleteUserProfile = (id)=>APICall(`/user/${id}/profile`,'DELETE');
export const addFavorite = (id,imgSrc)=>APICall(`/user/${id}/favorite`,'POST',{imgSrc});
export const getFavorites = (id)=>APICall(`/user/${id}/favorites`,'GET');
export const updateFavoriteName = (id,favId,name)=>APICall(`/user/${id}/favorite/${favId}/name`,'PATCH',{name});
export const deleteFavorite = (id,favId)=>APICall(`/user/${id}/favorite/${favId}/`,'DELETE');
