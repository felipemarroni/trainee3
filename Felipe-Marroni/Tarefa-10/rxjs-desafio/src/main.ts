import { Subject, takeUntil, catchError, retry, of, timer } from 'rxjs';
import { gps$ } from './streams/gps.stream';
import { pedidos$ } from './streams/pedidos.stream';
import { alertas$ } from './streams/alertas.stream';
import{ logComTimestamp, painelEntregador$,
velocidadeSuspeita$, gpsEnriquecido$, statusCount$, alertaCritico$ } from './operadores/custom.operadores';

const destroy$ = new Subject<void>();

gps$.pipe(takeUntil(destroy$)).subscribe({
  next: (dado) => console.log('[GPS]', dado),
  error: (err) => console.error('[ERRO]', err.message)
});

pedidos$.pipe(
  takeUntil(destroy$),
  retry(3),
  catchError(err => of({ status: 'erro', mensagem: err.message }))
).subscribe(dado => console.log('📦[PEDIDO]', dado));

alertas$.pipe(takeUntil(destroy$),
logComTimestamp('Alerta')).subscribe();

painelEntregador$.pipe(takeUntil(destroy$)).subscribe(painel => {
  console.table(painel); 
});

velocidadeSuspeita$.pipe(takeUntil(destroy$)).subscribe(gps => {
  console.log(`🚀[VELOCIDADE SUSPEITA] Entregador ${gps.entregadorID} : ${gps.velocidade}km/h`);
});

statusCount$.pipe(takeUntil(destroy$)).subscribe(count => {
  console.log('📊[CONTAGEM]', count);
});

alertaCritico$.pipe(takeUntil(destroy$)).subscribe(alerta => {
  console.log(`⚠️[ALERTA CRITICO] ${alerta.tipo} - Severidade: ${alerta.severidade}`);
});

gpsEnriquecido$.pipe(takeUntil(destroy$)).subscribe(enriquecido => {
  console.log(`[REGIÃO] ${enriquecido.regiao}`);
});

timer(30000).subscribe(() => {
  destroy$.next();
  destroy$.complete();
});