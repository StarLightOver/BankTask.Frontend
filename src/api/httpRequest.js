export type ResponseType = {
    data: Promise<any>,
    error: Promise<string>,
}

export async function httpRequest(url: string, method: string, body?: string): Promise {
    const baseUrl = 'http://localhost:3000/'
    const opt: RequestInit = {
        method: method,
        headers: {
            'content-type': 'application/json',
        },
        body: body,
    }
    const response: ResponseType = await fetch(baseUrl + url, opt)
        .then(res => {
            if (res.ok)
                return {data: res.json()};
            
            return  {error: res.text()}
        })
        .catch((error) => {
            console.log(`В запросе ${baseUrl + url} произошла ошибка ${error}`);
        });

    const error = await response.error;
    if (error)
        alert(error)

    return await response.data;
}