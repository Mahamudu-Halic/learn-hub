import { Routes, Route } from "react-router-dom"
import Overview from "./overview/overview"
import Courses from "./courses/courses"
import UploadMaterial from "./upload material/upload-material"
import Settings from "./settings/settings"
import Footer from "./footer"
const Content = () => {
    return(
        <div className="content">
            {/* <div className="overlay">
                <img src={background} alt="image" />
            </div> */}
            <Routes>
                <Route exact path='' element={<Overview />} />
                <Route path='courses' element={<Courses />} />
                <Route path='upload-material' element={<UploadMaterial />} />
                <Route path='settings' element={<Settings />} />
            </Routes>

            <Footer />
        </div>
    )
}

export default Content