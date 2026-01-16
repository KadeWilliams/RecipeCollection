import { useState, useEffect } from "react";
const RecipePage = () => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const apiUrl = '';
    };

    fetchJob();
  }, []);

  return (
    <div>RecipePage</div>
  )
}

const recipeLoader = async ({params}) => {
  // const res = await fetch(`/api/recipe/${params.id}`);
  // const data = await res.json();
  // return data;
};

// eslint-disable-next-line react-refresh/only-export-components
export {RecipePage as default, recipeLoader};