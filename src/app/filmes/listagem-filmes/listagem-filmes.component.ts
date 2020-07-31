import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { ConfigParams } from 'src/app/shared/models/config-params';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg';
  config = {
    limite: 8,
    pagina: 1,
  } as ConfigParams;
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(
      private filmesService: FilmesService,
      private fb: FormBuilder,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.generos = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica', 'Romance', 'Terror'];

    this.filtrosListagem.get('texto')
        .valueChanges
        .pipe(debounceTime(400))
        .subscribe((value: string) => {
          this.config.pesquisa = value;

          this.resetarListagem();
        });

    this.filtrosListagem.get('genero')
        .valueChanges
        .subscribe((value: string) => {
          this.config.campo = {type: 'genero', value};

          this.resetarListagem();
        });

    this.listarFilmes();
  }

  open(id: number) {
    this.router.navigateByUrl(`/filmes/${id}`);
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.filmesService.listar(this.config).subscribe((filmes: Filme[]) => this.filmes.push(...filmes));

    this.config.pagina++;
  }

  private resetarListagem(): void {
    this.config.pagina = 1;
    this.filmes = [];

    this.listarFilmes();
  }
}
