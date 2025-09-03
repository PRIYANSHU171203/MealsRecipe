import React from 'react'
import {Container, Logo} from "../index"
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '../index'
import LogoutBtn from './LogoutBtn'


function Header() {
    const authStatus = useSelector ((state) => state.auth.status)
    const navigate = useNavigate()

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
        <header className='shadow sticky z-50 top-0 bg-gray-400 border-gray-200 px-4 lg:px-6 py-2.5'>
            <Container>
                <nav className='flex items-center justify-between'>
                <div className='m-2'>
                    <Link to={'/'}>
                    <Logo width='70px' />
                    </Link>
                </div>
                <div>
                  <ul className='flex ml-auto mr-2'>
                    {navItems.map((item) => 
                    item.active ? (
                         <li key={item.name}>
                            <Button
                            onClick={() => navigate(item.slug)}
                            className='inline-block px-6 py-2 duration-200 text-white bg-teal-500 rounded-lg hover:bg-teal-600 hover:text-white  lg:mt-0 mr-2'
                            >{item.name}</Button>
                        </li>
                    ) :  null )}
                    {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                  </ul></div>
                </nav>
            </Container>

        </header>

    )
}

export default Header
