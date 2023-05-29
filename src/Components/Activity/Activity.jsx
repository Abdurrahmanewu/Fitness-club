import React from 'react';

const Activity = ({ activity, handleAddToCart }) => {
    const { name, img, time } = activity;
    return (
        <div>
            <div className="max-w-xs rounded-md shadow-md bg-gray-100 text-gray-900">
                <img src={img} alt="" className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500" />
                <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-wide">{name}</h2>
                        <p className="text-gray-900 font-bold">{time} minutes</p>
                    </div>
                    <button onClick={() => handleAddToCart(activity)} type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900">Add Time</button>
                </div>
            </div>
        </div>
    );
};

export default Activity;