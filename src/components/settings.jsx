import { useContext, useEffect, useState } from "react"
import { Context } from "./context-provider"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import '../styles/settings.scss'
const Settings = () => {
    //useContext
    const { user, setUser, currentUser } = useContext(Context)
    //useState
    const [edit, setEdit] = useState(false)
    const [displayName, setdisplayName] = useState(user.displayName)
    const [description, setdescription] = useState(user.description)
    const [program, setprogram] = useState(user.program)
    const [schoolEmail, setschoolEmail] = useState(user.schoolEmail)
    const [phoneNumber, setphoneNumber] = useState(user.phoneNumber)
    const [level, setlevel] = useState(user.level)
    const [saved, setSaved] = useState('')

    // assign values to state
    const assignCurrentValues = () => {
        setdisplayName(user.displayName)
        setdescription(user.description)
        setprogram(user.program)
        setphoneNumber(user.phoneNumber)
        setlevel(user.level)
        setschoolEmail(user.schoolEmail)
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUser(docSnap.data())
                } 
            } catch (error) {
                console.log('dashboard getuser', error)
            }
        }

        return (() => {getUser()})
    }, [displayName, description,program, schoolEmail, phoneNumber, level])

    //userProfile array list
    const userProfile = [
        {
            id: "name",
            label: "Display Name",
            value: user.displayName
        },
        {
            id: "description",
            label: "Description",
            value: user.description
        },
        {
            id: "prgram",
            label: "Program of Study",
            value: user.program
        },
        {
            id: "email",
            label: "Pesonal Email",
            value: user.email
        },
        {
            id: "schoolEmail",
            label: "School Email",
            value: user.schoolEmail
        },
        {
            id: "tel",
            label: "Phone Number",
            value: user.phoneNumber
        },
        {
            id: "level",
            label: "Year of Study",
            value: user.level
        },
    ]

    //handle click to edit state
    const handleClick = () => {
        setEdit(!edit)
        setSaved('')
        assignCurrentValues()
    }

    //handle submit
    const handleSubmit = async e => {
        e.preventDefault()
        setSaved('saving...')
        const updateProfile = doc(db, "users", user.uid);

        // update user profile
        await updateDoc(updateProfile, {
            displayName,
            description,
            program,
            schoolEmail,
            phoneNumber,
            level
        })
        .then(() => {
            setSaved('save successful')
        })
        
        .catch(err => console.log('settings',err))
        
    }

    return(
        <div className="settings">
            <div className="hero user-profile">
                <h3 className="">User Profile</h3>
                <h2><i className="fa-solid fa-user"></i> {user.displayName}</h2>
            </div>
            <div className="info">            
                {/* user profile */}
                {
                    !edit &&
                    <div className="form">
                    <form action="">
                        {
                            userProfile.map(({id, label, value}) => {
                                return(
                                    <div className={`form-group ${id}`} key={id}>
                                        <label htmlFor="">{label}:</label>
                                        <p>{value}</p>
                                    </div>
                                )
                            })
                        }

                        {/* edit button */}
                    </form>
                    <button 
                        type="button"
                        className="edit" 
                        onClick={handleClick}>
                            <i className="fa-solid fa-pencil"></i> Edit
                    </button>
                    </div>
                }

                {/* edit user profile */}
                {
                    edit && 
                    <div className="form">
                    <form className="edit-profile" onSubmit={handleSubmit}>
                        <div className="edit-profile-inputs">
                            {/* display name */}
                            <div className="form-group">
                                <label htmlFor="displayName">Display Name:</label>
                                <input type="text" id="displayName" value={displayName} onChange={e => setdisplayName(e.target.value)} maxLength='20' minLength='2' required/>
                            </div>

                            {/* description */}
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <textarea name="" id="description" cols="30" rows="5" placeholder="software developer..." value={description} onChange={e => setdescription(e.target.value)}></textarea>
                            </div>

                            {/* editProfile */}
                            <div className="form-group">
                                <label htmlFor="program">Program of Study:</label>
                                <input type="text" id="program" value={program} onChange={e => setprogram(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="schoolEmail">School Email:</label>
                                <input type="text" id="schoolEmail" value={schoolEmail} onChange={e => setschoolEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number:</label>
                                <input type="text" id="phoneNumber" value={phoneNumber} onChange={e => setphoneNumber(e.target.value)}/>
                            </div>

                            {/* select level */}
                            <div className="form-group">
                                <label htmlFor="year">Year of Study:</label>
                                <select name="" id="year" value={level} onChange={e => setlevel(e.target.value)}>
                                    <option value="">Select year</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                        </div>
                        

                        {/* save */}
                        <button type="submit"><i className="fa-solid fa-save"></i> Save</button>
                    </form>
                        <p className="saved">{saved}</p>
                    {/* {saved && <p className="saved">jj</p>} */}


                    {/* back */}
                    <button 
                    className="back" 
                        onClick={() => {
                            handleClick()
                            // window.location.reload()
                        }}>
                            <i className="fa-solid fa-arrow-left"></i> back
                    </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Settings