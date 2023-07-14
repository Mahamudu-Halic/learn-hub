import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import "./style.scss"
import { doc, setDoc } from "firebase/firestore";
import hub from '../images/hub.png'
import { useContext } from "react";
import { Context } from "../components/context provider/context-provider";
const Login = () => {
    // useContext
    const {handleGoogleAuth} = useContext(Context)
    let email, password
    const handleSubmit = e => {
        e.preventDefault()
        email = e.target[0].value
        password = e.target[1].value
        
        try{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            });
        }
        catch(err){
            console.log(err)
        }
    }

    const handleClick = () => {
        handleGoogleAuth()
    }
    return(
        <div className="form-wrapper">
            <div className="hub">
                <img src={hub} 
                    alt="" 
                    width='100%'
                />
            </div>
            <div className="form">
                <form action="" onSubmit={handleSubmit}>
                    <h2>Sign In</h2>

                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>

                    <button type='submit'>Login</button>
                </form>

                <button id="google" onClick={handleClick}>
                <i className="fa-brands fa-google"></i>
                    Sign In with Google
                </button>
                <p>Don't have an account?<Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login