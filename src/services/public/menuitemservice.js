const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

class MenuItemsService {
    constructor() {
        this.domain = process.env.REACT_APP_API_URL
    }

    index(outlet_id) {
        return fetch(`${this.domain}/api/e-menu/v2/menu-items/outlet/${outlet_id}/menu-items`,{
            headers: headers,
            method: 'GET'
        }).then((response) => response.json())
    }
}

export default MenuItemsService