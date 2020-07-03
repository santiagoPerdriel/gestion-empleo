import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Candidato } from 'src/app/model/Candidato.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Router } from '@angular/router';

@Injectable()
export class CandidatoService {

  private urlEndPoint:string = environment.endpoints.backend+"/api/candidate";

  constructor(private http: HttpClient,private router: Router) { }

  getClientes() {

    const url = environment.endpoints.backend+"/api/candidate";

    return this.http.get(url);
}

delete(idCan) {

  const url = environment.endpoints.backend+"/api/candidate";

  return this.http.delete(`${this.urlEndPoint}/${idCan}`);
}

createCandidato(candidato):Observable<Candidato>  {

  const url = environment.endpoints.backend+"/api/candidate";

  return this.http.post(url,candidato)
  .pipe(
    map((response: any) => response.cliente as Candidato),
    catchError(e => {
      if (e.status == 400) {
        return throwError(e);
      }
      if (e.error.mensaje) {
        console.error(e.error.mensaje);
      }
      return throwError(e);
    }));
}

getCandidato(id): Observable<Candidato> {
 

  return this.http.get<Candidato>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      if (e.status != 401 && e.error.mensaje) {
        this.router.navigate(['/candidatos']);
        console.error(e.error.mensaje);
      }

      return throwError(e);
    }));
}

pushFileToStoragePortada2(
  file: File,
  idCandidato: number
): Observable<String> {
  const data: FormData = new FormData();
  data.append("file", file);
  let url = `${this.urlEndPoint}/file/${idCandidato} `;
  // return this.http.post(url, data)

  return this.http.post<String>(url, data);
}

getPDFtemplate(
  idCandidato: number
) {
  let url = `${this.urlEndPoint}/file/${idCandidato} `
  console.log(url);
  const httpOptions = {
    // 'responseType'  : 'arraybuffer' as 'application/pdf'
    responseType: "blob" as "json", //This also worked
  };

  return this.http.get<any>(url,httpOptions);
}

}
