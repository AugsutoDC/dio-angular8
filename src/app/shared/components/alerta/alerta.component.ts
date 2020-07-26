import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  alerta = {
    titulo: 'Sucesso!',
    descricao: 'Seu registro foi salvo com sucesso.',
    btnSucesso: 'Ok',
    btnCancelar: 'Cancelar',
    corBtnSucesso: 'accent',
    corBtnCancelar: 'warn',
    possuiBtnFechar: false
  } as Alerta;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    if (this.data) {
      for (let key in this.alerta) {
        this.alerta[key] = this.data[key] || this.alerta[key];
      }
    }
  }
}
