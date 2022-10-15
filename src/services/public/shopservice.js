const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

class ShopService {
    constructor() {
        this.domain = process.env.REACT_APP_API_URL
    }

    index(outlet_id) {
        return fetch(`${this.domain}/menu-items/outlet/${outlet_id}`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }

    validateTable(outlet_id,table_id) {
        return fetch(`${this.domain}/menu-items/outlet/${outlet_id}/table/${table_id}`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }

    tax(outlet_id) {
        return fetch(`${this.domain}/menu-items/outlet/${outlet_id}/tax`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }

    payment_methods(outlet_id) {
        return fetch(`${this.domain}/menu-items/outlet/${outlet_id}/payment-methods`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }

    order(outlet_id,table_id,payload) {
        return fetch(`${this.domain}/menu-items/outlet/${outlet_id}/table/${table_id}/order`,{
            headers: headers,
            method: 'POST',
            body: JSON.stringify(payload)
        }).then((response) => response.json())
    }

    pay(outlet_id,order_id) {
        return fetch(`${this.domain}/menu-items/outlet/${outlet_id}/order/${order_id}/bill`,{
            headers: headers,
            method: 'GET',
        }).then((response) => response.json())
    }

    showOrder(outlet_id,order_id) {
        return fetch(`${this.domain}/menu-items/outlet/${outlet_id}/order/${order_id}`,{
            headers: headers,
            method: 'GET',
        }).then((response) => response.json())
    }
}

export default ShopService