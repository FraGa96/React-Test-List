import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Nav = () => {
  const { isLoggedIn } = useAuth()
  const navStyles = ({ isActive }) =>
    `py-4 px-5 font-semibold hover:text-slate-500 hover:bg-slate-100 transition duration-300
    ${!isActive
      ? 'text-gray-500  bg-white'
      : 'text-slate-500  bg-slate-100'}`

  return (
    <nav className='bg-white shadow-lg max-w- mx-auto px-4 flex'>
      <Link to='/' className='flex items-center py-4 px-2'>
        <span className='font-bold text-slate-500 text-2xl'>
          React Practices
        </span>
      </Link>

      <div className='hidden md:flex items-center space-x-1 ml-5 justify-between flex-1'>
        <div>
          <NavLink
            to='/questions'
            className={actived => navStyles(actived)}
          >
            Questions
          </NavLink>

          <NavLink
            to='/list'
            className={navStyles}
          >
            List
          </NavLink>

          <NavLink
            to='/napster'
            className={navStyles}
          >
            Napster
          </NavLink>
        </div>

        <div>
          {!isLoggedIn ? (
            <NavLink
              to='/login'
              className={navStyles}
            >
              Login
            </NavLink>
          ) : null}

        </div>
      </div>
    </nav>
  )
}

export default Nav
