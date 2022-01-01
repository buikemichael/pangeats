import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {toggleCartSideBar, addToCart, setCurrency, localStorageToCart } from '../redux/action';
import { useQuery } from "@apollo/client";
import gql from 'graphql-tag'

interface State{
    currency:string,
    cart:[]
}
interface Item{
    id:number,
    image_url:string,
    title:string,
    price:number
}
export default function ProductList() {
    const dispatch = useDispatch()
    const currency = useSelector((state:State) => state.currency)
    const cart = useSelector((state:State) => state.cart)

    useEffect(() => {
        let localItem = localStorage.getItem('cart')
        if (localItem?.length) {
            dispatch(localStorageToCart(JSON.parse(localItem)))
        }
    }, [dispatch])

    useEffect(() => {
        if (cart) {
            let stringCart = JSON.stringify(cart);
            localStorage.setItem("cart", stringCart)
        }
    }, [cart])

    useEffect(() => {
        let localCurrency = localStorage.getItem('currency');
        if (localCurrency) {
            dispatch(setCurrency(localCurrency))
        } else {
            dispatch(setCurrency('USD'))
        }
    }, [currency, dispatch])

    const PRODUCTS = gql`
        query getProducts($currency:Currency!) {
        products{
            id
            title
            image_url
            price(currency:$currency)
            }
        }
    `;


    const handleAddToCart = (item:object) => {
        dispatch(addToCart(item))
        dispatch(toggleCartSideBar())
    }



    const { loading, error, variables, data, refetch } = useQuery(PRODUCTS, {
        variables: { currency: "USD" },
        returnPartialData: true,
    })

    useEffect(() => {
        refetch({ currency })
    }, [currency, refetch])


    if (loading) return <div className="preloader">
        <div className="preloader-inner">
            <div className="cart-item-preloader"> <div className="cart-img-preloader animate"></div><div className="cart-title-preloader animate"></div><div className="cart-price-preloader animate"></div><div className="cart-add-preloader animate"></div> </div>
            <div className="cart-item-preloader"> <div className="cart-img-preloader animate"></div><div className="cart-title-preloader animate"></div><div className="cart-price-preloader animate"></div><div className="cart-add-preloader animate"></div> </div>
            <div className="cart-item-preloader"> <div className="cart-img-preloader animate"></div><div className="cart-title-preloader animate"></div><div className="cart-price-preloader animate"></div><div className="cart-add-preloader animate"></div> </div>
            <div className="cart-item-preloader"> <div className="cart-img-preloader animate"></div><div className="cart-title-preloader animate"></div><div className="cart-price-preloader animate"></div><div className="cart-add-preloader animate"></div> </div>
        </div>
    </div>




    if (error) return <div className="loading">Error...</div>


    const result = data.products.map((item:Item) => (
        <div className="item" key={item.id}> <div className="item-content"><a href='/'><img src={item.image_url} alt="featured products" /><h3 className="title">{item.title}</h3><p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: variables?.currency, }).format(item.price)}</p></a></div><div className="add-to-cart" onClick={() => { handleAddToCart({ id: item.id }) }}>Add to Cart</div> </div>
    )
    )

    return (
        <>
            <div className="featured-products">
                <div className="inner">
                    <div className="content">
                        {result}
                    </div>
                </div>
            </div>
        </>)
}
