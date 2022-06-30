export const config = {
  apiUrl: 'http://staging.diariodoclima.jurema.la/api',
  headers: { 'Content-Type': 'application/json' },
  handleResponse: (response: any) => {
    return new Promise(async (resolve, reject) => {
      const contentType = response.headers.get("content-type");
      let newResponse;
      if(contentType && contentType.indexOf("application/json") !== -1) {
        newResponse = await response.json();
      }
      if(response.ok && newResponse) {
        resolve(newResponse as any);
      } else {
        reject(newResponse as any);
      }
    })
  }
}