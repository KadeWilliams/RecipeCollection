import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, BrowserRouter, Routes, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import MainLayout from './Layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="*" element={<ErrorPage />}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
