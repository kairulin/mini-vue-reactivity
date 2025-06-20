import { track, trigger } from '../reactivity/selfReactivity';

function createHandler<T extends object>() {
	return {
		get(target: T, key: string | symbol) {
			const result = Reflect.get(target, key);
			track(target, key);
			return result;
		},
		set(target: T, key: string | symbol, value: any) {
			const result = Reflect.set(target, key, value);
			trigger(target, key);
			return result;
		}
	};
}
export function selfReactive<T extends object>(obj: T): T {
	return new Proxy(obj, createHandler<T>());
}

const test = selfReactive({ count: 0 });
test.count++