import React,{useState} from 'react'
import { Button, Input } from '../components'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import authService from '../appwrite/auth'

function UpdatePass() {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async () => {
  if (!oldPassword || !newPassword || !confirmPassword) {
    toast.error("Please fill in all fields")
    return
  } 
  if (newPassword.length < 8) {
    toast.error("Password must be at least 8 characters long.")
    return
  }
  if (newPassword !== confirmPassword) {
    toast.error("Passwords mismatch..!!")
    return
  }

  try {
    setLoading(true)
    await authService.updatePass(newPassword, oldPassword)
    toast.success("Password updated successfully ✅")
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
    navigate(-1)
  } catch (error) {
    toast.error("Failed to update password.")
    console.log("Update password error:", error)
  } finally {
    setLoading(false)
  }
}



  return (
        <div className='flex justify-center p-5'>
            <div className='relative grid gap-3 bg-blue-50 shadow-2xl  rounded-3xl p-5'>
                <button
      type="button"
      onClick={() => navigate(-1)}   // Go back to previous page
      className="absolute top-0 right-3 hover:text-red-500 text-3xl  text-gray-800"
    >
      <FontAwesomeIcon icon={faXmarkCircle} size="xs" />
    </button>
                <Input
                    type="text"
                    label="Current Password"
                    className="w-full"
                    placeholder="Enter Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                <Input
                    type="text"
                    label="New Password"
                    className='w-full '
                    placeholder="Enter New Password"  
                    onChange={(e) => setNewPassword(e.target.value)}             
                />
               
                <div className='relative'>
                <Input
                    type="password"
                    label="Confirm Password"
                    className='w-full' 
                    placeholder="Re-enter Password" 
                    onChange={(e) => setConfirmPassword(e.target.value)}              
                />
                </div>
                 <Button
                    type='submit'
                    className=' hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={handleUpdatePassword}
                 >  
                    {loading ? "Updating..." : "Update Password"}
                 </Button>
            </div>
        </div>
    )
}

export default UpdatePass;
