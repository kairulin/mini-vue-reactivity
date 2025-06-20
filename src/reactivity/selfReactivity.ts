let activeEffect: Function | null;

export function effect(fn: Function) {
	const test = () => {
		activeEffect = test;
		const result = fn();
		activeEffect = null;
		return result
	};
	return test();
}

const trackMap = new WeakMap();
export function track(target: any, key: any) {
	if (!activeEffect) return;
	let depsMap = trackMap.get(target);
	if (!depsMap) {
		depsMap = new Map();
		trackMap.set(target, depsMap);
	}
	let deps = depsMap.get(key);
	if (!deps) {
		deps = new Set();
		depsMap.set(key, deps);
	}

	deps.add(activeEffect);
}

export function trigger(target: any, key: any) {
	const depsMap = trackMap.get(target);
	if (!depsMap) return;
	const deps = depsMap.get(key);
	if (deps) {
		deps.forEach((callback: Function) => {
			callback();
		});
	}
}
