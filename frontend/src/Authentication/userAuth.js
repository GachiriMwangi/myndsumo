export const getUserInfo = async(token) => {
    const response = await fetch(`${url}/user`, {
        method: 'GET', 
        headers: {
            'Authorization': token, 
            'Content-Type': "application/json"
        }
    }
    )

    const data = await response.json() 
    return data       
}