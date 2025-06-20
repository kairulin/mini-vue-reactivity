// let user = {
// 	name: 'John'
// };

// function wrap(target) {
// 	return new Proxy(target, {
// 		get(target, key) {
// 			const result = Reflect.get(target, key);
// 			if (result) {
// 				return result;
// 			} else {
// 				return console.log(`ReferenceError: Property doesn't exist: "${String(key)}"`);
// 			}
// 		}
// 	});
// }

// user = wrap(user);

// console.log(user.name);
// console.log(user.age);

// let array = [1, 2, 3];

// array = new Proxy(array, {
// 	get(target, key) {
// 		if (Number(key) < 0) {
// 			key = target.length + Number(key);
// 		}
// 		return Reflect.get(target, key);
// 	}
// });

// console.log(array[-1]);
// console.log(array[-2]);
// console.log(array[1]);
// console.log(array[0]);

function makeObservable(target ) {
	const observers = [];

	return new Proxy(target, {
		get(obj, key, receiver) {
			if (key === 'observe') {
				return function (fn) {
					observers.push(fn);
				};
			}
			return Reflect.get(obj, key, receiver);
		},
		set(obj, key, value, receiver) {
			const result = Reflect.set(obj, key, value, receiver);
			observers.forEach((fn) => fn(key, value));
			return result;
		}
	});
}

let user3 = {};
user3 = makeObservable(user3);
user3.observe((key, value) => {
	console.log(`SET ${key} = ${value}`);
});
user3.name = 'John';
