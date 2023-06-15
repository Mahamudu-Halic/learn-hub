import './overview.scss'
import { storage } from '../../firebase'
import {ref, listAll, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../context provider/context-provider'

const Overview = () => {
    const [getFiles, setGetFiles] = useState([])
    const [getVideos, setGetVideos] = useState([])

    useEffect(() => {
        const files = ref(storage, 'overview/files')
        listAll(files)
        .then(res => {
            setGetFiles(res.items)
        })
        
        const videos = ref(storage, 'overview/videos')
        listAll(videos)
        .then(res => {
            setGetVideos(res.items)
        })


    }, [])

    return(
        <div className="overview">
            <div className="title">
                <h2>Explore Courses</h2>
            </div>

            <h2>Books</h2>
            
            <div className="overview-content">      
                {
                    getFiles.map((content, i) =>{
                        return(
                            <a href={`https://firebasestorage.googleapis.com/v0/b/learnhub-a3bd7.appspot.com/o/overview%2Ffiles%2F${content.name}?alt=media&token=85e91ed4-0860-49c1-9242-982c8d6fe6e7`}>
                            <div>
                                <h3>{content.name}</h3>
                                </div>
                            </a>
                        )
                    })
                }
            </div>

            <h2>Videos</h2>
            
            <div className="overview-content">      
                {
                    getVideos.map((content, i) =>{
                        return(
                            <div className='video'>
                                <video controls muted src={`https://firebasestorage.googleapis.com/v0/b/learnhub-a3bd7.appspot.com/o/overview%2Fvideos%2F${content.name}?alt=media&token=85e91ed4-0860-49c1-9242-982c8d6fe6e7`} />
                                <h3>{content.name}</h3>
                                <div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Overview