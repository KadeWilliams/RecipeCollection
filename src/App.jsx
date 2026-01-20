import HomePage from "./pages/HomePage"
import MainLayout from "./layouts/MainLayout"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import RecipePage, {recipeLoader} from './pages/RecipePage';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage/>} />
        <Route path="/recipes/:id" loader={recipeLoader} element={<RecipePage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App