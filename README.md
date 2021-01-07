# content-visibility

`<content-visibility></content-visibility>` is a simple web component encapsulates modern CSS properties `content-visibility` and `contain-intrinsic-size` and Web API **Intersection Observer API** to provide cross-browsers support ability to prevent `children` rendering when outside viewport which boosts page performance.

CSS `content-visibility` is supported on Chrome 85+, Chrome Android 85+ and Opera 71+ but not Firefox, Safari and IE unfortunately, for more details see [Google web.dev](https://web.dev/content-visibility/)

**Intersection Observer API** supports pretty much all browsers except **IE**, thus an intersection observer polyfill is included. [IntersectionObserver polyfill](https://www.npmjs.com/package/intersection-observer)

# What it does

Basically, all children inside `<content-visibility>...</<content-visibility>` will only be renderred when it appears on viewport.

# Performance comparison

Overall `40%~50%` rendering time reduced on the three major desktop browsers from our testing.

## Chrome 87.0.4280.141

CSS `content-visibility` and `contain-intrinsic-size`

### Before

![Chrome Before](./images/chrome-before.png?raw=true)

### After

**Rendering** and **Painting** time reduced around `50%`
![Chrome After](./images/chrome-after.png?raw=true)

## Safari 14.0.1

### Before

![Safari Before](./images/safari-before.png?raw=true)

### After

![Safari After](./images/safari-after.png?raw=true)

## Firefox 84.0.2

### Before

![Firefox Before](./images/firefox-before.png?raw=true)

### After

![Firefox After](./images/firefox-after.png?raw=true)

# Getting started

## Install

`npm i content-visibility --save`

## Use in JSX (React/Preact)

```
import 'content-visibility';

const Content = () => {
  return <content-visibility>
            <Section>...</Section>
            <Section>...</Section>
            <Section>...</Section>
         </content-visibility>
}
```

### `containIntrinsicSize`

This is will be set as CSS custom variable for `contain-intrinsic-size` if browsers support it. [see](https://web.dev/content-visibility/#specifying-the-natural-size-of-an-element-with-contain-intrinsic-size)

# License

Copyright (c) 2021 [Brian YP Liu](https://brianypliu.com/)
