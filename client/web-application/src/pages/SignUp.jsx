import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../Component/OAuth'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      setLoading(true)
      setLoading(false)
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      if(!response.ok){
        console.log('error connecting to the backend', response.status)
        return setError(true)
      }
      const data = await response.json()
      setError(false)
      console.log('sign up succssull', data)
      navigate('/signIn')
      
    } catch(error){
      console.log('error connecting to the backend', error)
      setLoading(false)
      setError(true)
    }
  }
  return (
    <div className='max-w-xl mx-auto'>
      <h2 className='text-center font-bold my-6'>Sign Up</h2>
      <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>
        <input type='text' id='username' placeholder='username' className='bg-slate-100 p-2 rounded-lg outline-none'
          onChange={handleChange}
        />
        <input type='text' id='email' placeholder='email' className='bg-slate-100 p-2 rounded-lg outline-none'
          onChange={handleChange}
        />
        <input type='password' id='password' placeholder='password' className='bg-slate-100 p-2 rounded-lg outline-none'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 rounded-lg p-2 hover:opacity-90 disabled:opacity-80 text-white '>
          {loading? '...loading': 'SIGN UP'} </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-3'>
      <p>Have an acount?</p>
      <Link to={'/signIn'}>
      <span className='text-blue'>sign in</span>
      </Link>
      </div>
      <p className='text-red-500'>{error && 'something went wrong'}</p>
    </div>
  )
}
