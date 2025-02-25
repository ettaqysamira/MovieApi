import { Link } from "react-router-dom"
import { FaHeartCirclePlus } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'


const NavBar= ()=>{
    const navigate = useNavigate()

    return(
      <nav className="bg-black w-screen shadow-[0_4px_6px_0_rgba(255,255,255,0.2)]">
      <div className="flex justify-between w-screen px-10 h-16 items-center">
          <h1 className="text-white text-2xl">
              <span className="text-red-700">Movies</span> App
          </h1>
          <div className="flex gap-5 items-center">
              <button className="border border-solid border-red-700 bg-red-700 text-white h-11 px-2 rounded-md w-36">
                  <Link to="/getAdd">Get Movie Added</Link>
              </button>
              <button className="border border-solid border-red-700 bg-red-700 text-white h-11 px-2 rounded-md w-36">
                  <Link to="/add">Add Movie</Link>
              </button>
              
              <FaHeartCirclePlus className="size-8 my-4 text-red-700" onClick={() => navigate('/getAdd/favoris')} />
          </div>
      </div>
  </nav>
  
    )
}

<button 
        className="bg-red-700 text-white px-4 py-2 rounded-md mb-4 block mx-auto"
        onClick={() => navigate('/getAdd/favoris')}
      >
        Voir les favoris
      </button>

export default NavBar