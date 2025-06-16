import { effect, track, trigger } from '../reactivity';

export function computed<T>(getter: () => T) {
	let value: T;
	let dirty = true;

	// 包住的 computed 的 getter，要能透過 scheduler 被通知 ref 改了
	const runner = effect(getter, {
		lazy: true,
		scheduler: () => {
			dirty = true;
			// 有人使用了 computed.value 才會觸發這個
			trigger(wrapper, 'value');
		}
	});

	const wrapper = {
		__v_isRef: true,
		get value() {
			track(wrapper, 'value'); // 讓外面使用者也能追蹤 computed
			if (dirty) {
				value = runner(); // 執行後 value 有新值
				dirty = false;
			}
			return value!;
		}
	};

	return wrapper;
}
