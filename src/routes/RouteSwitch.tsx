import {Route, Routes} from "react-router-dom"
import type {RouteSwitchProps} from './types/routeTypes'

const RouteSwitch: React.FC<RouteSwitchProps> = ({Header, pages, Footer}) => {
    return (
        <>
            {Header}
            <Routes>
                {pages.map((page) => (
                    <Route path={page.path} element={page.element} />
                ))}
            </Routes>
            {Footer}
        </>
    )
}

export default RouteSwitch;
