import { interval, map, share } from "rxjs"

export const gps$ = interval(1000).pipe(
  map(() => ({
    entregadorID: `ENT-${Math.floor(Math.random() * 5) + 1}`,
    lat: -22.90 + Math.random() * 0.1,
    lng: -43.20 + Math.random() * 0.1,
    velocidade: Math.floor(Math.random() * 151), // 0–150
    timestamp: new Date()
  })),
  share()
)