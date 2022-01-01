import { OPEN_CART_SIDEBAR } from "../action.types";
import { TOGGLE_CART_SIDEBAR } from "../action.types";

// const initialState = {
//     openCart: false,
//     with_staging: false
// }
interface Property {
    type: string,
}
export default function cartSideBarReducer(state = false, action:Property) {
    // let copyState = Object.assign({}, { ...state })
    switch (action.type) {
        // case OPEN_CART_SIDEBAR:
        //     copyState.openCart = true
        //     if (action.payload === 'with_staging') {
        //         copyState.with_staging = true
        //         return copyState
        //     } else {
        //         copyState.with_staging = false
        //         return copyState
        //     }
        case TOGGLE_CART_SIDEBAR:
            return !state
        default: return state
    }
}