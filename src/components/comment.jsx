import { useContext, useEffect, useState } from "react"
import { Context } from "./context-provider"
import '../styles/comment.scss'
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
const Comment = ({contentName}) => {
    // console.log(contentName)
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
                    console.log("inside", docSnap.data().comments)
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
    }, [])

    // console.log(comment)
    const addComment = async e => {
        e.preventDefault()
        setComment((prev)=> [...prev, {displayName: user.displayName, userComment}])
        console.log(comment)
        // update comments
        const updateProfile = doc(db, "comments", contentName);
        await updateDoc(updateProfile, {
            comments: comment
        })
        .then(() => setUserComment(''))
        .catch(e => console.log("update", e))
    }

    // console.log(comment)

    const handleCommentChange = e => {
        setUserComment(e.target.value)
    }

    return(
        <div className="Comment">
                <i className='fa-solid fa-comment' onClick={() => setActive(!active)}></i>
                {
                    active &&

                    <form className="comment-session" onSubmit={addComment}>
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
                    <div className="text-area">
                        <input type="text" required placeholder='Enter comment' value={userComment} onChange={handleCommentChange}/>
                        <button><i className='fa-solid fa-paper-plane'></i></button>
                    </div>
                </form>
                }
            </div>
    )
}

export default Comment