import React from 'react'
import MainCarousel from '../components/home-carousel/MainCarousel'
import HomeSectionCarousel from '../components/home-section-carousel/HomeSectionCarousel'
import { mens_kurta } from "../../data/men/mens_kurta";

const HomePage = () => {
  return (
    <div>
        <MainCarousel/>
        <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"}/>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shoes"}/>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shirt"}/>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Women's Saree"}/>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Women's Dresses"}/>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Women's Lehenga"}/>
        </div>
    </div>
  )
}

export default HomePage
