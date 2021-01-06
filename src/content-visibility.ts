import 'intersection-observer';
import {
  css,
  html,
  property,
  LitElement,
  customElement,
  PropertyValues,
} from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('content-visibility')
export class ContentVisibility extends LitElement {
  private observer?: IntersectionObserver;

  static styles = css`
    @supports (content-visibility: auto) {
      .content-visibility {
        content-visibility: auto;
      }
    }
    @supports (contain-intrinsic-size: 500px) {
      .content-visibility {
        contain-intrinsic-size: var(--contain-intrinsic-size, 500px);
      }
    }
  `;

  /**
   * CSS contain-intrinsic-size
   * https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size
   */
  @property({ type: String })
  containIntrinsicSize = '';

  /**
   *
   */
  connectedCallback() {
    super.connectedCallback();
    if (!window.CSS?.supports('content-visibility: auto')) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          console.log(entry.isIntersecting);
        });
      }, {});
    }
  }

  /**
   *
   */
  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    if (this.observer) {
      const root = this.shadowRoot?.querySelector('.content-visibility');

      root && this.observer.observe(root);
    }
  }

  /**
   *
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.observer) {
      const root = this.shadowRoot?.querySelector('.content-visibility');

      root && this.observer.unobserve(root);
      this.observer.disconnect();
    }
  }

  render() {
    return html`<div
      class="content-visibility"
      style="${this.containIntrinsicSize
        ? `--contain-intrinsic-size: ${this.containIntrinsicSize}`
        : ''}"
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'content-visibility': ContentVisibility;
  }
}
