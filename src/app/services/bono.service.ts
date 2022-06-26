import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bono } from 'app/models/bono';
import { map, Observable } from 'rxjs';
import { user as userData } from 'app/mock-api/common/user/data';

@Injectable({
    providedIn: 'root'
})
export class BonoService {
    readonly url: string = 'https://extraahorro.azurewebsites.net/bono';
    readonly userID: string = userData.id;
    constructor(private _httpClient: HttpClient) {
    }

    getBonos(): Observable<Bono[]> {
        return this._httpClient.get<Bono[]>(this.url + '/' + this.userID).pipe(
            map((data: any) => data.payload.message
            ));
    }

    saveBono(bono: Bono): Observable<Bono> {
        return this._httpClient.post<Bono>(this.url + '/' + this.userID, bono).pipe(
            map((data: any) => data.payload.message
            ));
    }
}
