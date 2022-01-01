import { ADD_TO_CART } from "../action.types"
import { REMOVE_ITEM_FROM_CART } from "../action.types"
import { INCREASE_ITEM_QUANTITY } from "../action.types"
import { DECREASE_ITEM_QUANTITY } from "../action.types"
import { LOCAL_STORAGE_TO_CART } from "../action.types"

interface Property {
    type: string,
    payload: {
        id: number,
        quantity: number
    }
}
interface Item {
    id: number
    quantity:number
}
interface Element {
    id: number,
    quantity: number
}
export default function cartReducer(state = [], action: Property) {
    switch (action.type) {
        case ADD_TO_CART:
            let copyState = [...state]
            //check if item exists in cart already
            var item: Item | undefined = copyState.find((item: Item) => item.id === action.payload.id)
            if (item) {
                return state.map(
                    (element: Element) =>
                    (
                        element.id === item?.id ? { ...element, quantity: element.quantity + 1 } : element
                    )
                )
            } else {
                let new_payload = Object.assign({}, action.payload)
                new_payload.quantity = 1
                return [...state, new_payload]
            }
        case LOCAL_STORAGE_TO_CART:
            return action.payload

        case REMOVE_ITEM_FROM_CART:
            return state.filter((item: Item) => item.id !== action.payload.id)

        case INCREASE_ITEM_QUANTITY:
            return state.map((item: Item) => (
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ))

        case DECREASE_ITEM_QUANTITY:
            return state.map((item: Item) => (
                item.id === action.payload.id ? { ...item, quantity: item.quantity === 1 ? item.quantity : item.quantity - 1 } : item
            ))

        default: return state
    }
}