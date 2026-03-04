import {Route, Routes} from "react-router-dom"
import type {RouteSwitchProps} from './types/routeTypes'

const RouteSwitch: React.FC<RouteSwitchProps> = ({Header, pages, Footer}) => {
    return (
        <>
            {Header}
            <Routes>
                {pages.map((page, index) => {
                    const paths = Array.isArray(page.path) ? page.path : [page.path];
                    return paths.map((path) => (
                        <Route key={`${path}-${index}`} path={path} element={page.element} />
                    ));
                })}
            </Routes>
            {Footer}
        </>
    )
}

export default RouteSwitch;
