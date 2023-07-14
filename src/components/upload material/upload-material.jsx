import { storage } from "../../firebase"
import { useState } from "react"
import { ref, uploadBytesResumable } from "firebase/storage"
import './upload-material.scss'
import { useContext } from "react"
import { Context } from "../context-provider"
import upload from '../../images/upload1.svg'

var fileName = ''
const UploadMaterial = () => {
    //useContext
    const {courseList} = useContext(Context)
    //useState
    const [file, setFile] = useState('')
    const [course, setCourse] = useState('select course')
    const [college, setCollege] = useState('')
    const [success, setSuccess] = useState(false)
    const [uploading, setUploading] = useState(false)

    // handleChange
    const handleChange = e => {
        setSuccess(false)
        try{
            if(e.target.files){
                fileName = e.target.files[0].name
                setFile(e.target.files[0])

            }
        }
        catch(err){
            console.log(err)
        }
    }

    //handleUpload
    const handleUpload = async folder => {
        const storageRef = ref(storage, `courses/${course}/${folder}`)
        const fileRef = ref(storageRef, file.name)
        const overviewRef = ref(storage, `overview/${folder}`)
        const overviewFileRef = ref(overviewRef, file.name)
        await uploadBytesResumable(fileRef, file)
        await uploadBytesResumable(overviewFileRef, file)
        .then(() => {
            fileName = ''
            setUploading(false)
            setSuccess(true)
            setFile('')
        })
        .catch(err => console.log('upload', err))
    }

    //handleSubmit
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            if(course !== 'select course' && file){
                setUploading(true)
                if(fileName.includes('.doc') || fileName.includes('.ppt') || fileName.includes('.pdf')){
                    return handleUpload('files')
                }
                
                return handleUpload('videos')
            }
        }catch(err){
            console.log('upload',err)
        }
    }
    //handleCourseSelect
    const handleSelect = e => {
        setCourse(e.target.value)
    }
    //handleCollegeSelect
    const handleCollegeSelect = e => {
        setCollege(e.target.value)
    }

    return(
        <div className="upload-file">
            <div className="upload">
                <img src={upload} 
                    alt="" 
                    width="100%"
                />
            </div>

            <div className="form">
                <h3>Upload Material</h3>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="file">{fileName}</label>
                        <input type="file" onChange={handleChange} id="file" required/>
                    </div>

                    <div className="course">
                        <select name="" id="" onChange={handleCollegeSelect}>
                            <option value="">Select college</option>
                            <option value='0'>College of Science</option>
                            <option value="1">College of Engineering</option>
                            <option value="2">College of Humanity and Social Science</option>
                            <option value="3">College of Art and Built Environment</option>
                            <option value="4">College of Health Science</option>
                            <option value="5">College of Agriculture and Natural Resources</option>
                        </select>

                        {
                            college === '' ?

                            <p className="requirement">**select college to see courses**</p>

                            :
                            
                            <select name="" id="" required onChange={handleSelect}>
                                <option value="">select courses</option>
                                {
                                    courseList[college].map(({id, course}) => {
                                        return(
                                            <option key={course}>{course}</option>
                                            )
                                        })
                                    }
                            </select>
                        }
                    </div>

                    <button><i className='fa-solid fa-upload'></i> upload</button>
                    {uploading && <p>uploading...</p>}
                    {success && <p>upload successful</p>}
                </form>
            </div>
        </div>
    )
}

export default UploadMaterial