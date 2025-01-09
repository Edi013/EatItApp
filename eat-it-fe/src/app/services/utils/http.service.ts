import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root', 
  })
export class HttpService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = environment.baseUrl;
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`GET request failed: ${response.statusText}`);
        }

        return response.json();
    }

    async post<T>(url: string, data: object): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`POST request failed: ${response.statusText}`);
        }

        return response.json();
    }

    async put<T>(url: string, data: object): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`PUT request failed: ${response.statusText}`);
        }

        return response.json();
    }

    async delete<T>(url: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`DELETE request failed: ${response.statusText}`);
        }

        return response.json();
    }
}