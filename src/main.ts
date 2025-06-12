import { reactive } from './reactive';
import { mount } from './renderer';
import { isRef, ref, unref } from './ref';
const state = reactive({ count: 0 });
const stateRef = ref(0);
const stateTest = ref({ foo: 1 });
function render() {
	return `
    <h1>Count Reactive: ${state.count}</h1>
    <button id="add-reactive">+ Reactive</button>
    <h1>Count Ref: ${stateRef.value}</h1>
    <button id="add-ref">+ Ref</button>
  `;
}

mount(document.getElementById('app')!, render);

document.addEventListener('click', (e) => {
	const target = e.target as HTMLElement;
	if (target.id === 'add-reactive') {
		state.count++;
	}
	if (target.id === 'add-ref') {
		stateRef.value++;
	}
	console.log('isRef(count):', isRef(stateRef)); // true
	console.log('isRef(state):', isRef(stateTest)); // true
	console.log('unref(count):', unref(stateRef)); // 當下的數值
});
