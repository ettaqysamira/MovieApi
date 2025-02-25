import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './Componenet/NavBar'
import FetchApiTMDB from './Componenet/MovieFromApi'
import AddMovieForm from './Componenet/AddMovieForm'
import GetMoviesFromBDD from './Componenet/GetMoviesFromBDD'
import Favorites from './Componenet/Favorites'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<FetchApiTMDB />} />
          <Route path='/add' element={<AddMovieForm />} />
          <Route path='/getAdd' element={<GetMoviesFromBDD />} />
          <Route path='/getAdd/favoris' element={<Favorites />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
