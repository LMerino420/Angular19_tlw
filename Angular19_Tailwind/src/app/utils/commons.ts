import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Commons {
  private _url = environment.API_URI;

  constructor(private http: HttpClient) {}

  // ?--------------------------------------
  // ?HTTP
  // ?--------------------------------------

  //* Selector de request
  httpRequest(
    type: string,
    endPoint: string,
    params: any = null,
    isAuth: boolean = false
  ) {
    const _apiUrl = `${this._url}/${endPoint}`;
    switch (type) {
      case 'GET':
        this.getReq(endPoint);
        break;
      case 'POST':
        this.postReq(endPoint, params, isAuth);
        break;
      // case 'PUT':
      //     return this.http.put(_apiUrl, params);
      // case 'DELETE':
      //     return this.http.delete(_apiUrl, { params });
      default:
        throw new Error('Invalid HTTP request type');
    }
  }

  //* Manejo de errores HTTP
  handleError(error: HttpErrorResponse) {
    console.error('[HTTP Error]', error);
    if (error.status === 0) {
      console.error(
        'No se pudo establecer conexion con el servidor: ' + error.message
      );
      //   this.showAlert(
      //     'No se pudo establecer conexion con el servidor: ' + error.message,
      //     'ERROR'
      //   );
    } else {
      if (error.error != undefined && error.error.object != undefined) {
        console.error(
          'Error con la respuesta del servidor: ' + error.error.object
        );
        // this.showAlert(error.error.object, 'Error!');
      }
    }
    return throwError(
      () =>
        new Error(
          'Algo a salido mal; intente mas tarde.' + JSON.stringify(error.error)
        )
    );
  }

  //* GET
  getReq(endPoint: string) {
    return this.http.get(endPoint).pipe(
      tap((rs) => {
        return rs;
      }),
      catchError((err, caught) => {
        console.log('ERROR', err);
        console.log('CAUGHT', caught);
        return this.handleError(err);
      })
    );
  }

  //* POST
  postReq(endPoint: string, params: any, isAuth: boolean) {
    let header: any = '';
    let headers: any = null;
    if (isAuth) {
      const token = '';
      header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      headers = new HttpHeaders({ Authorization: header });
    }

    return this.http.post(endPoint, params, headers).pipe(
      tap((rs) => {
        return rs;
      }),
      catchError((err, caught) => {
        console.log('ERROR', err);
        console.log('CAUGHT', caught);
        return this.handleError(err);
      })
    );
  }
}
