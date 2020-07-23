import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import {
  IReqLocations,
  IResLocations,
  IResLocation,
} from './location.interface';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(protected http: HttpClient) {}

  locations(request: IReqLocations, params: any): Observable<IResLocations> {
    const url = environment.api + '/location/';
    const httpParams = {
      params: new HttpParams()
        .set('page', params ? params.pageIndex + 1 : 1)
        .set('name', request && request.name ? request.name : '')
        .set('type', request && request.type ? request.type : '')
        .set(
          'dimension',
          request && request.dimension ? request.dimension : ''
        ),
    };

    return this.http.get<IResLocations>(url, httpParams);
  }

  location(locationId: number): Observable<IResLocation> {
    const url = environment.api + `/location/${locationId}`;
    return this.http.get<IResLocation>(url);
  }
}
