import { Route, Routes } from 'react-router-dom'

import './firebase/setup'
import { useAuthPersistance } from './hooks/useAuthPersistance'
import PublicRoute from './navigation/PublicRoute'
import Questions from './components/Questions/Questions'
import List from './components/List/List'
import Nav from './components/Nav/Nav'
import Napster from './components/Napster/Napster'
import PlaylistView from './components/Napster/PlaylistView'
import Login from './components/LoginScreen/Login'

function App () {
  useAuthPersistance()

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Questions />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/list' element={<List />} />
        <Route path='/napster' element={<Napster />} />
        <Route path='/napster/:playlistId' element={<PlaylistView />} />

        <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
