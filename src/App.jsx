import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './apprite/auth';
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.authStatus()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setloading(false);
      })
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-violet-500/20 dark:border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
          <div className="absolute w-12 h-12 border-4 border-indigo-500/10 dark:border-indigo-500/20 border-b-indigo-400 dark:border-b-indigo-400 rounded-full animate-spin animate-duration-1000"></div>
        </div>
        <p className="mt-6 text-sm font-medium tracking-widest text-slate-500 dark:text-slate-400 uppercase animate-pulse">
          Loading Application...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative overflow-hidden selection:bg-violet-500 selection:text-white transition-colors duration-200">
      {/* Decorative Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/[0.03] dark:bg-violet-600/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/[0.03] dark:bg-indigo-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <Header />
      <main style={{marginTop:"1.5rem"}} className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
