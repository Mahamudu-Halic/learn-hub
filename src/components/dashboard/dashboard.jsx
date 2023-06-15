import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth, db } from "../../firebase"
import { signOut } from "firebase/auth"
import { Context } from "../context provider/context-provider"
import { doc, getDoc } from 'firebase/firestore'
const dashboard = [
    {
        id: 1,
        url: '/',
        title: 'Overview',
        icon: 'fa-solid fa-house'
    },
    {
        id: 2,
        url: '/courses',
        title: 'Courses',
        icon: 'fa-solid fa-book'

    },
    {
        id: 3,
        url: '/add-course',
        title: 'Add Course',
        icon: "fa-solid fa-plus"
    },
    {
        id: 4,
        url: '/upload-file',
        title: 'Upload File',
        icon: 'fa-solid fa-file-arrow-up'
    },
    {
        id: 5,
        url: '/upload-video',
        title: 'Upload Tutorial',
        icon: 'fa-solid fa-video'
    },
    {
        id: 6,
        url: '/settings',
        title: 'Settings',
        icon: 'fa-solid fa-gear'
    },
]

const Dashboard = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const {currentUser, user, setUser} = useContext(Context)
    // console.log('dashboard', currentUser)
    const handleClick = () => {
        setActive(!active)
    }

    const logout = () => {
        signOut(auth)
        navigate('/')
    }

    useEffect(() => {
        const getUser = async () => {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUser(docSnap.data())
            } else {
            console.log("No such document!");
            }
        }

        return (() => {getUser()})
    }, [])


    return(
        <div className="dashboard">
            <h1>LearnHub</h1>
            {
                dashboard.map(({id, url, title, icon}) => {
                    return(
                        <Link
                            key={id}
                            to={url}
                            className={`${window.location.pathname === url ? 'active' : ''}`}
                            onClick={handleClick}
                        >
                            <i className={icon}></i>
                            {title}
                        </Link>
                    )
                })
            }

            <div className="bottom">
                <span className="user">
                    <i className="fa-solid fa-user"></i>
                    {user.displayName}
                </span>
                <button className="logout"onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard