This directory contains a HTML file primarily for development. By running `npm run dev`, it will launch `npm run build:watch` and `npm run serve` concurrently in order to generate builds at the root folder and starting dev server respectively. Once dev server is ready, connect http://localhost:8000/dev to fetch this HTML document with `content-visibility.js` included for developing.

```
<meta charset="utf-8">
<title>&lt;content-visibility> Demo</title>
<script type="module" src="../content-visibility.js"></script>
```
