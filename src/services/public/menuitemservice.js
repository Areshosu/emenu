const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

class MenuItemsService {
    constructor() {
        this.domain = 'http://127.0.0.1:8000'
    }

    index($outlet_id) {
        return fetch(`${this.domain}/api/e-menu/v2/menu-items/outlet/${$outlet_id}/menu-items`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }
}

export default MenuItemsService