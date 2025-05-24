// types/locomotive-scroll.d.ts
declare module 'locomotive-scroll' {
  export default class LocomotiveScroll {
    constructor(options?: any);
    update(): void;
    destroy(): void;
    scrollTo(target: string | number | HTMLElement, options?: any): void;
    start(): void;
    stop(): void;
    on(event: string, callback: (obj: any) => void): void;
    off(event: string, callback: (obj: any) => void): void;
  }
}