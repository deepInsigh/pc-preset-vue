declare const __TAGS__: string;
declare const __BUILDDATE__: Date;
declare const __BRANCH__: string;
declare const __COMMIT__: string;

declare type Nullable<T> = T | null | undefined;

declare global {
  interface Window {
    MonacoEnvironment?: monaco.Environment | undefined;
  }
}
