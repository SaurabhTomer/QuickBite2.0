import { Route , Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'


//backend url
export const serverUrl = 'http://localhost:8000'

function App() {
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