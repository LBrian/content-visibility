# content-visibility <img src="./images/webcomponent_192x192.png" alt="Chrome" widht="20" height="20">

![npm 7.0.15](https://img.shields.io/badge/npm-7.0.15-blue)
![Typescript](https://img.shields.io/badge/typescript-4.1.3-blue)
![Lit-Element](https://img.shields.io/badge/LitElement-2.3.1-blue)

`<content-visibility>` is a simple **web component** encapsulates modern CSS properties `content-visibility` and Web API **Intersection Observer API** to provide cross-browsers solution to skip rendering (layout & painting) elements until it is needed (appears on the viewport) to boosts page performance.

<sup>CSS `content-visibility` is only supported on Chrome 85+, Chrome Android 85+ and Opera 71+ but not Firefox, Safari and IE unfortunately, see [web.dev](https://web.dev/content-visibility/). **Intersection Observer API** supports pretty much all browsers except **IE**, thus an intersection observer [polyfill](https://www.npmjs.com/package/intersection-observer) is included for compatible on IE.</sup>

Basically, all children inside it will only be renderred after it appears on viewport.

```html
<content-visibility>
  {children will not be rendered when outside the first viewport}
</content-visibility>
```

## Compatibility

<table>
  <tr>
    <td valign="top"><img src="./images/chrome_128x128.png" alt="Chrome" widht="30" height="30"></td>
    <td valign="top"><img src="./images/safari_128x128.png" alt="Safari" widht="30" height="30"></td>
    <td valign="top"><img src="./images/edge_128x128.png" alt="Edge" widht="30" height="30"></td>
    <td valign="top"><img src="./images/internet-explorer_128x128.png" alt="IE" widht="30" height="30"></td>
    <td valign="top"><img src="./images/firefox_128x128.png" alt="Firefox" widht="30" height="30"></td>
    <td valign="top"><img src="./images/opera_128x128.png" alt="Opera" widht="30" height="30"></td>
  </tr>
</table>

# Getting started

## Install

`npm i content-visibility --save`

## Use in JSX (React/Preact)

```jsx
import 'content-visibility';

const Content = () => {
  return (
    <content-visibility>
      <Section>...</Section>
      <Section>...</Section>
      <Section>...</Section>
    </content-visibility>
  );
};
```

## properties

### `containIntrinsicSize`

This is will be set as CSS custom variable for `contain-intrinsic-size` if browsers support it. [see](https://web.dev/content-visibility/#specifying-the-natural-size-of-an-element-with-contain-intrinsic-size)

```html
<content-visibility containIntrinsicSize="600px">
  {children}
</content-visibility>
```

# Performance results

## Rendering frames

**Safari** comes with `Rendering Frames Timeline` tool helps to measure rendering performance. Let's have a look the rendering frames **without** `<content-visibility>`, total `97` rendering frames happened on the first view.
![Rendering Frames - no content-visibility](./images/no-content-visibility.gif?raw=true)

Only `47` rendering frames happened on the first view after integrated with `<content-visibility>`
![Rendering Frames - content-visibility](./images/content-visibility-frames.gif?raw=true)
the rest of `50` rendering frames happened when **scorlling to the viewport**
![Rendering Frames - content-visibility scroll](./images/content-visibility-frames-2.gif?raw=true)

## Rendering & Layout time

Generally speaking, we can plausibly say rendering & layout time improved around `40%`, however benchmark results vary depends on sampling size, environments, tools, implementation and etc. Too many factors could impact benchmark results, so this is just a quick sample results to demonstrate the performance differences.

### Chrome 87.0.4280.141

CSS `content-visibility` and `contain-intrinsic-size`

#### Before

![Chrome Before](./images/chrome-before.png?raw=true)

#### After

**Rendering** and **Painting** time reduced around `50%`.

![Chrome After](./images/chrome-after.png?raw=true)

### Firefox 84.0.2

#### Before

![Firefox Before](./images/firefox-before.png?raw=true)

#### After

![Firefox After](./images/firefox-after.png?raw=true)

# License

Copyright (c) 2021 [Brian YP Liu](https://brianypliu.com/)
