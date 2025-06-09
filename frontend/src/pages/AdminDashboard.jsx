
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'


const AdminDashboard = () => {
  const {user , loading} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return <div>Loading.....</div>
  }

  if(!user) {
    navigate('/login')
  }
  
  return (
    <div>{user && user.name}</div>
  )
}

export default AdminDashboard