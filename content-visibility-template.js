import 'intersection-observer';
import '@ungap/custom-elements';
/**
 *
 * @author Brian YP Liu
 * @copyright 2021 Brian YP Liu
 *
 * ContentVisibilityTemplate, a simple webcomponent extends the built-in
 * HTMLTemplateElement to convey document fragment and render until it appears
 * on the browser viewport (Intersection Observer) to provide truely lazy load
 *
 * Currently, the <content-visibility> webcomponent only support lazy loading on
 * Chrome, Edge, Opera but not Safari and Firefox, thank you to the CSS
 * content-visibility property.
 *
 */
export class ContentVisibilityTemplate extends HTMLTemplateElement {
    constructor() {
        super();
        this.inView = false;
        this.placeholder = document.createElement('div');
        this.placeholder.setAttribute('style', `height: ${this.containIntrinsicSize};`);
    }
    /**
     * @property {string} threshold - Intersection Observer threshold (0~1), see
     * (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
     * @default [0]
     */
    get threshold() {
        var _a;
        const threshold = parseFloat((_a = this.getAttribute('threshold')) !== null && _a !== void 0 ? _a : '0');
        return isNaN(threshold) ? 0 : threshold;
    }
    /**
     * @property {string} containIntrinsicSize - <div> placholder height to take
     * up space before rendering to avoid content jumping, same concept as CSS
     * contain-intrinsic-size, see
     * https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size
     * @default [600px]
     */
    get containIntrinsicSize() {
        var _a;
        return (_a = this.getAttribute('containIntrinsicSize')) !== null && _a !== void 0 ? _a : '600px';
    }
    connectedCallback() {
        this.insertAdjacentElement('beforebegin', this.placeholder);
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target === this.placeholder) {
                    if (!this.inView) {
                        this.inView = true;
                        this.placeholder.remove();
                        if (this.innerHTML) {
                            this.insertAdjacentHTML('beforebegin', this.innerHTML);
                        }
                        else if (this.firstElementChild) {
                            this.before(this.firstElementChild);
                        }
                    }
                }
            });
        }, { threshold: this.threshold });
        this.observer.observe(this.placeholder);
    }
    disconnectedCallback() {
        if (this.observer) {
            this.observer.unobserve(this.placeholder);
            this.observer.disconnect();
        }
    }
}
customElements.define('content-visibility-template', ContentVisibilityTemplate, {
    extends: 'template',
});
//# sourceMappingURL=content-visibility-template.js.map