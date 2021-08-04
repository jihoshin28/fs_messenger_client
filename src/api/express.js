import axios from 'axios'

// let shopperToken = localStorage.getItem('shopper_token')
// let cartToken = localStorage.getItem('cart_token')

const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    'Access-Control-Allow-Origin': '*',
    // "Authorization": shopperToken
}

export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: headers 
})