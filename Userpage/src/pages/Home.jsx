import React from 'react'
import Header from '../Components/Header/Header.jsx'
import Exploremenu from '../Components/ExploreMeny/Exploremenu.jsx'
import FoodDisplay from '../Components/Food/Food.jsx'

const Home = () => {
  return (
    <main>
        <Header />
        <Exploremenu />
        <FoodDisplay />
    </main>
  )
}

export default Home