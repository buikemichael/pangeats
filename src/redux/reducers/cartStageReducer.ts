import { CART_STAGE } from "../action.types";
interface Property {
    type: string,
    payload: {
        id: number,
        quantity: number
    }
}
export default function cartStageReducer(state = null, action:Property) {
    switch (action.type) {
        case CART_STAGE:
            return action.payload
        default: return state
    }
}