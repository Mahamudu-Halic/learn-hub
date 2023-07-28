import { useContext } from 'react'
import { Context } from './context-provider'
import { storage } from '../firebase'
import {ref, listAll} from 'firebase/storage'
import {useEffect, useState } from 'react'
import GenerateFiles from './generateFiles'
import GenerateVideos from './generateVideos'
import '../styles/courses.scss'

const Courses = () => {
    //usecontext
    const {courseList} = useContext(Context)
    //useState
    const [getFiles, setGetFiles] = useState([])
    const [getVideos, setGetVideos] = useState([])
    const [getCourses, setGetCourses] = useState([])
    const [course, setCourse] = useState('')
    //useEffect
    useEffect(() => {
        try {
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
        } catch (error) {
            console.log('courses', error)
        }
    }, [course])
    //goBack
    const goBack = () => {
        setCourse('')
    }

    //handleClick
    const handleClick = value => {
        setCourse(value)
    }

   
    return(
        <div className="courses">
            {
                course === '' ? 
                <>
                <h3>Courses</h3>
            <h4>College of Science</h4>
            <div className="btn">
                {
                    courseList[0].map(list => {
                        return(
                            <button key={list.course} onClick={()=>handleClick(list.course)}>{list.course}</button>
                        )
                    })
                }
            </div>

            <h4>College of Engineering</h4>
            <div className="btn">
                {
                    courseList[1].map(list => {
                        return(
                            <button key={list.course} onClick={()=>handleClick(list.course)}>{list.course}</button>
                        )
                    })
                }
            </div>

            <h4>collage of humanity and social sciences</h4>
            <div className="btn">
                {
                    courseList[2].map(list => {
                        return(
                            <button key={list.course} onClick={()=>handleClick(list.course)}>{list.course}</button>
                        )
                    })
                }
            </div>

            <h4>collage of art and built env</h4>
            <div className="btn">
                {
                    courseList[3].map(list => {
                        return(
                            <button key={list.course} onClick={()=>handleClick(list.course)}>{list.course}</button>
                        )
                    })
                }
            </div>
            <h4>collage of health science</h4>
            <div className="btn">
                {
                    courseList[4].map(list => {
                        return(
                            <button key={list.course} onClick={()=>handleClick(list.course)}>{list.course}</button>
                        )
                    })
                }
            </div>
            <h4>collage of agriculture and natural resources</h4>
            <div className="btn">
                {
                    courseList[5].map(list => {
                        return(
                            <button onClick={()=>handleClick(list.course)}>{list.course}</button>
                        )
                    })
                }
            </div>
                </>
                :
                <h3>{course}</h3>
            }

            {/* files and video load */}
            <>
            {
                //no files or videos
                !getFiles.length && 
                !getVideos.length &&
                course !== '' && 
                <p>no file or videos uploaded</p>
            }
            <div className="files">
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
                <button onClick={goBack}><i className="fa-solid fa-arrow-left"></i> back</button>
            }
            </>
        </div>
    )
}

export default Courses