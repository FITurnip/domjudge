import axios, { type AxiosResponse } from 'axios';

class ApiService {
    private static apiUrl: string = import.meta.env.VITE_API_URL;
    private static headers: object = {
        'Content-Type': 'application/json',
    };

    // POST method
    static async post(endpoint: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.post(`${this.apiUrl}${endpoint}`, data, {
                headers: this.headers,
            });
            return response;
        } catch (error) {
            console.error('API error:', error);
            throw error; // Rethrow the error for further handling
        }
    }

    // GET method
    static async get(endpoint: string, params?: any): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.get(`${this.apiUrl}${endpoint}`, {
                params,
                headers: this.headers,
            });
            return response;
        } catch (error) {
            console.error('API error:', error);
            throw error; // Rethrow the error for further handling
        }
    }

    // PUT method for updating resources
    static async put(endpoint: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.put(`${this.apiUrl}${endpoint}`, data, {
                headers: this.headers,
            });
            return response;
        } catch (error) {
            console.error('API error:', error);
            throw error; // Rethrow the error for further handling
        }
    }

    // DELETE method for deleting resources
    static async delete(endpoint: string): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.delete(`${this.apiUrl}${endpoint}`, {
                headers: this.headers,
            });
            return response;
        } catch (error) {
            console.error('API error:', error);
            throw error; // Rethrow the error for further handling
        }
    }
}

// Default export of the ApiService class
export default ApiService;
