import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Protected} from './components/index.js'
import AddBlog from './pages/AddBlog.jsx'
import AllBlog from './pages/AllBlogs.jsx'
import EditBlog from './pages/EditBlog.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:'/login',
        element:(<Protected authentication={false} >
          <Login/>
        </Protected>
        )
      },
      {
        path:'/signup',
        element:(<Protected authentication={false} >
          <Signup/>
        </Protected>
        )
      },
      {
        path:"/logout",
        element:<Home/>
      },
      {
        path:"/add-blog",
        element:(<Protected authentication={true} >
          <AddBlog/>
        </Protected>
        )
      },
      {
        path:"/all-blog",
        element:(
        <Protected authentication={true} >
          <AllBlog/>
        </Protected>
        )
      },
      {
        path:"/blog/:slug",
        element:(
          <Protected authentication={true} >
            <Blog/>
          </Protected>
        )
      },
      {
        path:"/edit-blog/:slug",
        element:(<Protected authentication={true} >
          <EditBlog/>
        </Protected>
        )
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
