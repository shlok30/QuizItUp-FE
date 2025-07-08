import { Route, Routes } from 'react-router'
import ProtectedRoutes from "./components/ProtectedRoute";
import routes from "./routes";


function App(){

    return(
        <>
            <Routes>
                {routes.map(({path, component : Component, isProtected}) => <Route path={path} element={ isProtected ? <ProtectedRoutes><Component /></ProtectedRoutes>  : <Component />}/>)}
            </Routes>
        </>
    )
}

export default App;