import React, { useState, useEffect } from 'react';

import './styles.css';


const Phone = ({ imagesView = [] }) => {
    const [images, setImages] = useState(imagesView);
    const [currentImage, setCurrentImage] = useState(0);

    const reload = () => {
        setImages(imagesView)

        const intevalImages = setInterval(() => {
            const totalImages = images.length - 1;
            if (currentImage !== totalImages) {
                const newCurrentImage = currentImage + 1;
                setCurrentImage(newCurrentImage);
            } else {
                setCurrentImage(0);
            }
            
            clearReloadInterval(intevalImages);
        }, 4000)
    }

    const clearReloadInterval = (interval) => {
        clearInterval(interval);
    }

    useEffect(() => {
        reload();
    })

    return (
        <div className="box-phone">    
            <img className="image-preview" src={images[currentImage]} alt="Preview instagram" />
        </div>       
    );
}

export default Phone;