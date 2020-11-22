import React from 'react'
import './publication.css'


function Publication(props) {

    const postInfo = props.postInfo;
    return (
        <div className="publication">
            <img src={postInfo.urlImage} alt="art"></img>
            <h2>{postInfo.publicationName}</h2>
            <div className="publication_tags">
            {
                postInfo.tags.map(tag =>{
                    return <a>{tag}</a>
                })
            }
            </div>

        </div>
    )
}

export default Publication;
