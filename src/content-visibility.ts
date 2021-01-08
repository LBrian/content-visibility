import 'intersection-observer';
import { HTMLAttributes, PropsWithChildren } from 'react';
import {
  css,
  html,
  property,
  LitElement,
  customElement,
  PropertyValues,
  internalProperty,
} from 'lit-element';

/**
 * content-visibility, a web component leverages CSS content-visibility and the
 * Intersection Observer API to provide cross browsers content-visibility solution.
 */
@customElement('content-visibility')
export class ContentVisibility extends LitElement {
  private observer?: IntersectionObserver;

  /**
   * Component scope styles
   * Note: @supports features query is not supported on IE
   */
  static styles = css`
    @supports (content-visibility: auto) {
      .content-visibility {
        content-visibility: auto;
      }
    }
    @supports (contain-intrinsic-size: 0) and
      (not (--contain-intrinsic-size: 0)) {
      .content-visibility {
        contain-intrinsic-size: 0;
      }
    }
    @supports (--contain-intrinsic-size: 0) and (contain-intrinsic-size: 0) {
      .content-visibility {
        contain-intrinsic-size: var(--contain-intrinsic-size, 0);
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
   * Intersection Observer API option threshold. Since content-visibility only
   * triggers once, thus no use cases will need to provide array of threshold.
   * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   */
  @property({ type: Number })
  threshold = 0;

  /**
   * inView will only be set once to trigger component update
   */
  @internalProperty()
  private inView = window.CSS?.supports('content-visibility: auto');

  connectedCallback() {
    super.connectedCallback();

    // CSS.supports method is not supported on IE and restricted syntax on Edge
    if (!window.CSS?.supports('content-visibility: auto')) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting &&
              entry.target === this.renderRoot.children[0] &&
              !this.inView
            ) {
              this.inView = true;
            }
          });
        },
        { threshold: this.threshold }
      );
    }
  }

  /**
   * @param changedProperties
   */
  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    if (this.observer) {
      this.observer.observe(this.renderRoot.children[0]);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.observer) {
      this.observer.unobserve(this.renderRoot.children[0]);
      this.observer.disconnect();
    }
  }

  render() {
    return html`<div
      class="content-visibility"
      style="${this.containIntrinsicSize &&
      window.CSS?.supports('--contain-intrinsic-size: 0')
        ? `--contain-intrinsic-size: ${this.containIntrinsicSize}`
        : !this.inView
        ? `height: ${this.containIntrinsicSize || 0}`
        : ''}"
    >
      ${this.inView ? html`<slot></slot>` : ''}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'content-visibility': ContentVisibility;
  }
  // React/Preact IntrinsicElements types
  namespace JSX {
    interface IntrinsicElements {
      'content-visibility': HTMLAttributes<HTMLDivElement> &
        PropsWithChildren<{
          containIntrinsicSize?: string;
          threshold?: number;
        }>;
    }
  }
}
