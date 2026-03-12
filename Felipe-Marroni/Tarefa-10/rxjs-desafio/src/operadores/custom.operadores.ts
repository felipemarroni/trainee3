import { merge, filter, map, scan, retry, catchError, of, tap, mergeMap, MonoTypeOperatorFunction } from "rxjs"
import { gps$ } from "../streams/gps.stream"
import { pedidos$ } from "../streams/pedidos.stream"
import { alertas$ } from "../streams/alertas.stream"

export const velocidadeSuspeita$ = gps$.pipe(
  filter(gps => gps.velocidade > 60)
)

export const statusCount$ = pedidos$.pipe(
    retry(3),
    catchError(() => of({ status: 'falhou' })),
    scan((acc, pedido) => {
        if(!pedido.status) return acc
        acc[pedido.status as keyof typeof acc] = (acc[pedido.status as keyof typeof acc] || 0) + 1
        return acc
  }, {
    coletado: 0,
    em_rota: 0,
    entregue: 0,
    falhou: 0
  })
)

export const alertaCritico$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta' || alerta.severidade === 'media')
);

export const gpsEnriquecido$ = gps$.pipe(
  map(gps => ({
    ...gps, 
    regiao: gps.lat > 0 ? 'Norte' : 'Sul'
  }))
);

type statusEntregador = { [id: string]: any };

const gpsEventos$ = gps$.pipe(
  map(gps => ({
    entregadorID: gps.entregadorID,
    tipo: "gps",
    dado: gps
  }))
)

const pedidoEventos$ = pedidos$.pipe(
    retry(3),
    catchError(() => of({ status: 'falhou', entregadorID: 'SISTEMA' })),
    map(pedido => ({
    entregadorID: pedido.entregadorID,
    tipo: "pedido",
    dado: pedido
  }))
)

const events$ = merge(gpsEventos$, pedidoEventos$)

export const painelEntregador$ = events$.pipe(
    scan((acc:statusEntregador, curr:any) => {

    const entregador = curr.entregadorId; 
    const novo = { ...acc }


    const antigo = { ...novo[entregador] }

        if (curr.tipo === "gps") {
            antigo.ultimaLocalizacao = {
                lat: curr.lat,
                lng: curr.lng
        }
        }

        if (curr.tipo === "pedido") {
            antigo.ultimoStatus = curr.status
        }

        antigo.ultimaAtualizacao = new Date()

        novo[entregador] = antigo

        return novo

    }, {}),

    mergeMap(novo => Object.values(novo))
)

export function logComTimestamp<T>(prefixo: string): MonoTypeOperatorFunction<T> {
  return tap(valor => {
    const hoje = new Date().toLocaleTimeString(); 
    console.log(`[${hoje}] [${prefixo.toUpperCase()}]`, valor);
  });
}