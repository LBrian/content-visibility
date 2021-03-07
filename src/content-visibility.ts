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
   * Default inView is true when browsers support CSS content visibility, so
   * no need to initialize IntersectionObserver but just add CSS rules.
   */
  @internalProperty()
  private inView = window.CSS?.supports('content-visibility: auto');

  connectedCallback() {
    super.connectedCallback();

    if (!this.inView) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting &&
              entry.target === this.renderRoot.children[0]
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
      const container = this.renderRoot.children[0];

      container && this.observer.observe(container);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.observer) {
      const container = this.renderRoot.children[0];

      container && this.observer.unobserve(container);
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

type ContentVisibilityProps = HTMLAttributes<HTMLDivElement> & {
  containIntrinsicSize?: string;
  threshold?: number;
};

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'content-visibility': PropsWithChildren<ContentVisibilityProps>;
    }
  }
}

export declare namespace global.JSX {
  interface IntrinsicElements {
    'content-visibility': PropsWithChildren<ContentVisibilityProps>;
  }
}

export declare namespace svelte.JSX {
  interface IntrinsicElements {
    'content-visibility': ContentVisibilityProps;
  }
}
