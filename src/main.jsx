import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import { AuthLayout } from './components/index.js'


const router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[{
      path:"/",
      element:<Home />
    },{
      path:"/login",
      element:(
        <AuthLayout authenticated={false}>
          <Login />
        </AuthLayout>
      )
    },{
      path:"/signup",
      element:(
        <AuthLayout authenticated={false}>
          <Signup />
        </AuthLayout>
      )
    },
    {
      path:"/add-post",
      element:(
        <AuthLayout authenticated>
          <AddPost />
        </AuthLayout>
      )
    },
    {
      path: "/edit-post/:slug",
      element: (
          <AuthLayout authentication>
              {" "}
              <EditPost />
          </AuthLayout>
      ),
  },
  {
    path: "/post/:slug",
    element: <Post />,
},
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
