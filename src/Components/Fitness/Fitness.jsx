import React, { useEffect, useState } from 'react';
import Activity from '../Activity/Activity';
import './Fitness.css';
import Profile from '../Profile/Profile';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../fakeDb';


const Fitness = () => {

    const [activities, setActivities] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('activities.json')
            .then(res => res.json())
            .then(data => setActivities(data))
    }, []);
    useEffect(() => {
        const activitiesInLocal = getStoredCart();
        let storedActivity = [];
        for (const id in activitiesInLocal) {
            const addedActivity = activities.find(activity => activity.id === id);
            if (addedActivity) {
                const quantity = activitiesInLocal[id];
                addedActivity.quantity = quantity;
                storedActivity.push(addedActivity);
            }
        }
        setCart(storedActivity);

    }, [activities])
    // console.log(cart)

    const handleAddToCart = (selectedActivity) => {
        let newCart = [];
        const existingActivity = cart.find(activity => activity.id === selectedActivity.id)
        if (!existingActivity) {
            selectedActivity.quantity = 1;
            newCart = [...cart, selectedActivity];
            setCart(newCart);
        }
        else {
            const restActivity = cart.filter(activity => activity.id !== selectedActivity.id)
            selectedActivity.quantity = selectedActivity.quantity + 1;
            newCart = [...restActivity, selectedActivity];
            setCart(newCart)
        }
        addToDb(selectedActivity.id)
    }


    return (
        <div className='main-container'>
            <div className="activity-container">
                {
                    activities.map(activity => <Activity
                        activity={activity}
                        key={activity.id}
                        handleAddToCart={handleAddToCart}
                    ></Activity>)
                }
            </div>
            <div className="cart-container">
                <Profile></Profile>
                <Cart
                    cart={cart}
                ></Cart>

            </div>

        </div>
    );
};

export default Fitness;