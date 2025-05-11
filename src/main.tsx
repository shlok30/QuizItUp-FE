import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import routes from './routes.ts'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routes.map(({path, component : Component,}) => <Route path={path} element={<Component />}/>)}
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
