import { Subject, takeUntil, catchError, retry, of, timer } from 'rxjs';
import { gps$ } from './streams/gps.stream';
import { pedidos$ } from './streams/pedidos.stream';
import { alertas$ } from './streams/alertas.stream';
import{ painelEntregador$,
velocidadeSuspeita$, gpsEnriquecido$, statusCount$, alertaCritico$, emergencia$ } from './utils/simulador';
import { logComTimestamp } from './operadores/custom.operadores'

const destroy$ = new Subject<void>();

console.log("🚀 Iniciando simulador...\n")

gps$
  .pipe(takeUntil(destroy$))
  .subscribe({
    next: data => console.log("📍 GPS:", data),
    complete: () => console.log("GPS finalizado")
  })

pedidos$
  .pipe(
  takeUntil(destroy$),
  retry(3),
  catchError(err => of({ status: 'erro', mensagem: err.message })))
  .subscribe({
    next: data => console.log("📦 PEDIDO:", data),
    complete: () => console.log("Pedidos finalizados")
  })

alertas$
  .pipe(
    takeUntil(destroy$),
    logComTimestamp('ALERTA')
  ).subscribe({
    next: data => console.log("⚠️ ALERTA:", data),
    complete: () => console.log("Alertas finalizados")
  })

velocidadeSuspeita$
  .pipe(takeUntil(destroy$))
  .subscribe({
    next: data => console.log("🚨 VELOCIDADE SUSPEITA:", data),
    complete: () => console.log("Velocidade suspeita finalizada")
  })

painelEntregador$
  .pipe(takeUntil(destroy$))
  .subscribe({
    next: data => console.log("👤 PAINEL DE ENTREGADOR:", data),
    complete: () => console.log("Driver state finalizado")
  })

emergencia$
  .pipe(
    takeUntil(destroy$),
    logComTimestamp('EMERGENCIA')
  ).subscribe()

gpsEnriquecido$
  .pipe(takeUntil(destroy$))
  .subscribe({
    next: data => console.log("📍+ GPS ENRIQUECIDO:", data),
    complete: () => console.log("GPS enriquecido finalizado")
  })

statusCount$
  .pipe(takeUntil(destroy$))
  .subscribe({
    next: data => console.log("CONTAGEM DE STATUS:", data),
    complete: () => console.log("Contagem de status finalizada")
  })

alertaCritico$
  .pipe(takeUntil(destroy$))
  .subscribe({
    next: data => console.log("⚠️⚠️⚠️ ALERTA CRITICO:", data),
    complete: () => console.log("Dashboard de emergência finalizado")
  })

// Encerra tudo após 30 segundos
setTimeout(() => {
  console.log("\n🛑 Encerrando simulador...")

  destroy$.next()
  destroy$.complete()
}, 30000)