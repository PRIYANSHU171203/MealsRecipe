import React,{ useState} from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { Input, Container, Button } from '../components'
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';  

function ForgotPass() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleRecovery = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      await authService.sentRecoveryEmail(email);
      toast.success("Recovery email sent! Please check your inbox.");
      navigate("/login");
    } catch (error) {
      console.error("Recovery email error:", error);
      if(error?.code === 404) toast.error("User not found.");
      else toast.error("Failed to send recovery email. Try again.");
    }
  };
    return (
         <Container>
      <div className="flex justify-center items-center ">
        <div className="relative grid gap-4 p-7 bg-amber-50 w-full max-w-lg rounded-lg shadow-md">
          <FontAwesomeIcon icon={faXmarkCircle} size="lg" className="absolute top-2 right-2 hover:text-red-600 cursor-pointer" onClick={() => navigate("/login")} />
          <p className="font-semibold">
            Please enter your email address to recover your password
          </p>

          <Input
            type="email"
            label="Email:"
            placeholder="Enter your email"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="button" onClick={handleRecovery}>
            Send
          </Button>
        </div>
      </div>
    </Container>
    )
}

export default ForgotPass
