import { reactive } from './reactive';
import { mount } from './renderer';
import { isRef, ref, unref } from './ref';
import { computed } from './computed';
const state = reactive({ count: 0 });
// debugger;

const stateRef = ref(3);
const plusOne = computed(() => stateRef.value + 1);
//  <h1>Count Reactive: ${state.count}</h1>
//     <button id="add-reactive">+ Reactive</button>

// <h1>Computed plusOne: ${plusOne.value}</h1>
//  <h1>Count Ref: ${stateRef.value}</h1>
function render() {
	return `
		<button id="add-ref">+ Ref</button>		
		<h1>Computed plusOne: ${plusOne.value}</h1>
  `;
}

mount(document.getElementById('app')!, render);

document.addEventListener('click', (e) => {
	const target = e.target as HTMLElement;
	if (target.id === 'add-reactive') {
		state.count++;
	}
	if (target.id === 'add-ref') {
		// debugger
		stateRef.value++;
	}
	// console.log('isRef(count):', isRef(stateRef)); // true
	// console.log('unref(count):', unref(stateRef)); // 當下的數值
});
