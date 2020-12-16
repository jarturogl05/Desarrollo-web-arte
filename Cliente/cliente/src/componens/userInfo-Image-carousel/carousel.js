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

const userPublications = [
  {id:1, urlImage:"https://i.redd.it/ytkkbowirm061.jpg"},
  {id:2, urlImage:"https://preview.redd.it/u1wiyg1hqk161.jpg?width=640&crop=smart&auto=webp&s=f39d59a2a916fa44ac3763066fa9b16f99a9e38e"},
  {id:3, urlImage:"https://preview.redd.it/m0j2jera6vt51.jpg?width=640&crop=smart&auto=webp&s=945a5984209869671131e17100881448851c4885"},
  {id:4, urlImage:"https://preview.redd.it/unc712crfb161.jpg?width=640&crop=smart&auto=webp&s=ea65ba33e36860c6c5112acc38e2da566ae7acfd"},
  {id:5, urlImage:"https://preview.redd.it/58kr9jcua8751.jpg?width=640&crop=smart&auto=webp&s=6fc00927da689a461dd7540de3ac7bfd215d78ca"},

];


function CarouselUser() {




  return (
    <div className='carousel-container' >
      <Carousel breakPoints={breakPoints}>
        {userPublications.map((publication) =>{
          return <Item>
            <img src={publication.urlImage}></img>
          </Item>
        })}
      </Carousel>
    </div>
  );
}

export default CarouselUser;