import { reactive } from '../reactive';
import { track, trigger } from '../reactivity';
function isObject(val: any): val is object {
	return val !== null && typeof val === 'object';
}

export function ref<T>(raw: T) {
	let value = isObject(raw) ? reactive(raw) : raw;

	const wrapper = {
		__v_isRef: true,
		get value() {
			// console.group(`%c 現在是 ref get`, 'background:#FF9800; color:#fff');
			// console.log('target 是：', wrapper);
			// console.log('key 是：', 'value');
			track(wrapper, 'value');
			return value;
		},
		set value(newVal) {
			if (newVal !== raw) {
				// console.group(`%c 現在是 ref set`, 'background:#FF9800; color:#fff');
				
				value = isObject(newVal) ? reactive(newVal) : newVal;
				// raw = newVal;
				// console.log('value 是：', value);
				trigger(wrapper, 'value');
				// console.groupEnd();
			}
		}
	};
	return wrapper;
}

export function isRef(val: any): boolean {
	return !!(val && val.__v_isRef === true);
}

export function unref<T>(ref: { value: T }): T;
export function unref<T>(ref: T): T;
export function unref(ref: any) {
	return isRef(ref) ? ref.value : ref;
}
