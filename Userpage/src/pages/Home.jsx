import React from 'react'
import Header from '../Components/Header/Header.jsx'
import Exploremenu from '../Components/ExploreMeny/Exploremenu.jsx'
import FoodDisplay from '../Components/Food/Food.jsx'
import { useState } from 'react'

const Home = () => {
  const [category, setCategory] = useState('All');
  return (
    <main>
        <Header />
        <Exploremenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} searchText="" />
    </main>
  )
}

export default Home