// core/renderer/patch.ts

import { VNode, Fragment } from '../vnode/VNode';
import { mountChildren } from './mountChildren';
import { render } from './render';

export function patch(oldVNode: VNode, newVNode: VNode, container: HTMLElement) {
	// 1. tag 不同：直接替換整棵樹
	if (oldVNode.tag !== newVNode.tag) {
		container.innerHTML = '';
		render(newVNode, container);
		return;
	}

	// 2. 處理 Fragment（直接 diff children）
	if (newVNode.tag === Fragment) {
		if (Array.isArray(newVNode.children) && Array.isArray(oldVNode.children)) {
			container.innerHTML = ''; // 暫時簡化：全部清空再 render
			mountChildren(newVNode.children, container);
		}
		return;
	}

	// 3. 處理函式型 Component（遞迴比對其內部 VNode）
	if (typeof oldVNode.tag === 'function' && typeof newVNode.tag === 'function') {
		const prevSubVNode = oldVNode.tag(oldVNode.props || {});
		const nextSubVNode = newVNode.tag(newVNode.props || {});
		patch(prevSubVNode, nextSubVNode, container);
		return;
	}

	// 4. 一般 DOM element，同 tag 時
	const el = container.firstChild as HTMLElement;

	// ==== props 更新 ====
	const oldProps = oldVNode.props || {};
	const newProps = newVNode.props || {};

	// 更新與新增
	for (const key in newProps) {
		const oldVal = oldProps[key];
		const newVal = newProps[key];
		if (oldVal !== newVal) {
			if (key.startsWith('on')) {
				const event = key.slice(2).toLowerCase();
				if (oldVal) el.removeEventListener(event, oldVal);
				el.addEventListener(event, newVal);
			} else if (key === 'style' && typeof newVal === 'object') {
				Object.assign(el.style, newVal);
			} else if (key === 'class') {
				el.className = newVal;
			} else {
				el.setAttribute(key, newVal);
			}
		}
	}

	// 移除不存在的 props
	for (const key in oldProps) {
		if (!(key in newProps)) {
			if (key.startsWith('on')) {
				const event = key.slice(2).toLowerCase();
				el.removeEventListener(event, oldProps[key]);
			} else {
				el.removeAttribute(key);
			}
		}
	}

	// ==== children ====
	if (typeof newVNode.children === 'string') {
		el.textContent = newVNode.children;
	} else if (Array.isArray(newVNode.children)) {
		el.innerHTML = ''; // 暫時簡化：全部重 render
		mountChildren(newVNode.children, container);
	}
}
