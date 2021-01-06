import {ContentVisibility} from '../content-visibility.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('content-visibility', () => {
  test('is defined', () => {
    const el = document.createElement('content-visibility');
    assert.instanceOf(el, ContentVisibility);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<content-visibility></content-visibility>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(
      html`<content-visibility name="Test"></content-visibility>`
    );
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(
      html`<content-visibility></content-visibility>`
    )) as ContentVisibility;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });
});
