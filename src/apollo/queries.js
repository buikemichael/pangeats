import gql from 'graphql-tag'




export const PRODUCTS = gql`
    query getProducts($currency:Currency!) {
    products{
        id
        title
        image_url
        price(currency:$currency)
        }
    }
`;

export const CURRENCY = gql`
        query getCurrencies{
            currency
        }`;