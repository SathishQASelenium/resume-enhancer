// pdf-parse@1.1.1's own index.js has a debug guard that misfires under
// ESM/bundler interop (see src/lib/parser/extract.ts), so the app imports the
// lib entry directly. @types/pdf-parse only covers the package root, so this
// mirrors that declaration for the subpath.
declare module "pdf-parse/lib/pdf-parse.js" {
  import PdfParse = require("pdf-parse");
  export = PdfParse;
}
