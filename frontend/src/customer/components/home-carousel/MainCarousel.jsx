import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './MainCarouselData';


export default function MainCarousel() {
    //const navigate=useNavigate
    const items = mainCarouselData.map((item)=><img className='cursor-pointer' role='presentation' src={item.image} alt='Image'/>);

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

  return (
    <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
    />
  )
}
