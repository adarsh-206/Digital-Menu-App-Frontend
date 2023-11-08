import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const foodData = [
    {
        id: 1,
        name: 'Appetizer',
        image: 'https://www.shutterstock.com/image-vector/appetizer-handwritten-restaurant-kitchen-brush-600w-1919307323.jpg',
    },
    {
        id: 2,
        name: 'Salads',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/003/375/585/small/green-leaf-salad-hand-written-word-text-for-typography-logo-design-vector.jpg',
    },
    {
        id: 3,
        name: 'Soups',
        image: 'https://i.pinimg.com/originals/37/7e/20/377e201cce6210322f25965d41211511.jpg',
    },
    {
        id: 4,
        name: 'Desserts',
        image: 'https://www.shutterstock.com/image-vector/vector-illustration-desserts-text-logotype-260nw-1858157326.jpg',
    },
    {
        id: 5,
        name: 'Beverages',
        image: 'https://www.shutterstock.com/image-vector/beverages-text-design-vector-calligraphy-600w-618515138.jpg',
    },
    {
        id: 6,
        name: 'Chinese',
        image: 'https://i.pinimg.com/originals/60/2c/19/602c19091af2e5ccb237f513f641fe2f.png',
    },
    {
        id: 7,
        name: 'North Indian',
        image: 'https://www.ampersandtravel.com/media/842485/logo-north-india.png',
    },
    {
        id: 8,
        name: 'South Indian',
        image: 'https://www.logolynx.com/images/logolynx/99/9914968f9651b2032a18d207dae9a284.jpeg',
    },
];

export default function CategorySlider() {
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
            <h1 className='text-xl font-bold pl-8 pt-3'>Categories</h1>
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