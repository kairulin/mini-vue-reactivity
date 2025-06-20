// render.ts

import { VNode, Fragment } from '../vnode/VNode';
import { mountChildren } from './mountChildren';



export function render(vnode: VNode, container: HTMLElement) {
	// Fragment 處理
	if (vnode.tag === Fragment) {
		mountChildren(vnode.children, container);
		return;
	}

	// Component 處理（函式型）
	if (typeof vnode.tag === 'function') {
		const subVNode = vnode.tag(vnode.props || {});
		render(subVNode, container);
		return;
	}

	// 一般 HTML 元素
	const el = document.createElement(vnode.tag);

	// props 處理
	if (vnode.props) {
		for (const key in vnode.props) {
			const value = vnode.props[key];
			if (key.startsWith('on')) {
				// ex: onClick -> click
				const event = key.slice(2).toLowerCase();
				el.addEventListener(event, value);
			} else if (key === 'style' && typeof value === 'object') {
				Object.assign(el.style, value);
			} else if (key === 'class') {
				el.className = value;
			} else {
				el.setAttribute(key, value);
			}
		}
	}

	// children 處理
	mountChildren(vnode.children, el);

	container.appendChild(el);
}
