const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

class ShopService {
    constructor() {
        this.domain = 'http://127.0.0.1:8000'
    }

    index($outlet_id) {
        return fetch(`${this.domain}/api/e-menu/v2/menu-items/outlet/${$outlet_id}`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }

    tax($outlet_id) {
        return fetch(`${this.domain}/api/e-menu/v2/menu-items/outlet/${$outlet_id}/tax`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }

    payment_methods($outlet_id) {
        return fetch(`${this.domain}/api/e-menu/v2/menu-items/outlet/${$outlet_id}/payment-methods`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }
}

export default ShopService