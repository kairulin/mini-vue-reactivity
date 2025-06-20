import { h, Fragment } from '../renderer/h';
import type { VNode } from '../renderer/h';
// export const MyComponent = () => {
//   return h(Fragment, {}, [
//     h('h1', {}, '我是 Fragment 裡的 H1'),
//     h('h2', {}, '我是 Fragment 裡的 H2')
//   ]);
// };

// export const MyComponent = (props: { children?: VNode[] }) => {
//     console.log('props', props)
// 	return h('div', { className: 'box' }, [
//         h('h3', {}, '我是組件標題'),
//         ...(props.children || [])
//     ]);
// };

export const MyComponent = (props: { children?: VNode[] }) => {
	return h(Fragment, {}, [h('h1', {}, '我是 A'), h('h2', {}, '我是 B'), ...(props.children || [])]);
};
