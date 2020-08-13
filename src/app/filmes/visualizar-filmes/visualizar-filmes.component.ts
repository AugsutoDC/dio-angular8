import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Filme } from 'src/app/shared/models/filme';
import { Alerta } from 'src/app/shared/models/alerta';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg';
  filme: Filme;
  id: number;

  constructor(
      private router: Router,
      public dialog: MatDialog,
      private filmesService: FilmesService,
      private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.obterFlme();
  }

  editar() {
    this.router.navigateByUrl('filmes/cadastro/' + this.id);
  }

  excluir() {
    const config = {
      data: {
        titulo: 'Excluir registro',
        descricao: 'Você tem certeza de que deseja excluir este registro?',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuiBtnFechar: true
      } as Alerta
    }

    const dialogRef = this.dialog.open(AlertaComponent, config);

    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmesService.excluir(this.id)
                        .subscribe(() =>  this.router.navigateByUrl('filmes'));
      }
    })
  }

  private obterFlme(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }
}
