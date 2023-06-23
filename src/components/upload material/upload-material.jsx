import { storage } from "../../firebase"
import { useState } from "react"
import { ref, uploadBytesResumable } from "firebase/storage"
import './upload-material.scss'
const selectOptions = [
    {
        id: 1,
        option: 'select course'
    },
    {
        id: 2,
        option: 'computer science'
    },
    {
        id: 3,
        option: 'business'
    },
    {
        id: 4,
        option: 'electrical engineering'
    },
    {
        id: 5,
        option: 'social science'
    },
    {
        id: 6,
        option: 'chemistry'
    },
    {
        id: 7,
        option: 'law'
    },
    {
        id: 8,
        option: 'acturial science'
    },
    {
        id: 9,
        option: 'biology'
    },
    {
        id: 10,
        option: 'computer engineering'
    },
]

const UploadMaterial = () => {
    //useState
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState(file)
    const [course, setCourse] = useState('select course')
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
            console.log(err)
        }
    }
    //handleSelect
    const handleSelect = e => {
        setCourse(e.target.value)
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
                    <select name="" id="" required onChange={handleSelect}>
                        {
                            selectOptions.map(({id, option}) => {
                                return(
                                    <option key={id}>{option}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button><i className='fa-solid fa-upload'></i> upload</button>
                {uploading && <p>uploading...</p>}
                {success && <p>upload successful</p>}
            </form>
        </div>
    )
}

export default UploadMaterial