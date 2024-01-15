
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Header from './Component/Header'
import PrivateRoute from './Component/PrivateRoute'

function App() {

  return (
    <div className='bg-sky-300  w-screen h-screen'>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutUs' element={<About/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/signIn' element={<SignIn/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/profile/:id' element={<Profile/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
