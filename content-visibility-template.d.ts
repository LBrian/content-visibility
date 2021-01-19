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
export declare class ContentVisibilityTemplate extends HTMLTemplateElement {
    private observer?;
    private inView;
    private placeholder;
    /**
     * @property {string} threshold - Intersection Observer threshold (0~1), see
     * (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
     * @default [0]
     */
    get threshold(): number;
    /**
     * @property {string} containIntrinsicSize - <div> placholder height to take
     * up space before rendering to avoid content jumping, same concept as CSS
     * contain-intrinsic-size, see
     * https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size
     * @default [600px]
     */
    get containIntrinsicSize(): string;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
//# sourceMappingURL=content-visibility-template.d.ts.map