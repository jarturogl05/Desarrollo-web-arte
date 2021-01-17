import React,{useState, useEffect} from "react";
import Carousel from "react-elastic-carousel";
import Item from './Item'
import "./carousel.css";
import { useHistory } from "react-router-dom";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

function CarouselUser(props) {
const [userPublications, setUserPublications] = useState([]);
const history = useHistory();

useEffect(  () =>{
  async function getUserPublications(){
    if(userPublications !== [])
    setUserPublications(props.autorWorks);
  }
  getUserPublications()
},[props.autorWorks])

const handleImageclick = (id) => {
  
  history.push('/post/'+ id );
  history.go(0)


}

  return (
    <div className='carousel-container' >
      <Carousel breakPoints={breakPoints}>
        {userPublications && userPublications.map((publication) =>{
          return <Item>
            <img src={publication.URLThumbnail} onClick={() => handleImageclick(publication._id)}></img>
          </Item>
        })}
      </Carousel>
    </div>
  );
}

export default CarouselUser;