import HomePage from "./pages/HomePage"
import MainLayout from "./layouts/MainLayout"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import RecipePage, {recipeLoader} from './pages/RecipePage';
import EditRecipePage from "./pages/EditRecipePage";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/recipes" element={<HomePage/>} />
        <Route path="/recipes/:id" loader={recipeLoader} element={<RecipePage />} />
        <Route path="/recipes/edit/:id" loader={recipeLoader} element={<EditRecipePage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App