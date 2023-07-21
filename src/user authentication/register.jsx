import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import hub from '../images/hub.png'
import "./style.scss"
import { useContext, useState } from "react";
import { Context } from "../components/context-provider";
import google from '../images/google.svg'

const Register = () => {
    //useContext
    const {handleGoogleAuth} = useContext(Context)
    //useState
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        setError('')
        
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
            navigate('/')
        }
        catch(err){
            setError(err.code)
        }
        
    }
    
    const handleClick = async () => {
        handleGoogleAuth('register')
    }

    return(
        <div className="register">
            <div className="title">
                <h2>Learn<span>Hub</span></h2>
            </div>

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
                        {/* error message */}
                        {error && <p className="err-msg">{error}</p>}
                        <input type="text" placeholder="Username" minLength="2" required/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>

                        <button type='submit'>Register</button>
                    </form>
                    <button id="google" onClick={handleClick}>
                    <img src={google} alt="" />
                        Sign up with Google
                    </button>
                    <p>Already have an account?<Link to='/'>Login</Link></p>
                </div>
            </div>
            
        </div>
    )
}

export default Register