import { Routes, Route } from "react-router-dom"
import Courses from "./courses"
import UploadMaterial from "./upload-material"
import Settings from "./settings"
import Footer from "./footer"
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import Overview from "./overview"
import '../styles/content.scss'

Kommunicate.init("377d67da69798082ec9fd93c99ae7e478", {
    automaticChatOpenOnNavigation: true,
    popupWidget: true
});

const Content = () => {
    return(
        <div className="content">
            <Routes>
                <Route exact path='/' element={<Overview />} />
                <Route path='courses' element={<Courses />} />
                <Route path='upload-material' element={<UploadMaterial />} />
                <Route path='settings' element={<Settings />} />
            </Routes>

            <Footer />
        </div>
    )
}

export default Content