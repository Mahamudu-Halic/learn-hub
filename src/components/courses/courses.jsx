import { useContext } from 'react'
import './courses.scss'
import { Context } from '../context provider/context-provider'
import { storage } from '../../firebase'
import {ref, listAll} from 'firebase/storage'
import {useEffect, useState } from 'react'
import GenerateFiles from '../generateFiles'
import GenerateVideos from '../generateVideos'

const Courses = () => {
    //useState
    const [getFiles, setGetFiles] = useState([])
    const [getVideos, setGetVideos] = useState([])
    const [getCourses, setGetCourses] = useState([])
    const [course, setCourse] = useState('')
    //useEffect
    useEffect(() => {
        //fetch files from firebase
        const files = ref(storage, `courses/${course}/files`)
        listAll(files)
        .then(res => {
            setGetFiles(res.items)
        })
        
        //fetch videos from firebase
        const videos = ref(storage, `courses/${course}/videos`)
        listAll(videos)
        .then(res => {
            setGetVideos(res.items)
        })
    }, [course])
    //goBack
    const goBack = () => {
        setCourse('')
    }
   
    return(
        <div className="courses">
            <h3>Courses</h3>
            <div className="btn">
                <button onClick={e => setCourse(e.target.value)} value="computer science">computer science</button>
                <button onClick={e => setCourse(e.target.value)} value="chemistry">chemistry</button>
                <button onClick={e => setCourse(e.target.value)} value="biology">biology</button>
                <button onClick={e => setCourse(e.target.value)} value="business">business</button>
                <button onClick={e => setCourse(e.target.value)} value="electrical engineering">electrical engineering</button>
                <button onClick={e => setCourse(e.target.value)} value="social science">social science</button>
                <button onClick={e => setCourse(e.target.value)} value="law">law</button>
                <button onClick={e => setCourse(e.target.value)} value="acturial science">acturial science</button>
                <button onClick={e => setCourse(e.target.value)} value="computer engineering">computer engineering</button>
            </div>

            {course !== '' ? 
                <h3>{course}</h3>
                :
                ''
            }
            <div className="files">
            {
                //getFiles
                !getFiles.length ? 
                    course !== '' && <p>no file or videos uploaded</p>
                :
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

            <div className="videos">
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

            {
                course !== '' 
                && 
                <button onClick={goBack}>back</button>
            }
        </div>
    )
}

export default Courses