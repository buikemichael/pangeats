import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";
import { PRODUCTS } from '../apollo/queries';
import { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } from '../redux/action';
interface State {
    currency: string,
    cart: [],
}
interface Data {
    id: number,
    quantity: number
}
export default function CartItem() {
    const cart = useSelector((state:State) => state.cart)
    const currency = useSelector((state:State) => state.currency)
    const dispatch = useDispatch()

    const removeItem = (id:number) => {
        dispatch(removeItemFromCart({id}))
    }
    const increaseQuantity = (id:number) => {
        dispatch(increaseItemQuantity({id}))
    }

    const decreaseQuantity = (id:number) => {
        dispatch(decreaseItemQuantity({id}))
    }

    const { loading, error, data, variables, refetch } = useQuery(PRODUCTS, {
        variables: { currency: 'USD' },
        fetchPolicy: 'cache-first',
        returnPartialData: true
    })

    useEffect(() => {
        refetch({ currency },
        )
    }, [refetch, currency])

    if (loading) return <option>Loading...</option>
    if (error) return <option>Errors...</option>

    const filteredCart = cart.map((x:Data) => {
        let item = data.products.find((item:Data) => item.id === x.id)
        if (item) {
            return Object.assign({}, x, item)
        }
        return x
    })

    if (!filteredCart.length) {
        return <div className="no-cart-item">There are no items in your cart.</div>
    }
    const test =  filteredCart.map((item) => {
        return <div className="cart-item" key={item.id}>
            <div className="description-holder">
                <button onClick={() => removeItem(item.id)}>X</button>
                <h6>{item.title}</h6>
                <p className="description">One time purchase of Two Months supply</p>
                <div className="quantity">
                    <div className="quantity-setting">
                        <span onClick={() => decreaseQuantity(item.id)}>-</span>
                        <span>{item.quantity}</span>
                        <span onClick={() => increaseQuantity(item.id)}>+</span>
                    </div>
                    <div className="price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: variables?.currency, }).format(item.price * item.quantity)}</div>
                </div>
            </div>
            <div className="img-holder"><img src={item.image_url} alt="sample" /></div>
        </div>
    })
    return<>{test}</>
}
