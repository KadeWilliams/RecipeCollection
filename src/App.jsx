import { createBrowserRouter, BrowserRouter, Routes, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import ErrorPage from './pages/ErrorPage.jsx';
import MainLayout from './Layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import RecipePage, {recipeLoader} from './pages/RecipePage.jsx';

function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route 
        path="/recipe/:id" 
        element={<RecipePage />}
        // loader={recipeLoader}
      />
      <Route path="*" element={<ErrorPage />}/>
    </Route>
  )
);
  return <RouterProvider router={router} />
}

export default App
