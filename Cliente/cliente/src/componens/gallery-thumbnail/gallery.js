import React from 'react'
import './gallery.css'
function  Gallery() {

    const thumbnails = [
        {id:5, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail32177871207411823prueba3.jpg'},
        {id:6, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail4211998531744643prueba5.jpg'},
        {id:7, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail5973210479235325prueba5.jpg'},
        {id:8, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail7181510374887301prueba3.jpg'},
        {id:9, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail93614924120428prueba5.jpg'},
        {id:1, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail022135760539019556prueba2.jpg'},
        {id:2, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail026945652180220048gatoreloco.jpg'},
        {id:3, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail0988100385361208cosa.jpg'},
        {id:4, URLThumbnail: 'https://imageswebart.blob.core.windows.net/miniaturas/thumbnail20453032571843033prueba1.jpg'},
        

    ]

    return (
        <div className='img-grid'>
            {thumbnails && thumbnails.map(thumbnails =>(
                <div className='img-wrap' key={thumbnails.id}>
                    <img src ={thumbnails.URLThumbnail} alt='pic'></img>
                </div>
            ))}
        </div>
    )
}

export default Gallery
