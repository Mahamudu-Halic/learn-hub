import { Routes, Route } from "react-router-dom"
import Overview from "./overview/overview"
import Courses from "./courses/courses"
import UploadMaterial from "./upload material/upload-material"
import Settings from "./settings/settings"
import Footer from "./footer"
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import { useContext, useEffect } from "react"
import { Context } from "./context-provider"

Kommunicate.init("377d67da69798082ec9fd93c99ae7e478", {
    automaticChatOpenOnNavigation: true,
    popupWidget: true
});

const Content = () => {
    const {currentUser} = useContext(Context)

    // useEffect(()=>{
    //     const addChatbot = () => {
    //         try{
    //             Kommunicate.init("377d67da69798082ec9fd93c99ae7e478", {
    //                 automaticChatOpenOnNavigation: true,
    //                 popupWidget: true
    //             });
    //         }catch{
    //             console.log("error")
    //         }
    //     }

    //     return (() => addChatbot())
    // }, [])
    return(
        <div className="content">
            {/* <div className="overlay">
                <img src={background} alt="image" />
            </div> */}
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