import React, { useEffect, useRef, useState } from 'react';
import './react-fullscreen-carousel.css';

export interface ISlide {
    img: string,
    alt?: string,
}

export interface Props {
    slides: ISlide[],
    handleClose: () => void,
    startSlideIndex?: number,
};

/**
 * Image Gallery viewer aka when clicking on an image show all the images in a bigger (fullscreen) size
 * @param slides Array of images
 * @param handleClose Function to call to close the image gallery
 * @param startSlideIndex OPTIONAL starting slide index, default is the first one in the array
 * @example
 * // Place anywhere and use a state (ex. openModal) to check if it needs to be rendered
 *  { openModal ?
 *  <ImageSlider props />
 *  : null
 *  }
 */
const ReactFullscreenCarousel: React.FC<Props> = ({ slides, handleClose, startSlideIndex }) => {

    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        // If startSlideIndex is given, change current to it so
        // it triggers the useEffect hook under to switch to new slide
        if (startSlideIndex) {
            setCurrent(() => startSlideIndex);
        }

        // Makni scrollbar dok se otvori modal
        // Bitno hidden, a ne none jer hidden zapamti di si zadnje ostavil scroll
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };

    }, [startSlideIndex]);

    // Local variables
    const slideContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef<boolean>(false);
    const startPos = useRef<number>(0);

    const prevTranslate = useRef<number>(0);
    const currentTranslate = useRef<number>(0);

    const animationId = useRef<number>(0);

    // Makni default drag behaviour koji je kopirati sliku
    const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        // Pomakni za window width
        currentTranslate.current = current * -window.innerWidth;
        prevTranslate.current = currentTranslate.current;

        if (slideContainerRef.current)
            slideContainerRef.current.style.transform = `translateX(${currentTranslate.current}px)`;

    }, [current]);

    // Touch events
    const handleTouchStart = (e: React.TouchEvent<HTMLImageElement> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (e.type.includes('mouse')) {
            startPos.current = (e as React.MouseEvent<HTMLImageElement, MouseEvent>).pageX;
        } else {
            startPos.current = (e as React.TouchEvent<HTMLImageElement>).touches[0].clientX;
        }
        isDragging.current = true;
        animationId.current = requestAnimationFrame(animate);

        //console.log("Start");
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLImageElement> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (isDragging.current) {
            if (e.type.includes('mouse')) {
                currentTranslate.current = (e as React.MouseEvent<HTMLImageElement, MouseEvent>).pageX;
            } else {
                currentTranslate.current = (e as React.TouchEvent<HTMLImageElement>).touches[0].clientX;
            }
            currentTranslate.current = prevTranslate.current + (currentTranslate.current - startPos.current);

            //console.log("Move");
        }
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!isDragging.current) return;

        isDragging.current = false;
        cancelAnimationFrame(animationId.current);

        const translateDelta = 50;

        // if moved enough negative then snap to next slide if there is one
        if (currentTranslate.current - prevTranslate.current < -translateDelta) nextSlide();

        // if moved enough positive then snap to previous slide if there is one
        if (currentTranslate.current - prevTranslate.current > translateDelta) prevSlide();

        // If on the first slide reset move
        if (currentTranslate.current - prevTranslate.current > translateDelta) {
            currentTranslate.current = 0;
            prevTranslate.current = 0;

            if (slideContainerRef.current)
                slideContainerRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
        }

        // If on the last slide reset move
        else if (currentTranslate.current - prevTranslate.current < -translateDelta) {
            currentTranslate.current = current * -window.innerWidth;

            if (slideContainerRef.current)
                slideContainerRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
        }

        // If the translation distance is less then translateDelta then reset back to original position
        else {
            currentTranslate.current = current * -window.innerWidth;

            if (slideContainerRef.current)
                slideContainerRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
        }


        //console.log("End");
    };

    // Move the slideContainer by translating on the X axis
    const animate = () => {
        if (slideContainerRef.current)
            slideContainerRef.current.style.transform = `translateX(${currentTranslate.current}px)`;

        if (isDragging.current) requestAnimationFrame(animate);
    };

    ////////////////////////////////////////////////////

    const nextSlide = () => {
        // Loop version
        //setCurrent((current === slides.length - 1) ? 0 : current + 1);
        if (current !== slides.length - 1) {
            setCurrent(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (current !== 0) {
            setCurrent(prev => prev - 1);
        }
    };

    ////////////////////////////////////////////////////

    return (
        <div className='container'>
            <div className='backButton'>
                <button onClick={prevSlide}>Back</button>
            </div>
            <div className='forwardButton'>
                <button onClick={nextSlide}>Next</button>
            </div>
            <div className='closeButton'>
                <button onClick={handleClose}>Close</button>
            </div>
            <div className='imageIndicatorContainer'>
                <h1>{`${current + 1} / ${slides.length}`}</h1>
            </div>
            <div className='slideContainer' ref={slideContainerRef}>
                {slides.map((slide, index) => {
                    return (
                        <div className='slide' key={index}>
                            <img src={slide.img} alt={slide.alt ? slide.alt : 'missing image alt'}
                                onDragStart={handleDragStart}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onMouseDown={handleTouchStart}
                                onMouseMove={handleTouchMove}
                                onMouseUp={handleTouchEnd}
                                onMouseLeave={handleTouchEnd}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReactFullscreenCarousel;