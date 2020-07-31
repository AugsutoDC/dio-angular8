import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg';
  filme: Filme;

  constructor(
      private filmesService: FilmesService,
      private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.obterFlme(this.activatedRoute.snapshot.params['id']);
  }

  obterFlme(id: number): void {
    this.filmesService.visualizar(id).subscribe((filme: Filme) => this.filme = filme);
  }

}
