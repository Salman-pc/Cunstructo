
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserSelection from './Pages/Auth/UserSelection'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import Dashbord from './Pages/Dashbord'
import Chat from './Pages/Chats/Chat'
import Settings from './Pages/Settings'
import CatogorySelect from './Pages/CatogorySelect'
import Chatpanel from './Pages/Chats/Chatpanel'
import Admindashbord from './Pages/Admindashbord'
import Profile from './Pages/Settings/Profile'
import FeedBackuser from './Pages/Settings/FeedBackuser'
import Help from './Pages/Settings/Help'
import SecurityPrivacy from './Pages/Settings/SecurityPrivacy'
import Add_Ads from './Pages/Admin pages/Add_Ads'
import AddCategory from './Pages/Admin pages/AddCatogory'
import BlockedList from './Pages/Admin pages/BlockedList'
import UsersList from './Pages/Admin pages/UsersList'
import WorkersList from './Pages/Admin pages/WorkersList'
import FeedBacks from './Pages/Admin pages/FeedBacks'
import Pnf from './Pages/Pnf'


const ProtectedRoute = ({children})=>{
  const isloggedin = localStorage.getItem('token') !==null || true ;

  if(!isloggedin){
    return <Navigate to={'/login'}/>
  }
  else if(isloggedin && ['/userSelection','/login'].includes(window.location.pathname)){
    return <Navigate to={'/'}/>
  }

  return children
}

function App() {

  return (
    <div className='bg-white'>
      <Routes  >
        <Route path='*' element={<Pnf/>} />
        <Route path='/' element={<Dashbord />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userSelection' element={<UserSelection />} />
        <Route path='/workersignup' element={<Signup isworker={true} />} />
        <Route path='/usersignup' element={<Signup />} />
        <Route path='/admindashbord' element={<ProtectedRoute><Admindashbord /></ProtectedRoute>} >
          <Route path="addcatogory" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
          <Route path='add_adds' element={<ProtectedRoute><Add_Ads /></ProtectedRoute>} />
          <Route path='blocklist' element={<BlockedList />} />
          <Route path='feedbacklist' element={<FeedBacks />} />
          <Route path='userlist' element={<UsersList />} />
          <Route path='workerlist' element={<WorkersList />} />
        </Route>

        <Route path='/chats' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path='/settings' element={<Settings />}>
          <Route path='profile' element={<Profile />} />
          <Route path='feedbackuser' element={<FeedBackuser />} />
          <Route path='help' element={<Help />} />
          <Route path='security&password' element={<SecurityPrivacy />} />
   
        </Route>
        <Route path='/catogoryselect' element={<CatogorySelect />} />
        <Route path='/chatpanel' element={<ProtectedRoute><Chatpanel /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
