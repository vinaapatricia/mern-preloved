/* eslint-disable no-undef */
// import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DarkMode from "./DarkMode";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className=
    {
      scroll

        ? " h-16 w-full shadow-md fixed px-10 transition  ease-in-out duration-500 bg-white rounded-sm bg-clip-padding backdrop-filter backdrop-blur-sm text-black bg-opacity-40 z-20"
        : " bg-transparent h-16 w-full fixed transition ease-in-out duration-500 flex text-black items-center z-20"
    }
    >
    <div className="container py-3 sm:py-0">
      <div className=' flex mr-10 justify-between items-center lg:ml-20 xl:ml-50'>
      
          <Link to='/'>
            <h1 className=' mt-3 font-bold text-2xl sm:text-3xl flex gap-2 '>
              <span style={{ color: `var(--dark-color)` }}>Re-Loved</span>
            </h1>
            </Link>
        <div className='flex mt-3 justify-between items-center gap-4'>
          <div>
          <DarkMode />
          </div>
          <ul className="hidden sm:flex items-center gap-4">
            <Link to='/'>
              <li className='hidden sm:inline hover:scale-105 duration-200 hover:opacity-40 text-black py-1 px-4' >
                Home
              </li>
            </Link>
            <Link to='/about'>
              <li className='hidden sm:inline  hover:scale-105 duration-200 hover:opacity-40 text-black py-1 px-4'>
                About
              </li>
            </Link>
          </ul>
          <div>
              <Link to='/profile'>
              {currentUser ? (
                  <img
                    className='rounded-full h-7 w-7 object-cover'
                    src={currentUser.avatar}
                    alt='profile'
                  />
                ) : (
                  <Link to='/profile'>
              {currentUser ? (
                  <img
                    className='rounded-full h-7 w-7 object-cover'
                    src={currentUser.avatar}
                    alt='profile'
                  />
                ) : (
                  <button className=' bg-yellow-400 hover:bg-black text-white font-bold py-2 px-4 rounded-full hover:scale-105 duration-200 hover:opacity-40 flex items-center gap-3'> Sign in</button>
                )}
              </Link>
                )}
              </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
}
