import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from './Item'
import "./carousel.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

function CarouselUser() {

  return (
    <div className='carousel-container' >
      <Carousel breakPoints={breakPoints}>
        <Item>
            <img src='https://preview.redd.it/u1wiyg1hqk161.jpg?width=640&crop=smart&auto=webp&s=f39d59a2a916fa44ac3763066fa9b16f99a9e38e'></img>
        </Item>
        <Item>
            <img src='https://preview.redd.it/h0t2ifxu1m161.png?width=640&crop=smart&auto=webp&s=885233d84c057bb2f2411da73114b139559a3169'></img>
        </Item>
        <Item>1</Item>
        <Item>1</Item>
        <Item>1</Item>
        <Item>1</Item>
        <Item>1</Item>
        <Item>1</Item>

      </Carousel>
    </div>
  );
}

export default CarouselUser;