import { ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase'
import './add-new-course.scss'
import { useState } from 'react'


const AddNewCourse = () => {
    
    return(
        <div className="add-new-course">
            <h3>add new course</h3>

            <div className="course-form">
                <div className="form-group">
                    <label htmlFor="course-name">Course Name:</label>
                    <input type="text" />
                </div>

                <div className="btns">
                    <button className='save-btn'><i className="fa-solid fa-save"></i> save</button>
                    <button><i className="fa-solid fa-close"></i> clear</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewCourse