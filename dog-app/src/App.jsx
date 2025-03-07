import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import { BreedImages, FavoriteImages, RandomImages } from './components/ImageCollection.jsx'
import Child from './components/Child.jsx'
import { DogContextProvider } from './components/Context.jsx'
function App() {
  const [breed, setBreed] = useState('hound');
  return <DogContextProvider>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout setBreed={setBreed} breed={breed}/>} >
      <Route index element={<RandomImages/>}/>
        <Route path='/breeds/:breed?' element={<BreedImages/>}/>
      <Route path='favorite' element={<FavoriteImages/>}/>
    </Route>
    <Route path='/child' element={<Child/>}/>
  </Routes>
  </BrowserRouter>
  </DogContextProvider>
}

export default App
