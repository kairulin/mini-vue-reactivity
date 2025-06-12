export let activeEffect: Function | null = null;
// 建立一個副作用函式，並記錄現在「誰在收集依賴」。
// 是註冊副作用的地方
export function effect(fn: Function) {
	activeEffect = fn;
	fn();
	activeEffect = null;
}

// 關鍵邏輯：依賴收集與觸發更新
const targetMap = new WeakMap();
// 誰用了這個欄位？
// 當你在 effect 中用到 state.count 時，會自動執行 track(state, 'count')。

// 它會記下：「欸，有一個副作用（effect）用到了 state.count，等會要通知它重跑」。
// 記錄誰用了哪個屬性
export function track(target: any, key: any) {
	console.group(`%c 現在是 track`, 'background:#2196F3; color:#fff');
	console.log('activeEffect 是：', String(activeEffect));

	console.log('target 是：', target);
	console.log('key 是：', key);
	let depsMap = targetMap.get(target);
	console.log('depsMap 是：', depsMap);
	if (!depsMap) {
		depsMap = new Map();
		targetMap.set(target, depsMap);
	}
	let deps = depsMap.get(key);
	console.log('deps 是：', deps);
	if (!deps) {
		deps = new Set();
		depsMap.set(key, deps);
	}
	if (typeof activeEffect === 'function') {
		deps.add(activeEffect);
	}
	console.groupEnd();
}
// 誰要被重新執行？
// 當你做 state.count++ 時，會執行 trigger(state, 'count')

// 它會找到所有「有依賴這個欄位」的副作用函式，然後把它們叫出來重跑。
// 會通知那些有依賴的函數
export function trigger(target: any, key: any) {
	console.group(`%c 現在是 trigger`, 'background:#4CAF50; color:#fff');
	console.log('target 是：', target);
	console.log('key 是：', key);
	const depsMap = targetMap.get(target);
	console.log('depsMap 是：', depsMap);
	if (!depsMap) return;
	const deps = depsMap.get(key);
	console.log('deps 是：', deps);
	deps?.forEach((fn: Function) => fn());

	console.groupEnd();
}
