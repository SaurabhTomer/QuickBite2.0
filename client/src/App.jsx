import { Route , Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import useGetCity from './hooks/useGetCity'
import useGetMyshop from './hooks/useGetMyShop'
import useGetShopByCity from './hooks/useGetShopByCity'
import { useEffect } from 'react'
import { setSocket } from './redux/userSlice'


//backend url
export const serverUrl = 'http://localhost:8000'

function App() {

  // all hooks
  useGetCurrentUser();
  useGetCity();
  useGetMyshop();
  useGetShopByCity();

  useEffect(() => {
    const socketInstance = io(serverUrl , {withCredentials:true})
    dispatchEvent(setSocket(socketInstance))
    socketInstance.on('connect' , (socket) => {
      
    })
  } , [])
  const {userData} = useSelector(state => state.user)

  
  return (
    <Routes>

        {/* home route */}
        <Route
        path="/"
        element={ <Home />}
      />

        {/* signup route */}
       <Route
        path="/signup"
        element={ <SignUp  />}
      />

      {/* signin route */}
      <Route
        path="/signin"
        element={ <SignIn />}
      />

      {/* forgot password route */}
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
    </Routes>
  )
}

export default App