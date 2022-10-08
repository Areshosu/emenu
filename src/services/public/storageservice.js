class StorageService {
    
    // accepts string
    retrieveInfo = (param) => localStorage.getItem(param)
    
    // accepts array
    setInfo = (param) => localStorage.setItem(param[0],param[1])
    
    deleteInfo = (param = null) => param? localStorage.removeItem(param[0],param[1]) : localStorage.clear()
}

export default StorageService