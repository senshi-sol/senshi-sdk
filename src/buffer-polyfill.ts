import { Buffer as BufferPolyfill } from 'buffer';

if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  (window as any).Buffer = BufferPolyfill;
}

const BufferExport = typeof window === 'undefined' ? global.Buffer : BufferPolyfill;

export { BufferExport as Buffer };