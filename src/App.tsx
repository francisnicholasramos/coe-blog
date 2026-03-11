import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ChangePassword from './components/auth/ChangePassword'
import Posts from './components/posts/Posts'
import PostForm from './components/posts/components/PostForm'
import DashBoard from './components/dashboard/DashBoard'
import PostDetail from './components/posts/components/PostDetail'
import Profile from './components/dashboard/components/Profile'
import PostAction from './components/dashboard/components/PostAction'
import ProtectedRoute from './components/ProtectedRoute'
import RouteSwitch from './routes/RouteSwitch'

const App = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <RouteSwitch 
                Header={<Header />}
                pages={[
                    {
                        element: (
                            <Posts />
                        ),
                        path: ["/", "/search"]
                    },
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
                            <ProtectedRoute>
                                <ChangePassword />
                            </ProtectedRoute>
                        ), 
                        path: "/change-password"
                    },
                    {
                        element: (
                            <ProtectedRoute>
                                <PostForm />
                            </ProtectedRoute>
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
                        path: ["/dashboard", "/dashboard/search"]
                    },
                    {
                        element: (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        ),
                        path: "/profile"
                    },
                ]}
                Footer={<Footer />}
            />
        </div>
    )
}

export default App

