import {useEffect} from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Posts from './components/posts/Posts'
import PostForm from './components/posts/components/PostForm'
import DashBoard from './components/dashboard/DashBoard'
import PostDetail from './components/posts/components/PostDetail'
import PostAction from './components/dashboard/components/PostAction'
import RouteSwitch from './routes/RouteSwitch'
import {addToast} from '@heroui/react'

const App = () => {
    useEffect(() => {
        addToast({ 
            title: "Welcome!", 
            description: "This Application is Under Development.",
            color: "primary"
        })
    }, [])

    return (
        <div className='min-h-screen flex flex-col'>
            <RouteSwitch 
                Header={<Header />}
                pages={[
                    {
                        element: (
                            <Login />
                        ),
                        path: "/login"
                    },
                    {
                        element: (
                            <Signup />
                        ),
                        path: "/signup"
                    },
                    {
                        element: (
                            <Posts />
                        ),
                        path: "/"
                    },
                    {
                        element: (
                            <PostForm />
                        ),
                        path: "/write"
                    },
                    {
                        element: (
                            <PostDetail />
                        ), 
                        path: "/:username/:postId"
                    },
                    {
                        element: (
                            <PostAction /> 
                        ), 
                        path: "/posts/:postId"
                    },
                    {
                        element: (
                            <DashBoard />
                        ),
                        path: "/dashboard"
                    }
                ]}
                Footer={<Footer />}
            />
        </div>
    )
}

export default App

