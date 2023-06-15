import { useContext } from 'react'
import './courses.scss'
import { Context } from '../context provider/context-provider'
const Courses = () => {
    const {courses} = useContext(Context)
    return(
        <div className="courses">
            <div className="items">
                <h3>College of Science</h3>
                <ul>
                    <li>computer science</li>
                    <li>biological science</li>
                    <li>social science</li>
                    <li>electrical engineering</li>
                </ul>
            </div>
            
            <div className='items'>
                <h3>title</h3>
                <ul>
                {
                    courses.map(({title})=> {
                        return(
                                <li>{title}</li>
                            )
                        })
                }
                </ul>
            </div>
        </div>
    )
}

export default Courses