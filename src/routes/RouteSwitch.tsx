import {Route, Routes} from "react-router-dom"
import type {RouteSwitchProps} from './types/routeTypes'

const RouteSwitch: React.FC<RouteSwitchProps> = ({Header, pages}) => {
    return (
        <>
            {Header}
            <Routes>
                {pages.map((page) => (
                    <Route path={page.path} element={page.element} />
                ))}
            </Routes>
        </>
    )
}

export default RouteSwitch;
