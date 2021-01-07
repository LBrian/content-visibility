---
layout: page.11ty.cjs
title: <content-visibility> ⌲ Home
---

# &lt;content-visibility>

`<content-visibility>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<content-visibility>` is just an HTML element. You can it anywhere you can use HTML!

```html
<content-visibility></content-visibility>
```

  </div>
  <div>

<content-visibility></content-visibility>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<content-visibility>` can be configured with attributed in plain HTML.

```html
<content-visibility name="HTML"></content-visibility>
```

  </div>
  <div>

<content-visibility name="HTML"></content-visibility>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<content-visibility>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import { html, render } from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;content-visibility&gt;</h2>
    <content-visibility .name=${name}></content-visibility>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;content-visibility&gt;</h2>
<content-visibility name="lit-html"></content-visibility>

  </div>
</section>
