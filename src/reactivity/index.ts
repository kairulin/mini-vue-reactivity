export let activeEffect: Function | null = null;
// 建立一個副作用函式，並記錄現在「誰在收集依賴」。
// 是註冊副作用的地方
export function effect(fn: Function, options: { lazy?: boolean; scheduler?: Function } = {}) {
	const runner = () => {
		activeEffect = runner;
		const result = fn();
		activeEffect = null;
		return result;
	};
	(runner as any).scheduler = options.scheduler;

	if (!options.lazy) {
		runner();
	}

	return runner;
}

// 關鍵邏輯：依賴收集與觸發更新
const targetMap = new WeakMap();

// track 追蹤  記錄誰用了哪個屬性
export function track(target: any, key: any) {
	if (!activeEffect) return;
	// console.group(`%c 現在是 track`, 'background:#2196F3; color:#fff');
	// console.log('activeEffect 是：', String(activeEffect));
	// console.log('target 是：', target);
	// console.log('key 是：', key);
	// console.log('targetMap 是：', targetMap);
	let depsMap = targetMap.get(target);
	// console.log('depsMap 是：', depsMap);
	if (!depsMap) {
		depsMap = new Map();
		targetMap.set(target, depsMap);
	}
	let deps = depsMap.get(key);
	// console.log('add前 deps 是：', deps);
	if (!deps) {
		deps = new Set();
		depsMap.set(key, deps);
	}
	// 會加入現在的function -> render
	deps.add(activeEffect);
	// console.log('add後 deps 是：', deps);
	// console.groupEnd();
}

// trigger 觸發 會通知那些有依賴的函數
export function trigger(target: any, key: any) {
	// console.group(`%c 現在是 trigger`, 'background:#4CAF50; color:#fff');
	// console.log('target 是：', target);
	// console.log('key 是：', key);
	// console.log('targetMap 是：', targetMap);
	const depsMap = targetMap.get(target);
	// console.log('depsMap 是：', depsMap);
	if (!depsMap) return;
	const deps = depsMap.get(key);
	// console.log('deps 是：', deps);
	deps?.forEach((depsFn: any) => {
		if (depsFn.scheduler) {
			depsFn.scheduler();
		} else {
			depsFn();
		}
	});

	// console.groupEnd();
}
