import { storage } from "../../firebase"
import { useState } from "react"
import { ref, uploadBytesResumable } from "firebase/storage"
import './upload-material.scss'
import { useContext } from "react"
import { Context } from "../context provider/context-provider"

const UploadMaterial = () => {
    //useContext
    const {courseList} = useContext(Context)
    //useState
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState(file)
    const [course, setCourse] = useState('select course')
    const [college, setCollege] = useState('')
    const [success, setSuccess] = useState(false)
    const [uploading, setUploading] = useState(false)

    // handleChange
    const handleChange = e => {
        setSuccess(false)
        try{
            if(e.target.files){
                setFile(e.target.files[0])
                setFileName(e.target.files[0].name)
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
            setUploading(false)
            setSuccess(true)
            setFileName('')
            setFile('')
        })
        .catch(err => console.log('upload', err))
    }

    //handleSubmit
    const handleSubmit = async e => {
        // e.preventDefault()
        // try{
        //     if(course !== 'select course' && file){
        //         setUploading(true)
        //         if(fileName.includes('.doc') || fileName.includes('.ppt') || fileName.includes('.pdf')){
        //             return handleUpload('files')
        //         }
                
        //         return handleUpload('videos')
        //     }
        // }catch(err){
        //     console.log('upload',err)
        // }
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
            <h3>Upload Material</h3>
            <form action="#" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="file">{fileName}</label>
                    <input type="file" onChange={handleChange} id="file"/>
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
    )
}

export default UploadMaterial