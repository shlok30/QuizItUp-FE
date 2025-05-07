import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import routes from './routes.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {routes.map(({path, component : Component,}) => <Route path={path} element={<Component />}/>)}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
