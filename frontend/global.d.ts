declare module '*.css' {
  const className: { [key: string]: string };
  export default className;
}

declare module "*.png" {
  const src: string
  export default src
}