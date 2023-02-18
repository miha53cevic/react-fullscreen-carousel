# react-fullscreen-carousel
React fullscreen image carousel component for desktop and mobile 

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