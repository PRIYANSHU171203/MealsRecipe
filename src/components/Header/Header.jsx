import React from 'react'
import {Container, Logo} from "../index"
import {  Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '../index'
import LogoutBtn from './LogoutBtn'


function Header() {
    const authStatus = useSelector ((state) => state.auth.status)
    

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
      
    ]

    return (
        <header className='sticky top-0 z-50 shadow-md 
      bg-gradient-to-r from-pink-400/50 via-purple-500/50 to-indigo-500/50 
      backdrop-blur-lg 
      px-6 py-1 rounded-2xl m-2 mb-6 flex items-center justify-between'>
            <Container>
                <nav className='flex items-center justify-between'>
                <div className='m-2'>
                    <Link to={'/'}>
                    <Logo  />
                    </Link>
                </div>
                 <ul className="flex ml-auto mr-2 items-center gap-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `block transition transform px-3 py-2 rounded-lg 
                         font-medium text-white
                         hover:scale-105 hover:text-yellow-300 
                         ${
                           isActive
                             ? "underline decoration-2 underline-offset-4 decoration-red-500"
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
                </nav>
            </Container>

        </header>

    )
}

export default Header
