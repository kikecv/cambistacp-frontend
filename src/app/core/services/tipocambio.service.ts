import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Tipocambio } from '../models/tipocambio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipocambioService {

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  getAllTipoCambioDiario(page: number,size:number) {
    return this.http.get<any>(`${environment.url_api}/tipocambio/page/${page}/${size}`)
  }

  getTipoCambio(id: number) {
    return this.http.get<Tipocambio>(`${environment.url_api}/tipocambio/${id}`).
      pipe(
        catchError(e => {
          this.router.navigate(['/admin/tipocambiodiario'])
          console.log(e.error.mensaje)
          Swal.fire('Error al obtener tipo de cambio', e.error.mensaje, 'error')
          return throwError(e)
        })
      )
  }

  createTipoCambioDiario(tipocambio: Tipocambio) {
    return this.http.post<any>(`${environment.url_api}/tipocambio`, tipocambio).
      pipe(

        catchError(e => {
          
          if(e.status==400){
            return throwError(e)
          }

          console.error(e.error.mensaje)
          Swal.fire('Error al crear tipo de cambio', e.error.mensaje, 'error')
          return throwError(e)
        }

        )
      )
  }

  updateTipoCambioDiario(id: number, changes: Partial<Tipocambio>) {
    return this.http.put<any>(`http://localhost:8080/api/tipocambio/${id}`, changes).
      pipe(
        catchError(e => {
          if(e.status==400){
            return throwError(e)
          }

          console.error(e.error.mensaje)
          Swal.fire('Error al editar tipo de cambio', e.error.mensaje, 'error')
          return throwError(e)
        }

        )
      )
  }

}
