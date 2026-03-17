import { merge, filter, map, scan, retry, catchError, of,mergeMap, groupBy } from "rxjs"
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

const gpsEventos$ = gps$.pipe(
  map(gps => ({
    entregadorID: gps.entregadorID,
    tipo: "gps" as const,
    lat: gps.lat,
    lng: gps.lng
  }))
)

const pedidoEventos$ = pedidos$.pipe(
    retry(3),
    catchError(() => of({ status: 'erro', entregadorID: 'SISTEMA' })),
    map(pedido => ({
    entregadorID: pedido.entregadorID,
    tipo: "pedido" as const,
    status: pedido.status
  }))
)

const events$ = merge(gpsEventos$, pedidoEventos$)

export const painelEntregador$ = events$.pipe(
  groupBy(event => event.entregadorID),

  mergeMap(group$ =>
    group$.pipe(
      scan((state, event) => {
        if (event.tipo === "gps") {
          state.ultimaLocalizacao = {
            lat: event.lat,
            lng: event.lng
          }
        }

        if (event.tipo === "pedido") {
          state.ultimoStatus = event.status
        }

        state.ultimaAtualizacao = new Date()

        return state

      }, {
        entregadorID: group$.key,
        ultimaLocalizacao: null as null | { lat: number; lng: number },
        ultimoStatus: null as null | string | undefined,
        ultimaAtualizacao: new Date()
      })
    )
  )
)

const suspeitoEventos$ = velocidadeSuspeita$.pipe(
  map(gps => ({
    tipo: "velocidade" as const,
    entregadorID: gps.entregadorID,
    velocidade: gps.velocidade,
    timestamp: gps.timestamp
  }))
)

const alertasEventos$ = alertas$.pipe(
  filter(alert => alert.severidade === "alta"),
  map(alert => ({
    tipo: "alerta" as const,
    entregadorID: alert.entregadorID,
    mensagem: alert.mensagem,
    severidade: "alta" as const
  }))
)

const emergenciaEventos$ = merge(suspeitoEventos$, alertasEventos$)

export const emergencia$ = emergenciaEventos$.pipe(
  groupBy(event => event.entregadorID),

  mergeMap(group$ =>
    group$.pipe(
      scan((state, event) => {
        state.prontoParaEmitir = false

        if (event.tipo === "velocidade") {
          state.ultimaVelocidadeSuspeita = event.velocidade

          if (state.ultimoAlertaAlto) {
            state.prontoParaEmitir = true
          }
        }

        if (event.tipo === "alerta") {
          state.ultimoAlertaAlto = event.mensagem

          if (state.ultimaVelocidadeSuspeita !== null) {
            state.prontoParaEmitir = true
          }
        }

        state.ultimaAtualizacao = new Date()
        return state
      }, {
        entregadorID: group$.key,
        ultimaVelocidadeSuspeita: null as number | null,
        ultimoAlertaAlto: null as null | string | undefined,
        ultimaAtualizacao: new Date(),
        prontoParaEmitir: false
      }),

      filter(state => state.prontoParaEmitir),

      map(state => ({
        entregadorID: state.entregadorID,
        velocidade: state.ultimaVelocidadeSuspeita!,
        alerta: state.ultimoAlertaAlto!,
        severidade: "alta" as const,
        ultimaAtualizacao: state.ultimaAtualizacao
      }))
    )
  )
)
