import Posts from './components/posts/Posts'
import RouteSwitch from './routes/RouteSwitch'
import { Header } from './components/Header'

const App = () => {
    return (
        <div>
            <RouteSwitch 
                Header={<Header />}
                pages={[
                    {
                        element: (
                            <Posts />
                        ),
                        path: "/"
                    }
                ]}
            />
        </div>
    )
}

export default App

