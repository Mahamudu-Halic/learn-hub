import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import hub from '../images/hub.png'
import "./style.scss"
import { useContext } from "react";
import { Context } from "../components/context provider/context-provider";

const Register = () => {
    //useContext
    const {handleGoogleAuth} = useContext(Context)

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                description: '',
                schoolEmail: '',
                program: '',
                phoneNumber: '',
                level: ''
            })

            await setDoc(doc(db, 'files', res.user.uid), {})
            navigate('/')
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    const handleClick = async () => {
        handleGoogleAuth('register')
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
                    <h2>Get Started</h2>

                    <input type="text" placeholder="Username"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>

                    <button type='submit'>Register</button>
                </form>
                <button id="google" onClick={handleClick}>
                <i className="fa-brands fa-google"></i>
                    Sign up with Google
                </button>
                <p>Already have an account?<Link to='/'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register