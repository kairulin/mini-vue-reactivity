// DOM 渲染器，會呼叫 reactive 的 effect
import { effect  } from '../reactivity';

export function mount(el: HTMLElement, renderFn: () => string) {
	effect(() => {
		el.innerHTML = renderFn();
	});
}