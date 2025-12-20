import { Route , Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import useGetCity from './hooks/useGetCity'
import useGetMyshop from './hooks/useGetMyShop'


//backend url
export const serverUrl = 'http://localhost:8000'

function App() {

  // all hooks
  useGetCurrentUser();
  useGetCity();
  useGetMyshop();
  
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