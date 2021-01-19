import { ContentVisibility } from '../content-visibility.js';
import { assert, fixture, html } from '@open-wc/testing';

suite('content-visibility', () => {
  test('is defined', () => {
    assert.instanceOf(
      document.createElement('content-visibility'),
      ContentVisibility
    );
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<content-visibility></content-visibility>`);
    assert.shadowDom.equal(
      el,
      `
      <div style="" class="content-visibility">
        <slot></slot>
      </div>
    `
    );
  });

  test('renders with contain-intrinsic-size', async () => {
    const el = await fixture(
      html`<content-visibility
        containIntrinsicSize="500px"
      ></content-visibility>`
    );

    assert.shadowDom.equal(
      el,
      `
      <div style="--contain-intrinsic-size: 500px" class="content-visibility">
        <slot></slot>
      </div>
    `
    );
    assert.equal(
      el.shadowRoot?.children[0].getBoundingClientRect().height,
      500
    );
  });
});
