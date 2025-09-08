import React,{ useState} from 'react'
import {Container, Logo} from "../index"
import {  Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '../index'
import LogoutBtn from './LogoutBtn'


function Header() {
    const authStatus = useSelector ((state) => state.auth.status)
    const [menuOpen, setMenuOpen] = useState(false);


    const navItems =[
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'SignUp',
            slug: '/signUp',
            active: !authStatus
        },
        {
          name: 'AllMeals',
          slug: '/meals',
          active: authStatus
        }
      
    ]

    return (
        <header className='sticky top-0 z-50 shadow-md 
  bg-gradient-to-r from-pink-400/50 via-purple-500/50 to-indigo-500/50 backdrop-blur-lg px-6  rounded-2xl m-2 mb-6'>
  <Container>
    <nav className='flex items-center justify-between'>
      
      {/* Logo */}
      <div >
        <Link to={'/'}>
          <Logo />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex ml-auto mr-2 items-center gap-2">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `block transition transform px-3 py-2 rounded-lg 
                     font-medium text-white
                     hover:scale-105 hover:text-blue-400
                     ${
                       isActive
                         ? "underline decoration-2 underline-offset-4 decoration-violet-400"
                         : ""
                     }`
                  }
                >
                  <Button variant="ghost" className="text-inherit">
                    {item.name}
                  </Button>
                </NavLink>
              </li>
            )
        )}

        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white p-2 rounded-full hover:bg-white/20"
        >
          ☰
        </button>
      </div>
    </nav>

    {/* Mobile Dropdown */}
    {menuOpen && (
      <ul className="flex flex-col gap-2 mt-2 md:hidden bg-white/20 backdrop-blur-lg p-4 rounded-lg">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg 
                     font-medium text-white
                     hover:bg-white/30 hover:text-blue-400 
                     ${
                       isActive
                         ? "underline decoration-2 underline-offset-4 decoration-violet-400"
                         : ""
                     }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            )
        )}
        {authStatus && <LogoutBtn />}
      </ul>
    )}
  </Container>
</header>


    )
}

export default Header
