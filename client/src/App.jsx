
import { Route , Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Routes>
        <Route path='/signup' element={SignUp} />
        <Route path='/signin' element={SignIn} />
    </Routes>
  )
}

export default App