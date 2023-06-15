import './App.scss'
import Content from './components/contents/content'
import Dashboard from './components/dashboard/dashboard'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './user authentication/login'
import Register from './user authentication/register'
import { useContext } from 'react'
import { Context } from './components/context provider/context-provider'
const App = ()=> {
  const {currentUser} = useContext(Context)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to='/login' />
    }

    return children
  }
  return(
    <div>
      {
        currentUser ? <div className='App'>
          <Dashboard />
          <Content />
        </div>
        :
      <Routes>
        <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
      </Routes>
      }
    </div>
  )
}

export default App