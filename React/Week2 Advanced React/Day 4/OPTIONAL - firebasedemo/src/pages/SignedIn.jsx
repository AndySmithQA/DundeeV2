import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import  '../style.css';
 
const SignedIn = () => {
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
   
    return(
       <div>
            <h1 className='header'>You are now signed in</h1>
            
            <div>
        		<button onClick={handleLogout}>
                    Logout
                </button>
        	</div>

        </div>
    )
}
 
export default SignedIn;