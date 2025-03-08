import Authontication from './Pages/Authontication'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserSelection from './Componets/Auth/UserSelection'
import Signup from './Componets/Auth/Signup'
import Login from './Componets/Auth/Login'
import Dashbord from './Pages/Dashbord'
import Chat from './Componets/Chats/Chat'
import Profile from './Pages/Profile'
import CatogorySelect from './Pages/CatogorySelect'
import Chatpanel from './Componets/Chats/Chatpanel'
import Admindashbord from './Pages/Admindashbord'


function App() {
  

  return (
    <div className='bg-white'>
        <Routes  >
          <Route path='/' element={<Login/>}/>
          <Route path='/userSelection' element ={<UserSelection/>}/>
          <Route path='/workersignup' element={<Signup isworker={true}/>}/>
          <Route path='/usersignup' element={<Signup />}/>
          <Route path='/admindashbord' element={<Admindashbord/>}/>
          <Route path='/dashbord' element={<Dashbord/>}/>
          <Route path='/chats' element={<Chat/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/catogoryselect' element={<CatogorySelect/>}/>
          <Route path='/chatpanel' element={<Chatpanel/>}/>
        </Routes>
      
     <Authontication/>
    </div>
  )
}

export default App
