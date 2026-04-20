const BASE_URL = 'http://localhost:3000/api'; // изменить на нормальное

function buildQueryString(params?: Record<string, any>): string {
  if (!params) return ''
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

export const api = {
    get(url: string, params?: Record<string, any>) {
        const queryString = buildQueryString(params)
        return fetch(`${BASE_URL}${url}${queryString}`).then(response => response.json())
    },
    post(url: string, data: any) {
        const post_api = fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data) 
        }).then(response => response.json());
        return post_api;
    },
    put(url: string, data: any) {
        const put_api = fetch(`${BASE_URL}${url}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data) 
        }).then(response => response.json());
        return put_api;
    },
    delete(url: string){
        const delete_api = fetch(`${BASE_URL}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => response.json());
        return delete_api;
    }
}