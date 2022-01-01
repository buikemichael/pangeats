import { ADD_TO_CART } from "./action.types"
import { CART_STAGE } from "./action.types"
import { OPEN_CART_SIDEBAR } from "./action.types"
import { TOGGLE_CART_SIDEBAR } from "./action.types";
import { REMOVE_ITEM_FROM_CART } from "./action.types"
import { INCREASE_ITEM_QUANTITY } from "./action.types"
import { DECREASE_ITEM_QUANTITY } from "./action.types"
import { SET_CURRENCY } from "./action.types"
import { LOCAL_STORAGE_TO_CART } from "./action.types"

export const addToCart = (payload:object) => (
    {
        type: ADD_TO_CART,
        payload
    }
)
export const cartStage = (payload:object) => (
    {
        type: CART_STAGE,
        payload
    }
)
export const openCartSidebar = () => (
    {
        type: OPEN_CART_SIDEBAR,
    }
)

export const toggleCartSideBar = () => (
    {
        type: TOGGLE_CART_SIDEBAR,
    }
)

export const removeItemFromCart = (payload:object) => (
    {
        type: REMOVE_ITEM_FROM_CART,
        payload
    }
)

export const increaseItemQuantity = (payload:object) => (
    {
        type: INCREASE_ITEM_QUANTITY,
        payload
    }
)
export const decreaseItemQuantity = (payload:object) => (
    {
        type: DECREASE_ITEM_QUANTITY,
        payload
    }
)
export const setCurrency = (payload:string) => (
    {
        type: SET_CURRENCY,
        payload
    }
)
export const localStorageToCart = (payload:object) => (
    {
        type: LOCAL_STORAGE_TO_CART,
        payload
    }
)
