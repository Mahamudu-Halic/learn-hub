import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import "./style.scss"
import { doc, setDoc } from "firebase/firestore";
const Login = () => {
    // const {}
    let email, password
    const handleSubmit = e => {
        e.preventDefault()
        email = e.target[0].value
        password = e.target[1].value
        
        try{

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
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
        console.log('clicked')
        signInWithPopup(auth, provider)
        .then( async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                description: '',
                schoolEmail: '',
                program: '',
                phoneNumber: '',
                level: ''
            })
            console.log(user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    return(
        <div className="form-wrapper">
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
    )
}

export default Login