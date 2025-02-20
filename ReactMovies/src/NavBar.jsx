const NavBar= ()=>{
    return(
            <nav className="bg-black w-screen">
                <div className="flex justify-between w-screen px-10 h-16 items-center">
                <h1 className="text-white text-2xl"><span className="text-red-700">Movies</span> App</h1>
                <button className=" border border-solid border-red-700 bg-red-700 text-white h-11 px-2 rounded-md">Add Movie</button>
                </div>
               
            </nav>
    )
}

export default NavBar