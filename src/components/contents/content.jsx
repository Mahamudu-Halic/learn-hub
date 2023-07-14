import { Routes, Route } from "react-router-dom"
import Overview from "../overview/overview"
import Courses from "../courses/courses"
import Favorite from "../favorite/favorite"
import UploadMaterial from "../upload material/upload-material"
import Settings from "../settings/settings"
import AddNewCourse from "../add new course/add-new-course"
import background from '../../images/one.jpg'
const Content = () => {
    return(
        <div className="content">
            {/* <div className="overlay">
                <img src={background} alt="image" />
            </div> */}
            <Routes>
                <Route exact path='/' element={<Overview />} />
                <Route path='courses' element={<Courses />} />
                <Route path='favorite' element={<Favorite />} />
                <Route path='add-new-course' element={<AddNewCourse />} />
                <Route path='upload-material' element={<UploadMaterial />} />
                <Route path='settings' element={<Settings />} />
            </Routes>
        </div>
    )
}

export default Content