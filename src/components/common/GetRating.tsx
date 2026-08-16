import React from 'react';

interface GetRatingProps {
    averageRating?: number;
    ratings?: number[];
}

const GetRating: React.FC<GetRatingProps> = ({ averageRating, ratings }) => {
    const totalRatings = ratings ? ratings.length : 0;
    const average = averageRating != null ? averageRating : 0;

    return (
        <div>
            <p>Average Rating: {totalRatings > 0 ? average : 'No ratings available'}</p>
        </div>
    );
};

export default GetRating;