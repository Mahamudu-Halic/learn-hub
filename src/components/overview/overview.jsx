import './overview.scss'
import { db, storage } from '../../firebase'
import {ref, listAll} from 'firebase/storage'
import {useContext, useEffect, useState } from 'react'
import learnhub from '../../images/learnhub.png'
import GenerateFiles from '../generateFiles'
import GenerateVideos from '../generateVideos'
import { doc, getDoc } from 'firebase/firestore'
import { Context } from '../context-provider'
const Overview = () => {
    //useContext
    const {setUser, currentUser} = useContext(Context)
    //useState
    const [getFiles, setGetFiles] = useState([])
    const [getVideos, setGetVideos] = useState([])
    //useEffect
    useEffect(() => {
        try {
            //fetch files from firebase
            const files = ref(storage, 'overview/files')
            listAll(files)
            .then(res => {
                setGetFiles(res.items)
            })
            
            //fetch videos from firebase
            const videos = ref(storage, 'overview/videos')
            listAll(videos)
            .then(res => {
                setGetVideos(res.items)
            })
            
        } catch (error) {
            console.log('overview', error)
        }
    }, [])

    useEffect(() => {
        const getUser = async () => {
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUser(docSnap.data())
                } else {
                console.log("No such document!");
                }
            } catch (error) {
                console.log('dashboard getuser', error)
            }
        }

        return (() => {getUser()})
    }, [currentUser])

    return(
        <div className="overview">
            <div className="homepage">
            <div className="overlap"></div>
                <div>
                    <img src={learnhub} 
                        alt="" 
                        width='100%'
                    />
                </div>

                <div className="title">
                    <h1>Welcome to Learn<span>Hub</span></h1>
                    <p>LearnHub is an online learning platform for undergraduate students, providing personalized educational materials and fostering a collaborative community. With a user-centric design, it offers a seamless and enriched learning experience.</p>
                </div>
            </div>
            {/* title */}
            <div className="title">
                <h2>Explore Courses</h2>
            </div>
            {/* books */}
            <h2>Books <i className='fa-solid fa-book'></i></h2>
            <div className="overview-content">
                {
                //getFiles
                getFiles.map((content, i) =>{
                    return(
                        <GenerateFiles 
                        key={i}
                        content={content}
                        />
                    )
                    })
                }
            </div>

            {/* videos */}
            <h2>Videos <i className='fa-solid fa-video'></i></h2>
            <div className="overview-content videos"> 
                {
                //getVideos
                    getVideos.map((content, i) =>{
                        return(
                            <GenerateVideos 
                                key={i}
                                content={content}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Overview