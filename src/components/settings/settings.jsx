import { useContext } from "react"
import { Context } from "../context provider/context-provider"
import './settings.scss'
const Settings = () => {
    const { user } = useContext(Context)

    //handle submit
    const handleSubmit = e => {
        e.preventDefault()
    }
    return(
        <div className="settings">
            <h1><i className="fa-solid fa-user"></i> {user.displayName}</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="displayName">Display Name:</label>
                    <input type="text" value={user.displayName} id="displayName"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea name="" id="description" cols="30" rows="5"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="program">Program of Study:</label>
                    <input type="text" id="program" placeholder="eg: Computer Science"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">School Email:</label>
                    <input type="email" id="email" placeholder="example@knust.edu.gh"/>
                </div>
                <div className="form-group">
                    <label htmlFor="tel">Phone Number:</label>
                    <input type="tel" id="tel"/>
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year of Study:</label>
                    <select name="" id="year">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Settings