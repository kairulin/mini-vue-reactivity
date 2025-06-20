import { track, trigger } from "../reactivity/selfReactivity";

export function selfRef<T>(raw: T) {
	const wrapper = {
		get self() {
			track(wrapper, 'value')
			return raw;
		},
		set self(newValue) {
			if (newValue !== raw) {
				raw = newValue;
				trigger(wrapper, 'value')
			}
		}
	};
	return wrapper;
}
