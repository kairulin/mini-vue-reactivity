// h.ts

import { VNode, Fragment, VNodeChildren } from './VNode';

export function h(
	tag: string | typeof Fragment | Function,
	props: Record<string, any> | null = null,
	children: VNodeChildren = null
): VNode {
	// 如果是函式型 Component，children 要塞進 props 中
	if (typeof tag === 'function') {
		props = { ...props, children };
	}
	return {
		tag,
		props,
		children
	};
}
