import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import { AuthProvide } from './context/authcontext'
function App() {
  return (
    <>
      <AuthProvide>
        <Navbar />
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 text-secondary font-primary">
          <Outlet />
        </main>
        <Footer />
      </AuthProvide>
    </>
  );
}

export default App
