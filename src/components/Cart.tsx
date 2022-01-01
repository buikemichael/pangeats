import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight } from 'react-feather';
import { toggleCartSideBar } from '../redux/action';
import GetTotalAmount from './GetTotalAmount';
import GetCurrencies from './GetCurrencies';
import CartItem from './CartItem';
interface State{
    currency:string,
    cart:[],
}
interface Cart{
    length?:number
}
export default function Cart() {
    const cart:Cart = useSelector((state:State) => state.cart)
    const dispatch = useDispatch()

    const handleCloseSideBar = () => {
        dispatch(toggleCartSideBar())
    }

    return (
        <>
            <div className="cart">
                <div className="cart-inner">
                    <div className="title">
                        <div>
                            <button onClick={() => handleCloseSideBar()} className="closeButton"><div><ChevronRight size={20} strokeWidth={1} /></div></button>
                        </div>
                        <h5>YOUR CART</h5>
                        <div></div>
                    </div>
                    <div className="currency-holder">
                        <GetCurrencies />
                    </div>
                    <div className="cart-list-holder">
                        <div className="cart-list">
                            <CartItem />
                        </div>
                    </div>
                    {cart.length ? <GetTotalAmount /> : false}
                </div>
            </div>
        </>
    )
}
