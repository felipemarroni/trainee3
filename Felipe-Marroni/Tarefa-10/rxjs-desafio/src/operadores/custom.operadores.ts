import { tap, MonoTypeOperatorFunction } from "rxjs"

export function logComTimestamp<T>(prefixo: string): MonoTypeOperatorFunction<T> {
  return tap(valor => {
    const hoje = new Date().toLocaleTimeString(); 
    console.log(`[${hoje}] [${prefixo.toUpperCase()}]`, valor);
  });
}