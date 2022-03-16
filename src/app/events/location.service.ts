import { Injectable } from '@angular/core';
import { SSLocation } from './location.model';
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get<{locations: SSLocation[]}>(environment.apiUrl + 'locations')
  }
}
