[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/miha53cevic/react-fullscreen-carousel/actions/workflows/build.yaml/badge.svg)](https://github.com/miha53cevic/react-fullscreen-carousel/actions/workflows/build.yaml)
[![NPM publish](https://github.com/miha53cevic/react-fullscreen-carousel/actions/workflows/npm.yaml/badge.svg?event=release)](https://github.com/miha53cevic/react-fullscreen-carousel/actions/workflows/npm.yaml)
# react-fullscreen-carousel
React fullscreen image carousel component for desktop and mobile  
[Demo](https://react-fullscreen-carousel-demo.onrender.com/)

## Install
```bash
npm i react-fullscreen-carousel
```
or
```bash
yarn add react-fullscreen-carousel
```

## Example
```typescript
import React from 'react';
import { ReactFullscreenCarousel } from 'react-fullscreen-carousel';

const data = [
    { img: "https://picsum.photos/400", alt: "image" },
    { img: "https://picsum.photos/500", alt: "image" },
    { img: "https://picsum.photos/600", alt: "image" },
    { img: "https://picsum.photos/700", alt: "image" },
    { img: "https://picsum.photos/650", alt: "image" },
    { img: "https://picsum.photos/750", alt: "image" },
];

const MyComponent: React.FC = () => {

    const [open, setOpen] = React.useState(false);

    return (
        <main>
            {open ?
                <ReactFullscreenCarousel slides={data} handleClose={() => setOpen(false)} startSlideIndex={0} />
                : null
            }
            <button onClick={() => setOpen(true)}>Open images</button>
        </main>
    );
};

export default MyComponent;
```
## Example with custom buttons
```typescript
import React from 'react';
import { ReactFullscreenCarousel } from 'react-fullscreen-carousel';

const data = [
    { img: "https://picsum.photos/400", alt: "image" },
    { img: "https://picsum.photos/500", alt: "image" },
    { img: "https://picsum.photos/600", alt: "image" },
    { img: "https://picsum.photos/700", alt: "image" },
    { img: "https://picsum.photos/650", alt: "image" },
    { img: "https://picsum.photos/750", alt: "image" },
];

const MyComponent: React.FC = () => {

    const [open, setOpen] = React.useState(false);

    return (
        <main>
            {open ?
                <ReactFullscreenCarousel slides={data} handleClose={() => setOpen(false)} 
                    closeButtonElement={(onClick: () => void) => <MyCustomCloseButton onClick={onClick} />}
                    prevButtonElement={(onClick: () => void) => <MyCustomPrevButton onClick={onClick} />}
                    nextButtonElement={(onClick: () => void) => <MyCustomNextButton onClick={onClick} />}
                />
                : null
            }
            <button onClick={() => setOpen(true)}>Open images</button>
        </main>
    );
};

export default MyComponent;
```