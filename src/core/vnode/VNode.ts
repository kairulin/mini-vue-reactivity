// VNode.ts

export const Fragment = Symbol('Fragment');

// 僅允許 string 或 VNode 作為 child，禁止 Function 當 child
export type VNodeChild = string | VNode;
export type VNodeChildren = VNodeChild | VNodeChild[] | null;

export interface VNode {
	tag: string | typeof Fragment | Function;
	props: Record<string, any> | null;
	children: VNodeChildren;
}
