import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  get(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`);
  }

  post(url: string, body: Object) {
    return this.http.post(`${this.baseUrl}/${url}`, body, this.getHttpOptions());
  }
}
