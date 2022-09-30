class AuthenticationService {
    retrieveInfo = (param) => localStorage.getItem(param)
    setInfo = (param) => localStorage.setItem(param)
    deleteInfo = (param = null) => param? localStorage.removeItem(param) : localStorage.clear()

    isLoggedIn (current_outlet_id) {
        let outlet_id = localStorage.getItem('outlet_id')
        return Number(current_outlet_id) === Number(outlet_id)
    }
}

export default AuthenticationService