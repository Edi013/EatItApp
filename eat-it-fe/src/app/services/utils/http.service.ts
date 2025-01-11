import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseResponse } from "../../models/responses/base-response";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root', 
})
export class HttpService {
    private baseUrl: string;
    private http: HttpClient;
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
        this.http = httpClient;
        this.baseUrl = environment.baseUrl;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
        });
    }

    get<T extends BaseResponse>(url: string): Observable<T> {
        const exportUrl = this.baseUrl + url;
        return this.http.get<T>(exportUrl, {
            withCredentials: true,
            headers: this.headers,
        });
    }

    post<T>(url: string, data: object): Observable<T> {
        const exportUrl = this.baseUrl + url;
        return this.http.post<T>(exportUrl, data, {
            withCredentials: true,
            headers: this.headers,
        });
    }

    put<T>(url: string, data: object): Observable<T> {
        const exportUrl = this.baseUrl + url;
        return this.http.put<T>(exportUrl, data, {
            withCredentials: true,
            headers: this.headers,
        });
    }

    delete<T>(url: string): Observable<T> {
        const exportUrl = this.baseUrl + url;
        return this.http.delete<T>(exportUrl, {
            withCredentials: true,
            headers: this.headers,
        });
    }
}
