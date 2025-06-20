// 簡單的 reactivity 系統
import { effect, track, trigger } from '../reactivity';

// 用 Proxy 包住原始物件，攔截 get/set
export function reactive<T extends object>(obj: T): T {
	return new Proxy(obj, {
		get(target, key) {
			// console.group(`%c 現在是 reactive get`, 'background:#FF9800; color:#fff');
			// console.log('target 是：', target);
			// console.log('key 是：', key);
			track(target, key);
			// console.groupEnd();
			return Reflect.get(target, key);
		},
		set(target, key, value) {
			// console.group(`%c 現在是 reactive set`, 'background:#FF9800; color:#fff');
			const result = Reflect.set(target, key, value);
			// console.log('result 是：', result);
			trigger(target, key);
			// console.groupEnd();
			return result;
		}
	});
}