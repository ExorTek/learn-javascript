export class Request {
    constructor(url) {
        this.url = url;
    }

    async get() {
        const response = await fetch(this.url);
        return await response.json();
    };

    async post(data) {
        const response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        });
        return await response.json();
    };

    async put(id, data) {
        const response = await fetch(this.url + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        });
        return await response.json();
    };

    async delete(id) {
        await fetch(this.url + '/' + id, {
            method: 'DELETE',
        });
        return "Delete User Successfully";
    };

}
