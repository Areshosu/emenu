class AuthenticationService {
    
    // accepts string
    retrieveInfo = (param) => localStorage.getItem(param)
    
    // accepts array
    setInfo = (param) => localStorage.setItem(param[0],param[1])
    
    deleteInfo = (param = null) => param? localStorage.removeItem(param[0],param[1]) : localStorage.clear()

    async isLoggedIn (current_outlet_id) {
        let outlet_id = localStorage.getItem('outlet_id')
        return Number(current_outlet_id) === Number(outlet_id)
    }
}

export default AuthenticationService