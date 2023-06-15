import { Routes, Route } from "react-router-dom"
import Overview from "../overview/overview"
import Courses from "../courses/courses"
import NewCourse from "../add courses/add-new-course"
import UploadFile from "../upload file/upload-file"
import UploadVideo from "../upload video/upload-video"
import Settings from "../settings/settings"

const Content = () => {
    return(
        <div className="content">
            <Routes>
                <Route path='/' element={<Overview />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/add-course' element={<NewCourse />} />
                <Route path='/upload-file' element={<UploadFile />} />
                <Route path='/upload-video' element={<UploadVideo />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </div>
    )
}

export default Content