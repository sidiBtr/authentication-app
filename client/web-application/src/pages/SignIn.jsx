import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import OAuth from '../Component/OAuth'
export default function signIn() {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      dispatch(signInStart())
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      if(!response.ok){
        console.log('error connecting to the backend', response.status)
        return dispatch(signInFailure('error connecting to the backend'))
      }
      const data = await response.json()
      dispatch(signInSuccess(data))
      console.log(' succssully signed in', data)
      navigate('/')
      
    } catch(error){
      console.log('error connecting to the backend', error)
      dispatch(signInFailure(error))
    }
  }
  return (
    <div className='max-w-xl mx-auto'>
      <h2 className='text-center font-bold my-6'>Sign In</h2>
      <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>
        <input type='text' id='email' placeholder='email' className='bg-slate-100 p-2 rounded-lg outline-none'
          onChange={handleChange}
        />
        <input type='password' id='password' placeholder='password' className='bg-slate-100 p-2 rounded-lg outline-none'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 rounded-lg p-2 hover:opacity-90 disabled:opacity-80 text-white '>
          {loading? '...loading': 'SIGN IN'} </button>
          <OAuth/>
      </form>
      <div className='flex gap-2 mt-3'>
      <p>Do not have an acount ?</p>
      <Link to={'/signUp'}>
      <span className='text-blue'>sign up</span>
      </Link>
      </div>
      <p className='text-red-500'>{error ? 'something went wrong' : " "}</p>
    </div>
  )
}

