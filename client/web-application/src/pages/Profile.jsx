import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import {useParams} from 'react-router-dom'
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { useDispatch } from "react-redux"
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOut } from "../redux/user/userSlice"

export default function Profile() {
  const {id} = useParams()
  const[image, setImage] = useState(null)
  const [imagePercent, setImagePercent] = useState(0) 
  const [imageError, setImageError] = useState(null)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const imgRef = useRef()
  const {currentUser} = useSelector((state) => state.user)
  console.log(imagePercent)
  useEffect(() => {
    if(image){
      handleFileUpload(image)
    }
  }, [image])

  const handleFileUpload = async(image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask =  uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setImagePercent(Math.round(progress)); // Update the progress state
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  // handle update function
  const handleUpdate = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    handleUpdate(e)
    try{
      dispatch(updateUserStart())
      const response = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      if(!response){
        return console.log('error connecting to the backend', response.status)
        dispatch(updateUserFailure('error connection'))
      } 
      const data = await response.json()
      dispatch(updateUserSuccess(data))
      
    } catch(error){
      console.log(error)
      dispatch(updateUserFailure(error))
    }
  }
  const handleDelete = async () => {
    try{
      dispatch(deleteUserStart())
      const res = fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: 'POST'
      })
      if(!res.ok){
         console.log('error connecting to the backend', res.status)
        dispatch(deleteUserFailure('error connecting to the api'))
      } 
      const data = await res.json()
      dispatch(deleteUserSuccess(data))
    } catch(error){
      console.log(error)
    }
  }
  
  const handleSignout = async () => {
    try{
      
      await fetch('http://localhost:3000/api/auth/signout')
      dispatch(signOut())
    } catch(error){
      console.log(error)
    }
  }
  return (
    <div className=" max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" hidden accept="images/*" ref={imgRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img src= { formData.profilePicture||currentUser.profilePicture} alt="profile"
          className="h-24 w-24 rounded-full self-center object-cover "
          onClick={() => imgRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError && <span className="text-red-700">Error uploading</span>}
          {imagePercent > 0 && imagePercent < 100 && (
            <span className="text-red-700">Uploading {imagePercent}%</span>
          )}
          {imagePercent === 100 && (
            <span className="text-green-700">Uploaded successfully</span>
          )}
       </p>
        <input defaultValue={currentUser.email} type="text" id="username" placeholder="user name"
          className="rounded-lg p-2 bg-slate-100 outline-none"onChange={handleUpdate}
        />
         <input defaultValue={currentUser.username} type="text" id="email" placeholder="Email"
          className="rounded-lg p-2 bg-slate-100 outline-none" onChange={handleUpdate}
        />
        <input defaultValue={currentUser.password} type="password" id="password" placeholder="password"
          className="rounded-lg p-2 bg-slate-100 outline-none" onChange={handleUpdate}
        />
        <button className="bg-slate-700 p-2 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80 ">update</button>
      </form>
      <div className="flex items-center justify-between text-white cursor-pointer">
        <span onClick={handleDelete}>Delete</span>
        <span onClick={handleSignout}>Sign out</span>
      </div>
    </div>
  )
}
