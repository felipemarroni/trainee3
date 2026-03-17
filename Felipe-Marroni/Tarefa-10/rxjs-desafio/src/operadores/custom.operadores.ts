import { tap, MonoTypeOperatorFunction } from "rxjs"

export function logComTimestamp<T>(prefixo: string): MonoTypeOperatorFunction<T> {
  return tap(valor => {
    const agora = new Date().toLocaleTimeString(); 
    console.log(`[${agora}] [${prefixo.toUpperCase()}]`, valor);
  });
}