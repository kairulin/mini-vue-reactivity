Reflect:：
是一個內建物件，提供對物件的低階操作方法。
這些操作其實你平常會用，只是寫法不是用 Reflect。

使用 Reflect 的好處：不會產生語法錯誤（更安全）
和 Proxy 一起用，幫你攔截物件操作
方法語意一致（都是函式）

常用方法：
| 方法                                | 與傳統語法等價                             |
| ----------------------------------- | ------------------------------------------ |
| `Reflect.get(obj, prop)`            | `obj[prop]`                                |
| `Reflect.set(obj, prop, val)`       | `obj[prop] = val`                          |
| `Reflect.has(obj, prop)`            | `'prop' in obj`                            |
| `Reflect.deleteProperty(obj, prop)` | `delete obj[prop]`                         |
| `Reflect.ownKeys(obj)`              | `Object.getOwnPropertyNames(obj) + Symbol` |
