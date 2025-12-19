import { Route , Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'


//backend url
export const serverUrl = 'http://localhost:8000'

function App() {
  return (
    <Routes>

        {/* home route */}
        <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />

        {/* signup route */}
       <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />

      {/* signin route */}
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />

      {/* forgot password route */}
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
    </Routes>
  )
}

export default App