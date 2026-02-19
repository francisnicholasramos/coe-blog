import Posts from './components/posts/Posts'
import PostDetail from './components/posts/components/PostDetail'
import RouteSwitch from './routes/RouteSwitch'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

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
                        path: "/"
                    },
                    {
                        element: (
                            <PostDetail />
                        ), 
                        path: "/:username/:postId"
                    }
                ]}
            />
            <Footer />
        </div>
    )
}

export default App

