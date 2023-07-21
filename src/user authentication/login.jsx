import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./style.scss"
import hub from '../images/hub.png'
import { useContext, useState } from "react";
import { Context } from "../components/context-provider";
import google from '../images/google.svg'
const Login = () => {
    // useContext
    const {handleGoogleAuth} = useContext(Context)
    //useState
    const [error, setError] = useState('')
    const handleSubmit = e => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        setError('')
        try{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // const user = userCredential.user;
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('eror',errorMessage)
            console.log(errorCode)
            setError(errorCode)
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
        <div className="login">
            {/* title */}
            <div className="title">
                <h2>Learn<span>Hub</span></h2>
            </div>

            {/* form wrapper */}
            <div className="form-wrapper">
                {/* hub */}
                <div className="hub">
                    <img src={hub} 
                        alt="" 
                        width='100%'
                    />
                </div>

                {/* form */}
                <div className="form">
                    <form action="" onSubmit={handleSubmit}>
                        <h2>Sign In</h2>
                        {/* error message */}
                        {error && <p className="err-msg">{error}</p>}
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>

                        <button type='submit'>Login</button>
                    </form>

                    <button id="google" onClick={handleClick}>
                        <img src={google} alt="" />
                        Sign In with Google
                    </button>
                    <p>Don't have an account?<Link to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login