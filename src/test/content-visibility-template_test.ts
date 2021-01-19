import '../content-visibility-template.js';
import { expect, fixture, html } from '@open-wc/testing';

suite('content-visibility-template', () => {
  test('render default placeholer when outside broswer viewport', async () => {
    const el = await fixture(
      html`<div style="height: 1000px;">viewport placeholder</div>
        <template is="content-visibility-template"
          ><div>test content</div></template
        >`
    );

    expect(el.nextElementSibling).dom.to.be.equal(
      `<div style="height: 600px;"></div>`
    );
  });

  test('render custom placeholer when outside broswer viewport', async () => {
    const el = await fixture(
      html`<div style="height: 1000px;">viewport placeholder</div>
        <template is="content-visibility-template" containIntrinsicSize="800px"
          ><div>test content</div></template
        >`
    );

    expect(el.nextElementSibling).dom.to.be.equal(
      `<div style="height: 800px;"></div>`
    );
  });
});
