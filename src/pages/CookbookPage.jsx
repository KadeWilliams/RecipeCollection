import React from 'react'
import data from '../data/data.json';
import Recipes from '../components/Recipes';

const CookbookPage = () => {
  //TODO: get rid of this when calling this from an API later
  const cookbook = data[0].cookbooks.filter(cookbook => cookbook.id === 1)[0];
  return (
    <Recipes recipes={cookbook.recipes} title={cookbook.title}/>
  )
}

const cookbookLoader = async ({params}) => {
  // const res = await fetch(`/api/recipe/${params.id}`);
  // const data = await res.json();
  // return data;
};

export {CookbookPage as default, cookbookLoader};