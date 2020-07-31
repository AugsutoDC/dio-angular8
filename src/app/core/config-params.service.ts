import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {
    let params = new HttpParams();

    if (config.pagina) {
      params = params.append('_page', config.pagina.toString());
    }

    if (config.limite) {
      params = params.append('_limit', config.limite.toString());
    }

    if (config.pesquisa) {
      params = params.append('q', config.pesquisa);
    }

    if (config.campo) {
      params = params.append(config.campo.type, config.campo.value.toString());
    }

    const _sort = config.sort || 'id';
    const _order = config.order || 'desc';

    params = params.append('_sort', _sort.toString());

    params = params.append('_order', _order.toString());


    return params;
  }
}
