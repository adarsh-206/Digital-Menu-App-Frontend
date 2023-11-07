import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const foodData = [
    {
        id: 1,
        name: 'Pizza',
        image: 'https://miro.medium.com/v2/resize:fit:1400/0*oTfm1pTXLxitHHFy.jpg',
    },
    {
        id: 2,
        name: 'Burger',
        image: 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
    },
    {
        id: 3,
        name: 'Momos',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momo_nepal.jpg/800px-Momo_nepal.jpg',
    },
    {
        id: 4,
        name: 'Noodles',
        image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/veg-noodles-vegetable-noodles-recipe.jpg',
    },
    {
        id: 5,
        name: 'Manchurian',
        image: 'https://www.licious.in/blog/wp-content/uploads/2021/09/shutterstock_1650877375.jpg',
    },
    {
        id: 6,
        name: 'Sushi',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momo_nepal.jpg/800px-Momo_nepal.jpg',
    },
    {
        id: 7,
        name: 'Sushi',
        image: 'https://miro.medium.com/v2/resize:fit:1400/0*oTfm1pTXLxitHHFy.jpg',
    },
    {
        id: 8,
        name: 'Sushi',
        image: 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
    },
    {
        id: 9,
        name: 'Sushi',
        image: 'https://miro.medium.com/v2/resize:fit:1400/0*oTfm1pTXLxitHHFy.jpg',
    },
];

export default function TopItems() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            <h1 className='text-xl font-bold pl-8 pt-3'>Top Food Items</h1>
            <Swiper navigation={!isSmallScreen} slidesPerView={5}
                spaceBetween={20} modules={[Navigation]}
                breakpoints={{
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },

                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 50
                    },

                }}
                className="mySwiper p-8">
                {foodData && foodData.map((food) => (
                    <SwiperSlide key={food.id}>
                        <div className="card flex flex-col items-center">
                            <img src={food.image} className='w-32 h-32 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 xl:w-48 xl:h-48 rounded-full' alt={food.name} />
                            <div className="card-content p-3 font-bold">
                                <h2>{food.name}</h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}