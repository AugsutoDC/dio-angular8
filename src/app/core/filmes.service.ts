import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Filme } from '../shared/models/filme';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  listar(pagina: number, qtdPagina: number): Observable<Filme[]> {
    let params = new HttpParams();
    params = params.append('_page', pagina.toString());
    params = params.append('_limit', qtdPagina.toString());

    return this.http.get<Filme[]>(url, {params: params});
  }
}
