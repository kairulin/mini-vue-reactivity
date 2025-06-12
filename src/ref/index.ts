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
			console.log('get');
			track(wrapper, 'value');
			return raw;
		},
		set value(newVal) {
			console.log('raw', raw);
			if (newVal !== raw) {
				value = isObject(newVal) ? reactive(newVal) : newVal;
				console.log('come ');
				raw = newVal;
				console.log('wrapper', wrapper);
				trigger(wrapper, 'value');
			}
		}
	};
	console.log('wrapper', wrapper);
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