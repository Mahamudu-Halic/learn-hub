import './overview.scss'
import { storage } from '../../firebase'
import {ref, listAll} from 'firebase/storage'
import {useEffect, useState } from 'react'

const Overview = () => {
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

    return(
        <div className="overview">
            {/* title */}
            <div className="title">
                <h2>Explore Courses</h2>
            </div>
            {/* books */}
            <h2>Books <i className='fa-solid fa-book'></i></h2>
            <div className="overview-content">      
                {
                    getFiles.map((content, i) =>{
                        return(
                            <a key={i} href={`https://firebasestorage.googleapis.com/v0/b/learnhub-a3bd7.appspot.com/o/overview%2Ffiles%2F${content.name}?alt=media&token=85e91ed4-0860-49c1-9242-982c8d6fe6e7`}>
                                <div>
                                    <h3>
                                        <i className='fa-solid fa-book'></i> {content.name}
                                    </h3>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
            {/* videos */}
            <h2>Videos <i className='fa-solid fa-video'></i></h2>
            <div className="overview-content">      
                {
                    getVideos.map((content, i) =>{
                        return(
                            <div key={i} className='video'>
                                <video controls muted src={`https://firebasestorage.googleapis.com/v0/b/learnhub-a3bd7.appspot.com/o/overview%2Fvideos%2F${content.name}?alt=media&token=85e91ed4-0860-49c1-9242-982c8d6fe6e7`} />
                                <h3>{content.name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Overview