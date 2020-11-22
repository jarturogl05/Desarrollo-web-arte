import React from 'react'
import './publication.css'


function Publication(props) {

    return (
        <div className="publication">
            <img src={props.postInfo.urlImage} alt="art"></img>
            <h2>{props.postInfo.publicationName}</h2>
        </div>
    )
}

export default Publication;
