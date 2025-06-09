import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import routes from './routes.ts'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import ProtectedRoutes from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routes.map(({path, component : Component, isProtected}) => <Route path={path} element={ isProtected ? <ProtectedRoutes><Component /></ProtectedRoutes>  : <Component />}/>)}
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
