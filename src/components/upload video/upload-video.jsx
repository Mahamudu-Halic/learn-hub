import { storage } from "../../firebase"
import { useContext, useState } from "react"
import { Context } from "../context provider/context-provider"
import { ref, uploadBytesResumable } from "firebase/storage"
// import './upload-file.scss'
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
        option: 'engineering'
    },
]

const UploadVideo = () => {
    //useState
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState(file)
    const [course, setCourse] = useState('select course')
    const [success, setSuccess] = useState(false)
    //useContext
    const {user} = useContext(Context)

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

    //handleSubmit
    const handleSubmit = e => {
        e.preventDefault()
        console.log(e.target[0].files)
        try{
                if(course != 'select course' && file){
                const storageRef = ref(storage, `${course}/videos`)
                const fileRef = ref(storageRef, file.name)
                uploadBytesResumable(fileRef, file)
                const overviewRef = ref(storage, 'overview/videos')
                const overviewFileRef = ref(overviewRef, file.name)
                uploadBytesResumable(overviewFileRef, file)
    
                setSuccess(true)
                setInterval(() => {
                    setSuccess(false)
                    setFileName('')
                    setFile('')
                    e.target.value = []
                    console.log('errrrr')
                }, 3000);
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleSelect = e => {
        setCourse(e.target.value)
    }

    return(
        <div className="upload-file">
            <h3>Upload Video</h3>
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

                <button>upload</button>
                {success && <p>upload successful</p>}
            </form>
        </div>
    )
}

export default UploadVideo