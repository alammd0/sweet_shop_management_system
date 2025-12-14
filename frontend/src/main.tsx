import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "@radix-ui/themes/styles.css";
import { Provider } from 'react-redux'
import { store } from './app/store.ts'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
        <App />
        <ToastContainer />
    </Provider>
  </BrowserRouter>
)
