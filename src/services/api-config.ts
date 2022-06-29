export const config = {
  apiUrl: 'http://staging.diariodoclima.jurema.la/api',
  headers: { 'Content-Type': 'application/json' },
  handleResponse: (response: any) => {
    return new Promise(async (resolve, reject) => {
      const newResponse = await response.json();
      if(response.ok) {
        resolve(newResponse);
      } else {
        reject(newResponse);
      }
    })
  }
}