import { SET_CURRENCY } from "../action.types"

interface Property {
    type: string,
    payload: string
}

export default function currencyReducer(state = "USD", action:Property) {
    switch (action.type) {
        case SET_CURRENCY:
            return action.payload
        default: return state
    }
}