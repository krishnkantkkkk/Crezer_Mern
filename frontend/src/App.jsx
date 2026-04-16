import {Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import AxiosContext from './contexts/AxiosContext'
import UserInfo from './contexts/UserInfo'
import AuthProtectedWrapper from './protectWrapper/AuthProtectedWrapper'
import BypassProtectWrapper from './protectWrapper/BypassProtectWrapper'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import Splits from './pages/Splits'
import { Group } from './pages/Group'

function App() {
  return (
    <AxiosContext>
      <UserInfo>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<AuthProtectedWrapper><Register/></AuthProtectedWrapper>}/>
            <Route path='/login' element={<AuthProtectedWrapper><Login/></AuthProtectedWrapper>}/>
            <Route path ='/dashboard' element={<BypassProtectWrapper><Dashboard/></BypassProtectWrapper>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/splits' element={<Splits/>}/>
            <Route path='/splits/:groupId' element={<Group/>}/>
          </Routes>
      </UserInfo>
    </AxiosContext>
  )
}

export default App
