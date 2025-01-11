import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BaseResponse } from "../../models/responses/base-response";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root', 
  })
export class HttpService {
    private baseUrl: string;
    private http: HttpClient;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.baseUrl;
        this.http = httpClient;
    }

    get<T extends BaseResponse>(url: string): Observable<T> {
        var exportUrl = this.baseUrl+url;
        const response = this.http.get<T>(exportUrl, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });

        return response;
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