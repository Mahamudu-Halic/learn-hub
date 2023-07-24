import './App.scss'
import Content from './components/content'
import Dashboard from './components/dashboard'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './user authentication/login'
import Register from './user authentication/register'
import { useContext } from 'react'
import { Context } from './components/context-provider'
const App = ()=> {
  const {currentUser} = useContext(Context)
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