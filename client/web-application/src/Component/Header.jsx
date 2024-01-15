import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-green-500 '>
      <div className=' flex items-center justify-between max-w-6xl mx-auto p-3'>
        <h2 className='font-bold text-white'>Auth app</h2>
        <ul className='flex items-center gap-4 text-white'>
            <Link to={'/'}>
                <li>Home</li>
            </Link>
            <Link to={'/aboutUs'}>
                <li>About us</li>
            </Link>
            <Link to={ currentUser? `profile/${currentUser._id}`: '/signIn'}>
              {currentUser ? (
                <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover'/>
              ): (
                <li>Sign In</li>
              )}
            </Link>
            
        </ul>
      </div>
    </header>
  )
}
