import React from 'react';
import Card from './Card';

const CardList = ({ data }) => (
    <div className="container mx-auto">
        <div className="flex flex-wrap justify-center items-center mx-4">
            {data.map((item) => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    </div>
);

export default CardList;