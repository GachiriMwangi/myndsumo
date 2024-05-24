const url = 'http://localhost:5000/api/data'
export const fetchData = async() => {
    const response = await fetch(`${url}`, {
        method: 'GET', 
        headers: {          
            'Content-Type': "application/json"
        }
    })

    const data = await response.json() 
    return data
}