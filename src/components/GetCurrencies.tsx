import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setCurrency } from '../redux/action';
import { useQuery } from "@apollo/client";
import { CURRENCY } from '../apollo/queries';
interface State{
    currency:string,
}
export default function GetCurrencies() {
    const dispatch = useDispatch()
    const currency = useSelector((state:State) => state.currency)
        const dispatchCurrency = (value:string) => {
            dispatch(setCurrency(value))
            localStorage.setItem("currency", value)
        }
        const { loading, error, data } = useQuery(CURRENCY)
        if (loading) return <option>Loading...</option>
        if (error) return <option>Error ...</option>

        const tttt = data.currency.map((item:number, index:number) => {
            return <option key={index}>{item}</option>
        })

        return <select onChange={(e) => {
            dispatchCurrency(e.target.value)
        }
        } value={currency}>
            {tttt}
        </select>
}
