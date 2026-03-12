import { timer, switchMap, map, of } from "rxjs"

const tiposAlerta = ["atraso", "veiculo_parado", "rota_desviada"] as const
const severidades = ["baixa", "media", "alta"] as const
const mensagens = ["Pedido atrasado", "Veiculo parado", "Rota desviada"]

function randomIntervalo(min = 3000, max = 8000) {
    return Math.floor(Math.random() * (max - min)) + min
}

export const alertas$ = of(null).pipe(
    switchMap(() => {
        return timer(randomIntervalo())
    }),
    map(() => {
        return {tipo: tiposAlerta[Math.floor(Math.random() * tiposAlerta.length)],
        severidade: severidades[Math.floor(Math.random() * severidades.length)],
        entregadorID: `ENT-${Math.floor(Math.random() * 5) + 1}`,
        mensagem: mensagens[Math.floor(Math.random() * mensagens.length)]}
      })
    )