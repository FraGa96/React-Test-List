import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authRestarted, login } from '../../slices/authSlice';
import Loader from '../Loader/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    isLoading,
    error,
  } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRestarted())
  }, [email, password])

  const handleemailChanged = useCallback((event) => {
    setEmail(event.target.value);
  }, [])

  const handlepasswordChanged = useCallback((event) => {
    setPassword(event.target.value);
  }, [])

  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(login({ email, password }))
  }, [email, password])

  const errorMessage = useMemo(() => {
    if (!error) {
      return ''
    }

    switch (error.code) {
      case 'auth/invalid-email':
        return 'Invalid email format'
      default: return 'Could not login'
    }
  }, [error])

  return (
    <section className='grid place-items-center w-screen h-full mt-20'>
      <form
        className='bg-white p-10 rounded-xl w-[50%] text-center flex flex-col'
        onSubmit={handleSubmit}
      >
        <h1 className='text-4xl font-bold text-slate-500 mb-1.5'>
          Log-in
        </h1>

        <div className="w-[50%] flex flex-col m-auto items-start">
          <label className="py-2 flex w-full">
            <span className="px-3 w-1/4">E-mail</span>

            <input
              className='border flex-1'
              type="text"
              value={email}
              onChange={handleemailChanged}
            />
          </label>

          <label className="py-2 flex w-full">
            <span className="px-3 w-1/4">Password</span>

            <input
              className='border flex-1'
              type="password"
              value={password}
              onChange={handlepasswordChanged}
            />
          </label>
        </div>

        <span className='text-red-600 text-sm'>{errorMessage}</span>

        <div className="pt-3">
          <button type="submit" className="">
            Go!
          </button>
        </div>
      </form>

      {isLoading && (
        <div className='fixed h-full w-full top-0 bottom-0 bg-black/30'>
          <Loader />
        </div>)}
    </section>
  )
}

export default Login;
