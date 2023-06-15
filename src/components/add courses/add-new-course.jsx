import { useContext } from "react"
import { Context } from "../context provider/context-provider"


const NewCourse = () => {
    const {setNewCourses, newCourse, setCourses, courses} = useContext(Context)

    const handleClick = () => {
        setCourses(
            courses.push({
                title: newCourse
            }))
        setNewCourses('')
    }

    const handleChange = e => {
        setNewCourses(e.target.value)
    }
    console.log(newCourse)
    console.log(courses)
    return(
        <div className="new-course">
            <input type="text" onChange={handleChange}/>
            <button onClick={handleClick}>add course</button>
        </div>
    )
}

export default NewCourse