import React, { useEffect, useState } from 'react';
import './Cart.css'
import { addToDb2, getRestingData } from '../../fakeDb2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ cart }) => {
    const notify = () => toast("Activity Complete!");
    let time = 0;
    let quantity = 0;

    for (const activity of cart) {
        quantity = quantity + activity.quantity;
        time = time + activity.time * activity.quantity;
    }
    // console.log(cart);
    const [rest, setRest] = useState();
    useEffect(() => {
        const restDataInLocal = getRestingData();
        for (const storedRestTime in restDataInLocal) {
            if (storedRestTime) {
                setRest(storedRestTime);
            }
        }
    }, [])

    const addRestTime = (restTime) => {
        setRest(restTime)
        addToDb2(restTime);
    }
    return (
        <div className='cart-infos'>
            <ToastContainer />
            <div className="btn-container">
                <button onClick={() => addRestTime(10)} className='cart-btn' >10m</button>
                <button onClick={() => addRestTime(20)} className='cart-btn' >20m</button>
                <button onClick={() => addRestTime(30)} className='cart-btn' >30m</button>
                <button onClick={() => addRestTime(40)} className='cart-btn' >40m</button>
                <button onClick={() => addRestTime(50)} className='cart-btn' >50m</button>
            </div>
            <div className="result-container">
                <h1 className='text-3xl' >cart length:{quantity}</h1>
                <p className='text-3xl'>Exercise time: {time} minutes</p>
                <p className='text-3xl'>Rest time: {rest} minutes</p>
            </div>
            <br />
            <button onClick={notify} type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900">Activity Complete</button>
        </div>
    );
};

export default Cart;