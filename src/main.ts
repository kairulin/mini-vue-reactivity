import { h } from './core/vnode/h';
import {Fragment} from './core/vnode/VNode'
import { render } from './core/renderer/render';
import { patch } from './core/renderer/patch';

const container = document.getElementById('app')!;

function MyComponent(props: any) {
	return h('span', { style: { color: props.color } }, props.label);
}

const oldVNode = h(Fragment, null, [
	'前段文字',
	h('strong', null, '這是 <strong> 元素'),
	h(MyComponent, { label: '我是組件', color: 'blue' }),
	'結尾文字'
]);

const newVNode = h(Fragment, null, [
	'前段更新',
	h('strong', null, '更新後的 strong'),
	h(MyComponent, { label: '新 Label', color: 'red' }),
	'尾巴換掉'
]);

// 初次渲染
render(oldVNode, container);

// 模擬更新：2秒後觸發
setTimeout(() => {
	console.log('⏱ 開始 patch...');
	patch(oldVNode, newVNode, container);
}, 2000);