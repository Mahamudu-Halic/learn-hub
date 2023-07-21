import './overview.scss'
import { storage } from '../../firebase'
import {ref, listAll} from 'firebase/storage'
import {useEffect, useState } from 'react'
import learnhub from '../../images/learnhub.png'
import GenerateFiles from '../generateFiles'
import GenerateVideos from '../generateVideos'
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
            <div className="homepage">
                <div>
                    <img src={learnhub} 
                        alt="" 
                        width='100%'
                    />
                </div>

                <div className="title">
                    <h1>Welcome to Learn<span>Hub</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, veritatis? Perspiciatis numquam iure voluptates illum odit, voluptate iste nobis fugit adipisci! Fuga illo fugit odio dolorem id velit, eligendi at soluta? Laborum laboriosam consectetur at! Asperiores, non! Quos molestiae provident ut voluptates distinctio sed quas unde possimus non, consequuntur commodi.</p>
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