import { VNode } from "../vnode/VNode";
import { render } from "./render";

export function mountChildren(children: VNode['children'], container: HTMLElement) {
    if (children == null) return;

    const childList = Array.isArray(children) ? children : [children];

    childList.forEach((child) => {
        if (typeof child === 'string') {
            container.appendChild(document.createTextNode(child));
        } else {
            render(child, container);
        }
    });
}