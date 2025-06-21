// types/pica.d.ts
declare module "pica" {
  interface PicaResizeOptions {
    unsharpAmount?: number;
    unsharpRadius?: number;
    unsharpThreshold?: number;
    transferable?: boolean;
  }

  interface Pica {
    resize(
      from: HTMLCanvasElement | HTMLImageElement,
      to: HTMLCanvasElement,
      options?: PicaResizeOptions
    ): Promise<HTMLCanvasElement>;

    toBlob(
      canvas: HTMLCanvasElement,
      mimeType?: string,
      quality?: number
    ): Promise<Blob>;
  }

  const pica: () => Pica;

  export default pica;
}
