import { useContext, useEffect, useState } from "react"
import { Context } from "./context-provider"
import '../styles/comment.scss'
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
let sending = false
const Comment = ({contentName}) => {
    const {user} = useContext(Context)

    const [comment, setComment] = useState([{displayName: '', userComment: ''}])
    const [userComment, setUserComment] = useState('')
    const [active, setActive] = useState(false)

    useEffect(() => {
        const getComments = async () => {
            try {
                const docRef = doc(db, "comments", contentName);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setComment(docSnap.data().comments)
                } else {
                    await setDoc(doc(db, 'comments', contentName), {
                        comments: [{displayName: "", userComment: ""}]
                    })
                }
            } catch (error) {
                console.log('getComments', error)
            }
        }
        return (() => {getComments()})
    }, [active])

    // console.log(comment)
    const addComment = async e => {
        e.preventDefault()
        sending = true
        setComment((prev)=> [...prev, {displayName: user.displayName, userComment}])
        // console.log(comment)
        // update comments
        const updateProfile = doc(db, "comments", contentName);
        await updateDoc(updateProfile, {
            comments: comment
        })
        .then(() => {
            sending = false
            setUserComment('')
        })
        .catch(e => console.log("update", e))
    }

    const handleCommentChange = e => {
        setUserComment(e.target.value)
    }

    const handleUpdate = async () => {
        if(active){
            const updateProfile = doc(db, "comments", contentName);
        await updateDoc(updateProfile, {
            comments: comment
        })
        .then(() => {
            sending = false
            setUserComment('')
            setActive(!active)
        })
        .catch(e => console.log("update", e))
        }
        setActive(!active)
    }

    return(
        <div className="Comment">
            <div className="comment-icon" onClick={handleUpdate}>
                <i className='fa-solid fa-comment'></i>
                <p> {comment.length}</p>
            </div>
                {
                    active &&
                    <>
                    <div className="comment-session">
                    <div className="comment-area">
                        <h4>Comments</h4>
                        {
                            comment.map(com => {
                                return(
                                    <div className='comment'>
                                        <p className='displayName'>{com.displayName}</p>
                                        <p className='user-comment'>{com.userComment}</p>
                                    </div>
                                    )
                                })
                            }
                    </div>
                    <form className="text-area" onSubmit={addComment}>
                        <input type="text" required placeholder='Enter comment' value={userComment} onChange={handleCommentChange}/>
                        <button><i className='fa-solid fa-paper-plane'></i></button>
                    </form>
                    {
                        sending &&
                        <p>sending...</p>
                    }
                <button className="close-btn" onClick={handleUpdate}>Close</button>
                </div>
                </>
                }
            </div>
    )
}

export default Comment