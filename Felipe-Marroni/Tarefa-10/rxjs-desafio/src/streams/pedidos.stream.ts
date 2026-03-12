import { interval, mergeMap, of, share, throwError } from "rxjs"

const statuses: ("coletado" | "em_rota" | "entregue" | "falhou")[] = ["coletado", "em_rota", "entregue", "falhou"]

export const pedidos$ = interval(2000).pipe(
  mergeMap(() => {
    if (Math.random() < 0.1) {
        return throwError(() => new Error("Falha na comunicação com o servidor"))
    }

    return of({
        pedidoId: `${Math.floor(Math.random() * 500) + 1}`,
        entregadorID: `ENT-${Math.floor(Math.random() * 5) + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        timestamp: new Date()
    })
  }),
  share()
)