var lizaidong = (function () {
  function chunk (array, size = 1) {
    let res = []
    for (let i = 0; i < array.length; i += size) {
      res.push(array.slice(i, size + i))
    }
    return res
  }
  function compact (array) {
    return array.filter(v => v)
  }
  function difference (array, ...values) {
    return differenceBy.call(this, array, ...values, it => it)
  }
  function differenceBy (array, ...args) {
    let f = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      f = args.pop()
    } else {
      f = iteratee(identity)
    }
    f = iteratee(f)
    var ary = [].concat(...args).map(arg => f(arg))
    return array.filter(item => {
      return !ary.includes(f(item))
    })
  }
  function differenceWith (array, ...args) {
    var f = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      f = args.pop()
    } else {
      f = identity
    }
    f = iteratee(f)
    var ary = [].concat(...args)
    return array.filter (item => {
      for (var i = 0; i < ary.length; i++) {
        if (f(item, ary[i])) {
          return false
        }
      }
      return true
    })
  }
  function drop (array, n = 1) {
    return array.slice(n)
  }
  function dropRight (array, n = 1) {
    // return array.reverse().slice(n).reverse()
    return n === 0 ? array : array.slice(0, -n)
  }
  function dropRightWhile (array, predicate =  identity) {
    let f =  iteratee(predicate)
    for (let i = array.length - 1; i >= 0; i--) {
      if (!f(array[i])) {
        return array.slice(0, i + 1)
      }
    }
  }
  function dropWhile (array, predicate =  identity) {
    let f =  iteratee(predicate)
    for (let i = 0; i < array.length; i++) {
      if (!f(array[i])) {
        return array.slice(i)
      }
    }
  }
  function findIndex (array, predicate, fromIndex = 0) {
    let f =  iteratee(predicate)
    for (let i = 0; i < array.length; i++) {
      if (f(array[i])) {
        return i
      }
    }
  }
  function findLastIndex (array, predicate =  identity, fromIndex = array.length - 1) {
    let f = iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if(f(array[i])) {
        return i
      }
    }
  }
  function head (array) {
    return array[0]
  }
  function flatten (array) {
    return flattenDepth(array)
  }
  function flattenDeep (array) {
    return flattenDepth(array, Infinity)
  }
  function flattenDepth (array, depth = 1) {
    const res = []
    let count = 0
    recursive(array)
    function recursive (ary) {
      count++
      ary.forEach(v => {
        if ( isArray(v)) {
          if (count > depth) {
            res.push(v)
          } else {
            recursive(v)
          }
        } else {
          res.push(v)
        }
      })
    }
    return res
  }
  function fromPairs (pairs) {
    const obj = {}
    pairs.forEach((v, i) => obj[v[0]] = v[1])
    return obj
  }
  function negate (predicate) {
    return (...args) => !predicate(...args)
  }
  // 设置默认值
  function defaultTo (value, defaultValue) {
    return !isNil(value) && value === value ? value : defaultValue
  }
  // 起始到结束的步数
  function range (start = 0, end, step = 1) {
    let res = []
    if (!end) {
      end = start
      start = 0
    }
    if (end > start) {
      if (step < 0) {
        return []
      }
      for (let i = start; i < end;) {
        res.push(step ? i : start)
        i += step ? step : 1
      }
    } else {
      if (step < 0) {
        step = -step
      }
      for (let i = start; i > end;) {
        res.push(step ? i : end)
        i -= step ? step : 1
      }
    }
    return res
  }
  // 起始到结束的步数的倒序
  function rangeRight (start = 0, end, step = 1) {
    return range(start, end, step).reverse()
  }
  function keys (object) {
    var ary = []
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        ary.push(key)
      }
    }
    return ary
  }
  function indexOf (array, value, fromIndex = 0) {
    if (Object.prototype.toString.call(array) === '[object String]') {
      let res = array.match(value)
      return res ? res.index : -1
    }
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }
  function initial (array) {
    return array.slice(0, -1)
  }
  function intersection (...array) {
    return intersectionBy(array[0], [].concat(...array.slice(1)), it => it)
  }
  function intersectionBy (array, ...args) {
    let f = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      f = args.pop()
    } else {
      f =  identity
    }
    f = iteratee(f)
    var ary = [].concat(...args).map(arg => f(arg))
    return array.filter(item => {
      return ary.includes(f(item))
    })
  }
  function intersectionWith (array, ...args) {
    var iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee =  identity
    }
    return array.filter(item => {
      var ary = [].concat(...args)
      for (var i = 0; i < ary.length; i++) {
        if (iteratee(item, ary[i])) {
          return true
        }
      }
    })
  }
  function join (array, separator = ',') {
    return array.reduce((prev, curr) => prev + '' + separator + curr)
  }
  function last (array) {
    return array[array.length - 1]
  }
  function lastIndexOf (array, value, fromIndex = array.length - 1) {
    if (fromIndex < 0) {
      fromIndex = array.length + fromIndex
    }
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }
  function nth (array, n = 0) {
    if (n < 0) {
      n = array.length + n
    }
    return array[n]
  }
  function pull (array, ...values) {
    return array.filter(v => ![].concat(...values).includes(v))
  }
  function pullAll (array, values) {
    return pull(array, values)
  }
  function pullAllBy (array, values, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    return array.filter(item => {
      for (var i = 0; i < values.length; i++) {
        if ( isEqual(item, values[i])) {
          return false
        }
      }
      return true
    })
  }
  function pullAllWith (array, values, comparator) {
    return pullAllBy(array, values, comparator)
  }
  function pullAt (array, indexs) {
    var ary = [].concat(indexs).sort((a, b)=> b - a)
    var res = []
    for (var i = array.length - 1; i >= 0; i--) {
      if (ary.includes(i)) {
        res = (array.splice(i, 1)).concat(res)
      }
    }
    return res
  }
  function reverse (array) {
    let len = array.length
    for (let i = 0; i < len / 2; i++) {
      let temp = 0
      temp = array[i]
      array[i] = array[len - 1 - i]
      array[len - 1 - i] = temp
    }
    return array
  }
  function sortedIndex (array, value) {
    return sortedIndexBy(array, value, item => item)
  }
  function sortedIndexBy (array, value, iteratee =  identity) {
    var f = lizaidong.iteratee(iteratee)
    for (var i = 0; i < array.length; i++) {
      if (f(value) <= f(array[i])) {
        return i
      }
    }
    return i - 1
  }
  function sortedIndexOf (array, value) {
    var mid = array.length / 2 | 0
    var left = 0
    var right = array.length
    while (left < right) {
      if (array[mid] >= value) {
        right = mid - 1
      } else {
        left = mid + 1
      }
      mid = (left + right) / 2 | 0
    }
    return right
  }
  function sortedLastIndex (array, value) {
    return sortedLastIndexBy(array, value, item => item)
  }
  function sortedLastIndexBy (array, value, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    for (var i = array.length - 1; i >= 0; i--) {
      if (f(value) >= f(array[i])) {
        return i + 1
      }
    }
    return 0
  }
  function sortedLastIndexOf (array, value) {
    var left = 0
    var right = array.length
    var mid = array.length / 2 | 0
    while(left < right) {
      if (array[mid] > value) {
        right = mid - 1
      } else {
        left = mid + 1
      }
      mid = (left + right) / 2 | 0
    }
    return right
  }
  function sortedUniq (array) {
    return sortedUniqBy(array, item => item)
  }
  function sortedUniqBy (array, iteratee) {
    return uniqBy(array, iteratee)
  }
  function tail (array) {
    return slice(array, 1)
  }
  function take (array, n = 1) {
    return slice(array, 0, n)
  }
  function takeRight (array, n = 1) {
    if (n <= 0) {
      n = array.length - n
    } else {
      n = -n
    }
    return slice(array, n)
  }
  function takeRightWhile (array, predicate =  iteratee) {
    var f = iteratee(predicate)
    for (var i = array.length - 1; i >= 0; i--) {
      if (!f(array[i])) {
        return array.slice(i + 1)
      }
    }
  }
  function takeWhile(array, predicate =  identity) {
    var f = iteratee(predicate)
    for (var i = 0; i < array.length; i++) {
      if (!f(array[i])) {
        return array.slice(0, i)
      }
    }
  }
  function union (...arrays) {
    return unionBy(...arrays, item => item)
  }
  function unionBy (array, ...args) {
    let f = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      f = args.pop()
    } else {
      f =  identity
    }
    f = iteratee(f)
    let ary = array.concat(...args)
    return uniqBy(ary, f)
  }
  function unionWith (array, ...args) {
    var f = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      f = args.pop()
    } else {
      f =  identity
    }
    f = iteratee(f)
    return uniqWith([].concat(array, ...args), f)
  }
  function uniq (array) {
    return uniqBy(array, item => item)
  }
  function uniqBy (array, iteratee) {
    var f = lizaidong.iteratee(iteratee)
    let ary = array.map(item => f(item))
    return array.filter((item, index) => {
      if (ary.indexOf(ary[index]) === index) {
        return true
      } else {
        return false
      }
    })
  }
  function uniqWith (array, comparator) {
    var f = iteratee(comparator)
    return array.reduce((res, item) => {
      for (var i = 0; i < res.length; i++) {
        if (f(item, res[i])) {
          break
        }
      }
      if (i === res.length) {
        res.push(item)
      }
      return res
    }, [array[0]])
  }
  function unzip (array) {
    let res = []
    let key = true
    for (let i = 0; ; i++) {
      if (!key) break
      let temp = []
      for (let j = 0; j < array.length; j++) {
        temp[j] = array[j][i]
      }
      let isTrue = temp.filter(item => item !== undefined)
      if (isTrue.length > 0) {
        res.push(temp)
      } else {
        key = false
      }
    }
    return res
  }
  function unzipWith (array, iteratee =  identity) {
    let ary = unzip(array)
    return  ary.map((item) => {
      item = item.reduce((prev, curr) => {
        return iteratee(prev, curr)
      })
      return item
    })
  }
  function zip (arrays) {
    let res = []
    for (let i = 0; i < arguments.length; i++) {
      let temp = []
      for (let j = 0; j < arguments.length; j++) {
        temp[j] = arguments[j][i]
      }
      let isTrue = temp.filter(item => item !== undefined)
      if (isTrue.length > 0) {
        res.push(temp)
      }
    }
    return res
  }
  function zipObject (props, values) {
    let map = {}
    props.forEach((item, index) => {
      map[item] = values[index]
    })
    return map
  }
  function zipObjectDeep (props, values) {
    var map = {}
    props.forEach ((item, index) => {
      var obj = map
      var keys = toPath(item).reverse()
      var key = keys.pop()
      var value
      while (value = keys.pop()) {
        if (window.isNaN(value)) {
          obj[key] = obj[key] ? obj[key] : {}
        } else {
          obj[key] = obj[key] ? obj[key] : []
        }
        obj = obj[key]
        key = value
      }
      obj[key] = values[index]
    })
    return map
  }
  function zipWith (array, ...args) {
    var f = null
    if (typeof args[args.length - 1] ==='function' || typeof args[args.length - 1] === 'string') {
      f = args.pop()
    } else {
      f =  identity
    }
    f = iteratee(f)
    var ary = zip(array, ...args)
    return ary.map(item => {
      return item = f(...item)
    })
  }
  function countBy (collection, iteratee =  identity) {
    var f = lizaidong.iteratee(iteratee)
    return collection.reduce((map, item) => {
      var key = f(item)
      if (map[key]) {
        map[key]++
      } else {
        map[key] = 1
      }
      return map
    }, {})
  }
  function every (collection, predicate =  identity) {
    var f = iteratee(predicate)
    for (var i = 0; i < collection.length; i++) {
      if (!f(collection[i])) {
        return false
      }
    }
    return true
  }
  function xor (array, ...args) {
    return xorBy.call(this, array, ...args, it => it)
  }
  function find (collection, predicate =  identity, fromIndex = 0) {
    var f = iteratee(predicate)
    var i = fromIndex
    var isPlus = true
    if (i < 0) {
      i = collection.length + i
      isPlus = false
    }
    while (i >= 0 && i < collection.length) {
      if (f(collection[i])) {
        return collection[i]
      }
      if (isPlus) {
        i++
      } else {
        i--
      }
    }
  }
  function findLast (collection, predicate =  identity, fromIndex = collection.length - 1) {
    var f = iteratee(predicate)
    var i = fromIndex
    var isPlus = false
    if (i < 0) {
      i = collection.length + i
      isPlus = true
    }
    while (i >= 0 && i < collection.length) {
      if (f(collection[i])) {
        return collection[i]
      }
      if (isPlus) {
        i++
      } else {
        i--
      }
    }
  }
  function flatMap (collection, iteratee =  identity) {
    return flatMapDepth(collection, iteratee)
  }
  function flatMapDeep (collection, iteratee) {
    return flatMapDepth(collection, iteratee, Infinity)
  }
  function flatMapDepth (collection, iteratee, depth = 1) {
    var f = lizaidong.iteratee(iteratee)
    return collection.reduce((ary, item) => {
      return ary.concat(flattenDepth(f(item), depth - 1))
    }, [])
  }
  function partition (collection, predicate =  identity) {
    var f = iteratee(predicate)
    var truthy = collection.filter(item => f(item))
    var falsey = collection.filter(item => !f(item))
    return [truthy, falsey]
  }
  function reduce (collection, iteratee =  identity, accumulator = collection[0]) {
    var keys = Object.keys(collection)
    var i
    if (arguments.length > 2) {
      i = 0
    } else {
      i = 1
    }
    var f = lizaidong.iteratee(iteratee)
    for (;i < keys.length; i++) {
      accumulator = f(accumulator, collection[keys[i]], keys[i])
    }
    return accumulator
  }
  function reduceRight (collection, iteratee, accumulator = collection[collection.length - 1]) {
    var keys = Object.keys(collection)
    var i
    if (arguments.length > 2) {
      i = collection.length - 1
    } else {
      i = collection.length - 2
    }
    var f = lizaidong.iteratee(iteratee)
    for (;i >= 0; i--) {
      accumulator = f(accumulator, collection[keys[i]], keys[i])
    }
    return accumulator
  }
  function reject (collection, predicate) {
    var f = iteratee(predicate)
    var keys = Object.keys(collection)
    var res = []
    for (var key of keys) {
      if (!f(collection[key])) {
        res.push(collection[key])
      }
    }
    return res
  }
  function sample (collection) {
    return sampleSize(collection)[0]
  }
  function sampleSize (collection, n = 1) {
    var keys = Object.keys(collection)
    var res = []
    if (n > keys.length) {
      n = keys.length
    }
    for (var i = 0; i < n; i++) {
      var index = Math.floor(Math.random() * keys.length)
      res.push(collection[keys[index]])
    }
    return res
  }
  function shuffle (collection) {
    var keys = Object.keys(collection)
    var res = []
    while (keys.length > 0) {
      var index = Math.floor(Math.random() * keys.length)
      res.push(collection[keys.splice(index, 1)])
    }
    return res
  }
  function size (collection) {
    return Object.keys(collection).length
  }
  function some (collection, predicate =  identity) {
    var keys = Object.keys(collection)
    var f = iteratee(predicate)
    for (var i = 0; i < keys.length; i++) {
      var item = collection[keys[i]]
      if (f(item)) {
        return true
      }
    }
    return false
  }
  // 按指定的迭代函数的升序排列
  function sortBy (collection, iteratees =  identity) {
    // var fs = iteratees.map(item =>  iteratee(item))
    // var keys = Object.keys(collection)
    // var res = keys.map(item => collection[item])
    // for (var i = fs.length - 1; i >= 0; i--) {
    //   res = res.sort(function(a, b) {
    //     return fs[i](a) > fs[i](b)
    //   })
    // }
    // return res
    return orderBy(collection, iteratees)
  }
  // 指定排序的迭代函数，并指定迭代函数的升序或降序
  function orderBy (collection, iteratees =  identity, orders) {
    var fs = iteratees.map( iteratee)
    var keys = Object.keys(collection)
    orders = orders || new Array(fs.length).fill('asc')
    var res = keys.map(item => collection[item])
    for (var i = fs.length - 1; i >= 0; i--) {
      res = res.sort(function(a, b) {
        if (orders[i] === 'desc') {
          return fs[i](a) < fs[i](b)
        } else {
          return fs[i](a) > fs[i](b)
        }
      })
    }
    return res
  }
  function castArray (value) {
    if (arguments.length === 0) return []
    if (Array.isArray(value)) {
      return value
    } else {
      return [value]
    }
  }
  function conformsTo (object, source) {
    for (var key in object) {
      if (key in source) {
        var f = iteratee(source[key]) 
        if (!f(object[key])) {
          return false
        }
      }
    }
    return true
  }
  function eq (value, other) {
    if (value !== value && other !== other) {
      return true
    } else {
      return value === other
    }
  }
  function gt (value, other) {
    return value > other
  }
  function gte(value, other) {
    return value >= other
  }
  function xorBy (array, ...args) {
    var f = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      f = args.pop()
    } else {
      f = identity
    }
    var f = iteratee(f)
    var array = [].concat(array, ...args)
    var ary = array.map(item => item = f(item))
    ary = ary.map((item, index) => {
      if (ary.indexOf(item) === ary.lastIndexOf(item)) {
        return true
      } else {
        return false
      }
    })
    return array.filter((item, index) => ary[index])
  }
  function xorWith (array, ...args) {
    var f = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      f = args.pop()
    } else {
      f = identity
    }
    var f = iteratee(f)
    var array = [].concat(array, ...args)
    return array.filter((item, index) => {
      for (var i = 0; i < array.length; i++) {
        if (i !== index && f(item, array[i])) {
          return false
        }
      }
      return true
    })
  }
  function keyBy (collection, iteratee =  identity) {
    var f = lizaidong.iteratee(iteratee)
    return collection.reduce((map, item) => {
      map[f(item)] = item
      return map
    }, {})
  }
  function groupBy (collection, iteratee =  identity) {
    var f = lizaidong.iteratee(iteratee)
    return collection.reduce ((map, item) => {
      let key = f(item)
      if (!map[key]) {
        map[key] = [item]
      } else {
        map[key].push(item)
      }
      return map
    }, {})
  }
  function before (n, func) {
    let count = 0
    return function (...args) {
      count++
      let res
      if (count <= n) {
        res = func(...args)
      }
      return res
    }
  }
  function after (n, func) {
    let count = 0
    return function (...args) {
      count++
      if (count >= n) {
        return func(...args)
      }
    }
  }
  function ary (func, num = func.length) {
    return function (...value) {
      return func.apply(null, value.slice(0, num))
    }
  }
  function unary (func) {
    return function (value) {
      return func(value)
    }
  }
  function without (array, ...values) {
    for (var i = 0; i < array.length;) {
      if (values.includes(array[i])) {
        array.splice(i, 1)
      } else {
        i++
      }
    }
    return array
  }
  // uniqueId (prefix = '') {
  
  // }
  function cloneDeep (value) {
    // if (typeof value === 'object') {
    //   return JSON.parse(JSON.stringify(value))
    // } else {
    //   return value
    // }
    if (typeof value === 'object' && value) {
      var res = Array.isArray(value) ? [] : {}
      var keys = Object.keys(value)
      keys.forEach (item => {
        if (typeof value[item] === 'object') {
          res[item] = cloneDeep(value[item])
        } else {
          res[item] = value[item]
        }
      })
      return res
    } else {
      return value
    }
  }
  function flip (func) {
    return function (...args) {
      return func(...args.reverse())
    }
  }
  function spread (func, start = 0) {
    return function (args) {
      return func.apply(null, [...args].slice(start))
    }
  }
  function assign (object, ...sources) {
    sources.forEach(item => {
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          object[key] = item[key]
        }
      }
    })
    return object
  }
  function assignIn (object, ...sources) {
    sources.forEach(item => {
      for (var key in item) {
        object[key] = item[key]
      }
    })
    return object
  }
  function findKey (object, predicate) {
    var f =  iteratee(predicate)
    for (var key in object) {
      if (f(object[key])) {
        return key
      }
    }
  }
  function findLastKey (object, predicate) {
    var f =  iteratee(predicate)
    var keys = Object.keys(object)
    for (var i = keys.length - 1; i >= 0; i--) {
      if (f(object[keys[i]])) {
        return keys[i]
      }
    }
  }
  function forIn (object, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    for (var key in object) {
      f(object[key], key, object)
    }
    return object
  }
  function forInRight (object, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    var keys = keysIn(object).reverse()
    keys.forEach(key => f(object[key], key, object))
    return object
  }
  function forOwn (object, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        f(object[key], key, object)
      }
    }
    return object
  }
  function forOwnRight (object, iteratee = identity) {
    var f =  lizaidong.iteratee(iteratee)
    var props = keys(object).reverse()
    props.forEach(key => f(object[key], key, object))
    return object
  }
  function toPairs (object) {
    var ary = []
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        ary.push([key, object[key]])
      }
    }
    return ary
  }
  function toPairsIn (object) {
    var ary = []
    for (var key in object) {
      ary.push([key, object[key]])
    }
    return ary
  }
  function values (object) {
    var ary = Object.keys(object)
    return ary.map(item => object[item])
  }
  function valuesIn (object) {
    if (isObject(object)) {
      var ary = []
      for (var key in object) {
        ary.push(object[key])
      }
      return ary
    } else {
      return values(object)
    }
  }
  function isEqual (value, other) {
    return isEqualWith(value, other, it => it)
  }
  function identity (value) {
    return arguments[0]
  }
  function includes (collection, value, fromIndex = 0) {
    if (Object.prototype.toString.call(collection) === '[object Object]') {
      let count = 0
      for (let i in collection) {
        if (count === fromIndex) {
          if (collection[i] === value) {
            return true
          }
        } else {
          count++
        }
      }
      return false
    } else {
      return  indexOf(collection, value, fromIndex) > -1
    }
  }
  function isArguments (value) {
    return Object.prototype.toString.call(value) === "[object Arguments]"
  }
  function isArray (value) {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
  function isArrayBuffer (value){
    return Object.prototype.toString.call(value) === "[object ArrayBuffer]"
  }
  function isArrayLike(value) {
    return value.length !== undefined
  }
  function isArrayLikeObject (value) {
    return typeof value === 'object' && isArrayLike(value)
  }
  function isBoolean(value){
    return Object.prototype.toString.call(value) === "[object Boolean]"
  }
  function isDate (value) {
    return Object.prototype.toString.call(value) === "[object Date]"
  }
  function isElement (value) {
    return Object.prototype.toString.call(value) === "[object HTMLBodyElement]"
  }
  function isEmpty (value) {
    try{
      if (Object.keys(value).length === 0){
        return true
      } else {
        return false
      }
    } catch (error) {
      return true
    }
  }
  function isError (value) {
    return Object.prototype.toString.call(value) === "[object Error]"
  }
  function isFinite (value) {
    if (typeof value !== 'number') return false
    if (!isNaN(value)) {
      if (value === Infinity || value === -Infinity) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
  function isFunction (value) {
    return Object.prototype.toString.call(value) === "[object Function]"
  }
  function isInteger (value) {
    return Number.isInteger(value)
  }
  function isMap (value) {
    return Object.prototype.toString.call(value) === "[object Map]"
  }
  function isNaN (value) {
    try {
      if (value.valueOf() !== value.valueOf()) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
  function isNative(value) {
    return /\{\s*\[native code\]\s*\}/.test('' + value)
  }
  function isNil (value) {
    if (value === null || value === undefined) {
      return true
    } else {
      return false
    }
  }
  function isNull (value) {
    if (value === null) {
      return true
    } else {
      return false
    }
  }
  function isMatch (object, source) {
    for (let key in source) {
      if (!isEqual(source[key], object[key])) {
        return false
      }
    }
    return true
  }
  function isNumber (value) {
    if (typeof value === 'number') {
      return true
    } else {
      return false 
    }
  }
  function isObject (value) {
    return value !== null && (typeof value === 'object' || typeof value === 'function')
  }
  function isObjectLike (value) {
    return typeof value === 'object' && value !== null
  }
  function isPlainObject (value) {
    return value.__proto__ === Object.prototype || value.__proto__ === undefined
  }
  function isRegExp (value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
  }
  // 安全的整数
  function isSafeInteger (value) {
    return isInteger(value) && (value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER)
  }
  // 整数
  function isInteger (value) {
    return typeof value === 'number' && value % 1 === 0
  }
  function isSet (value) {
    return Object.prototype.toString.call(value) === '[object Set]'
  }
  function isString (value) {
    return Object.prototype.toString.call(value) === '[object String]'
  }
  function isSymbol (value) {
    return Object.prototype.toString.call(value) === '[object Symbol]'
  }
  function isTypedArray (value) {
    return Object.prototype.toString.call(value) === '[object Uint8Array]'
  }
  function isUndefined (value) {
    return Object.prototype.toString.call(value) === '[object Undefined]'
  }
  function isWeakMap (value) {
    return Object.prototype.toString.call(value) === '[object WeakMap]'
  }
  function isWeakSet(value) {
    return Object.prototype.toString.call(value) === '[object WeakSet]'
  }
  function lt (value, other) {
    return value < other
  }
  function lte (value, other) {
    return value <= other
  }
  function toArray (value) {
    var res = []
    if (value !== null) {
      if (typeof value === 'object' || typeof value === 'string') {
        if (Object.prototype.toString.call(value) === '[object Object]') {
          for (var i in value) {
            res.push(value[i])
          }
        } else {
          for (var i of value) {
            res.push(i)
          }
        }
      }
    }
    return res
  }
  function toFinite (value) {
    var num = toNumber(value)
    if (num > Number.MAX_VALUE) {
      return Number.MAX_VALUE
    }
    if (num < Number.MIN_VALUE) {
      return -Number.MAX_VALUE
    }
    return num
  }
  function toInteger (value) {
    var num = toFinite(value)
    return Math.floor(num)
  }
  function toLength (value) {
    var num = toInteger(value)
    if (num <= 0) return 0
    if (num > 2 ** 32 - 1) return 2 ** 32 - 1
    return num
  }
  // 转换成数字
  function toNumber (value) {
    return Number(value)
  }
  // 加
  function add (augend, addend) {
    return augend + addend
  }
  // 向上取整
  function ceil (number, precision = 0) {
    var d = 10 ** precision
    return Math.ceil(number * d) / d
  }
  // 除
  function divide (dividend, divisor) {
    return dividend / divisor
  }
  // 向下取整
  function floor (number, precision = 0) {
    var d = 10 ** precision
    return Math.floor(number * d) / d
  }
  // 求最大值
  function max (array) {
    if (array.length === 0) {
      return undefined
    }
    return maxBy(array, it => it)
  }
  // 根据迭代函数求最大值
  function maxBy (array, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    return array.reduce((prev, item) => {
      if (f(prev) > f(item)) {
        return prev
      } else {
        return item        
      }
    })
  }
  // 求平均值
  function mean (array) {
    return meanBy(array, it => it)
  }
  // 根据迭代函数求平均值
  function meanBy (array, iteratee) {
    var f = lizaidong.iteratee(iteratee)
    return array.map(f).reduce((prev, item) => prev + item) / array.length
  }
  // 求最小值
  function min (array) {
    if (array.length === 0) {
      return undefined
    }
    return minBy(array, it => it)
  }
  // 根据迭代函数求最小值
  function minBy (array, iteratee =  identity) {
    var f = lizaidong.iteratee(iteratee)
    return array.reduce((prev, item) => {
      if (f(prev) < f(item)) {
        return prev
      } else {
        return item
      }
    })
  }
  // 乘
  function multiply (augend, addend) {
    return augend * addend
  }
  // 四舍五入
  function round (number, precision = 0) {
    var d = 10 ** precision
    return Math.round(number * d) / d
  }
  // 减
  function subtract (minuend, substrahend) {
    return minuend - substrahend
  }
  // 数字若超过范围，离哪个最近
  function clamp (number, ...args) {
    var lower = number, upper = args[0]
    if (args.length > 1) {
      lower = args[0]
      upper = args[1]
    }
    if (number < lower) {
      return lower
    } else if (number > upper) {
      return upper
    } else {
      return number
    }
  }
  // 判断一个数是否在范围内
  function inRange (number, start,end = 0) {
    if (start > end) {
      var temp = end
      end = start
      start = temp
    }
    return number >= start && number < end
  }
  // 是否有浮点数的随机数
  function random (...args) {
    if (typeof args[args.length - 1] === 'boolean') {
      floating = args.pop()
    } else {
      floating = false
    }
    var [upper, lower] = args
    lower = lower ? lower : 0
    if (lower % 1 !== 0 || upper % 1 !== 0) {
      floating = true
    }
    if (floating) {
      return Math.random() * Math.abs(upper - lower) + Math.min(lower, upper) 
    } else {
      return Math.floor(Math.random() * Math.abs(upper - lower)) + Math.min(lower, upper)
    }
  }
  function functions (object) {
    return  keys(object)
  }
  function functionsIn (object) {
    return  keysIn(object)
  }
  function has (object, path) {
    if (Array.isArray(path)) path = path.join('.')
    var get_path =  toPath(path).reverse()
    var obj =  cloneDeep(object)
    while (get_path.length > 0) {
      var attr = get_path.pop()
      if (obj.hasOwnProperty(attr)) {
        obj = obj[attr]
      } else {
        return false
      }
    }
    return  hasIn(object, path)
  }
  function hasIn (object, path) {
    return Boolean( get(object, path))
  }
  function invert (object) {
    var keys = Object.keys(object)
    return keys.reduce((obj, key) => {
      obj[object[key]] = key
      return obj
    }, {})
  }  
  function invertBy (object, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    var keys = Object.keys(object)
    return keys.reduce((obj, key) => {
      var prop = f(object[key])
      if (obj[prop]) {
        obj[prop].push(key)
      } else {
        obj[prop] = [key]
      }
      return obj
    }, {})
  }
  function invoke (object, path, ...args) {
    var get_path =  toPath(path)
    var f = get_path.pop()
    return  get(object, get_path)[f](...args)
  }
  function keysIn (object) {
    var ary = []
    for (var key in object) {
      ary.push(key)
    }
    return ary
  }
  function mapKeys (object, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    var map = {}
    for (var key in object) {
      map[f(object[key], key, object)] = object[key]
    }
    return map
  }
  function mapValues (object, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    var map = {}
    for (var key in object) {
      map[key] = f(object[key], key, object)
    }
    return map
  }
  // 创建一个从object没有被选中的属性的对象
  function omit (object, props) {
    var attrs = [].concat(props)
    var obj = {}
    var keys = Object.keys(object)
    return keys.reduce((obj, key) => {
      if (!attrs.includes(key)) {
        obj[key] = object[key]
      }
      return obj
    }, obj)
  }
  // 创建一个从object没有被选中的属性， 并且该属性经借代判断为真
  function omitBy (object, predicate =  identity) {
    return  pickBy(object,  negate(predicate))
  }
  // 创建一个从object选中的属性的对象
  function pick (object, props) {
    var attrs = [].concat(props)
    var obj = {}
    var keys = Object.keys(object)
    return keys.reduce((obj, key) => {
      if (attrs.includes(key)) {
        obj[key] = object[key]
      }
      return obj
    }, obj)
  }
  // 创建一个从object选中的属性，并且该属性经迭代判断为真
  function pickBy (object, predicate =  identity) {
    var f =  iteratee(predicate)
    var obj = {}
    var keys = Object.keys(object)
    return keys.reduce((obj, key) => {
      if (f(object[key])) {
        obj[key] = object[key]
      }
      return obj
    }, obj)
  }
  // 根据字符串形式的路径取对象里的值
  function at (object, paths) {
    var fs = [].concat(paths).map( toPath)
    return fs.map(item =>  get(object, item))
  }
  // 根据路径获取对象的值
  function get (object, path, defaultValue) {
    if (typeof path === 'string') {
      path =  toPath(path)
    }
    try {
      var res = path.reduce((obj, item) => obj[item], object)
      if (!res) return defaultValue
      return res
    } catch (e) {
      return defaultValue
    }
  }
  // 把字符串路径转换成数组
  function toPath (value) {
    return value.match(/[^\.\[\] ]+/g)
  }
  function once (func) {
    var res
    var flag
    return function (...args) {
      if (!flag) {
        flag = true
        res = func(...args)
      }
      return res
    }
  }
  function times (number, iteratee =  identity) {
    var f = lizaidong.iteratee(iteratee)
    return new Array(number).fill(0).map((_, index) => index).map(f)
  }
  function conforms (source) {
    return function (object) {
      for (var key in object) {
        if (source[key]) {
          return source[key](object[key])
        }
      }
    }
  }
  function constant (value) {
    return function (object) {
      return value !== undefined ? value : object
    }
  }
  function flow (func) {
    return function (...args) {
      var f = func.shift()
      res = f(...args)
      if (func.length > 0) {
        return  flow(func)(res)
      } else {
        return res
      }
    }
  }
  function method (path, ...args) {
    return function (object) {
      return  get(object, path)(...args)      
    }
  }
  function methodOf (object, ...args) {
    return function (path) {
      return  get(object, path)(...args)
    }
  }
  function nthArg (n = 0) {
    return function () {
      if (n < 0) n += arguments.length
      return arguments[n]
    }
  }
  function matches (source) {
    return function (object) {
      for (let key in source) {
        if (source[key] !== object[key]) {
          return false
        }
      }
      return true
    }
  }
  function matchesProperty (srcValue) {
    return function (path) {
      if (path[srcValue[0]] === srcValue[1]) {
        return true
      }
      return false
    }
  }
  function property (path) {
    return function (obj) {
      return  get(obj, path)
    }
  }
  function propertyOf (obj) {
    return function (path) {
      if (path) return get(obj, path)
    }
  }
  function sum (array) {
    return sumBy(array, v => v)
  }
  function sumBy (array, iteratee) {
    var f = lizaidong.iteratee(iteratee)
    let sum = 0
    array.forEach(item => {
      sum += f(item)
    })
    return sum
  }
  function iteratee (func) {
    if (typeof func === 'function') {
      return func
    }
    if (typeof func === 'string'){
      return  property(func)
    }
    if (Array.isArray(func)) {
      return  matchesProperty(func)
    }
    if (typeof func === 'object') {
      return  matches(func)
    }
  }
  // 把字符串转换成驼峰
  function camelCase (string) {
    var res = string.match(/[a-zA-Z]+/g)
    return lowerFirst(res.map(capitalize).join(''))
  }
  // 首字母大写其余小写
  function capitalize (string = '') {
    return  upperFirst( toLower(string))
  }
  function escape (string = '') {
    return string.replace(/[&<>"']/g,c =>{
      switch (c) {
        case '&':
          return '\&amp;'
        case '<':
          return '\&lt;'
        case '>':
          return '\&gt;'
        case '"':
          return '\&quot;'
        case '\'':
          return'\&#x27;'
      }
    })
  }
  function escapeRegExp (string) {
    return string.replace(/([\^$.*?\(\)\[\]{}\| ])/g, '\\$1')
  }
  function kebabCase (string = '') {
    return  lowerCase(string).replace(' ', '-')
  }
  // 字符串分割成空格连接的全小写
  function lowerCase (string) {
    var res = string.match(/[a-z]+|[A-Za-z]+/g)
    return res.map( toLower).join(' ')
  }
  // 首字母小写
  function lowerFirst (string) {
    return string.replace(/^[A-Z]/, c => c.toLowerCase())
  }
  // 在起始和末尾都添加指定字符直到指定长度，优先满足后面
  function pad (string = '', length = 0, chars = ' ') {
    var start_length = Math.floor((length - string.length) / 2) + string.length
    var start =  padStart(string, start_length, chars)
    var end =  padEnd(start, length, chars)
    return end
  }
  // 在末尾添加指定字符直到达到指定长度，超出截掉末尾的
  function padEnd (string = '', length = 0, chars = ' ') {
    while (string.length < length) {
      string = string.replace(/$/, chars)
    }
    return string.slice(0, length)
  }
  // 在起始添加指定字符直到达到指定长度，超出截掉添加的内容的末尾部分
  function padStart (string = '', length = 0, chars = ' ') {
    var length_s = string.length
    while (string.length < length) {
      string = string.replace(/^/, chars)
    }
    return string.slice(0, length - length_s) + string.slice(-length_s)
  }
  function parseInt (string, radix = 10) {
    return Math.floor(Number(string.toString(radix)))
  }
  function repeat (string = '', n = 1) {
    var str = ''
    while (n > 0) {
      str += string
      n--
    }
    return str
  }
  function replace (string = '', pattern, replacement) {
    // lodash只换第一次
    var match = string.match(pattern)
    if (match) {
      var end = match.index + match[0].length
      string = string.slice(0, match.index) + replacement + string.slice(end)
    }
    //全部换掉的
    // var match, end
    // do {
    //   match = string.match(pattern)
    //   end = match.index + match[0].length
    //   if (match) string = string.slice(0, match.index) + replacement + string.slice(end)
    // } while (match)
    return string
  }
  // 提取字符串中的连续字母，转换成全小写
  function snakeCase (string) {
    var pattern = /([A-Z]?[a-z]+)|([a-zA-Z]+)/g
    string = string.match(pattern)
    return string.map( toLower).join('_')
  }
  // 把字符串用分隔符分割成数组
  function split (string, separator, limit) {
    limit = limit || Infinity
    var res = []
    var match
    do {
      match = string.match(separator)
      res.push(string.substr(0, match.index))
      string = string.slice(match.index + 1)
    } while (match && res.length < limit)
    return res
  }
  // 提取字符串中的连续字母，首字母大写
  function startCase (string = '') {
    var pattern = /([A-Z]?[a-z]+)|([a-zA-Z]+)/g
    string = string.match(pattern)
    return string.map( upperFirst).join(' ').trim()
  }
  // 字符串是否以目标值开头
  function startsWith (string = '', target, position = 0) {
    var res = string.match(target)
    if (res) {
      return res.index === position
    }
    return false
  }
  // 全小写
  function toLower (string = '') {
    for (var i = 0; i < string.length; i++) {
      if (/[A-Z]/.test(string[i])) {
        string = string.replace(string[i], String.fromCharCode(string[i].charCodeAt(0) + 32))
      }
    }
    return string
  }
  // 全大写
  function toUpper (string = '') {
    for (var i = 0; i < string.length; i++) {
      if (/[a-z]/.test(string[i])) {
        string = string.replace(string[i], String.fromCharCode(string[i].charCodeAt(0) - 32))
      }
    }
    return string
  }
  // 去掉前后空格和指定字符
  function trim (string = '', chars = '\\s') {
    chars = typeof chars === 'string' ? chars : '\\s'
    return  trimEnd( trimStart(string, chars), chars)
  }
  // 删除字符串起始的空格或指定字符
  function trimStart (string = '', chars = '\\s') {
    chars = typeof chars === 'string' ? chars : '\\s'
    var pattern = new RegExp('^[' + chars + ']+')
    return string.replace(pattern, '')
  }
  // 删除字符串结尾的空格或指定字符
  function trimEnd (string = '', chars = '\\s') {
    chars = typeof chars === 'string' ? chars : '\\s'
    var pattern = new RegExp('[' + chars + ']+$')
    return string.replace(pattern, '')
  }
  // 根据条件截断字符串
  function truncate (string = '', options = {}) {
    options.omission = options.omission || '...'
    options.length = options.length || 30
  
    var omission_l = options.omission.length
    var str = string.slice(0, options.length - omission_l)
    if (options.separator === undefined) {
      return str + options.omission
    } else {
      str = str.split(options.separator).slice(-2, -1).join()
      var index = string.lastIndexOf(str) + str.length
      return string.slice(0, index) + options.omission
    }
  
  }
  // 字符串是否以目标字符串在指定位置结尾
  function endsWith (string = '', target, position = string.length) {
    var res = string.match(target)
    if (res) {
      return res.index === position - 1
    }
    return false
  }
  // 字符串转成空格分割的全大写
  function upperCase (string = '') {
    var res = string.match(/([A-Z]?[a-z]+)/g)
    if (res) {
      return res.reduce ((s, item) =>  s +  toUpper(item) + ' ', '').trim()
    }
    return string
  }
  // 首字母大写
  function upperFirst (string = '') {
    if (/[a-z]/.test(string[0])) {
      return String.fromCharCode(string.charCodeAt(0) - 32) + string.slice(1)
    }
    return string
  }
  // 把字符串按匹配结果拆分成数组
  function words (string = '', pattern = undefined) {
    pattern = pattern || /[A-Z]?[a-z]+/g
    return string.match(pattern)
  }
  // 作业：用reduce实现map,filter,forEach,slice,fill,concat....
  function map (collection, iteratee =  identity) {
    var f =  lizaidong.iteratee(iteratee)
    var values = Object.values(collection)
    return values.reduce((res, item, index, ary) => {
      res[index] = f(item, index, ary)
      return res
    }, [])
  }
  function forEach (collection, iteratee = identity) {
    var f = lizaidong.iteratee(iteratee)
    var keys = Object.keys(collection)
    keys.reduce ((res, item, _, ary) => {
      return f(collection[item], item, ary)
    }, keys)
    return collection
  }
  function forEachRight (collection, iteratee =  identity) {
    var f = lizaidong.iteratee(iteratee)
    collection = collection.reverse()
    var keys = Object.keys(collection)
    keys.reduce ((res, item, _, ary) => {
      return f(collection[item], item, ary)
    }, keys)
    return collection.reverse()
  }
  function filter (collection, predicate =  identity) {
    predicate = iteratee(predicate)
    return collection.reduce((res, item, index) => {
      if (predicate(item)) {
        res.push(item)
      }
      return res
    }, [])
  }
  function slice (array, start = 0, end = array.length) {
    if (start < 0) start += array.length
    if (end < 0) end += array.length
    return array.reduce ((res, item, index) => {
      if (index >= start && index < end) {
        res.push(item)
      }
      return res
    }, [])
  }
  function fill (array, value, start = 0, end = array.length) {
    if (start < 0) start += array.length
    if (end < 0) end += array.length
    return array.reduce((res, item, index) => {
      if (index >= start && index < end) {
        res[index] = value
      }
      return res
    }, array)
  }
  function concat (array, ...values) {
    return values.reduce((res, item) => {
      if (isArray(item)) {
        res.push(...item)
      } else {
        res.push(item)
      }
      return res
    }, [...array])
  }
  function defer (func, ...args) {
    var timer = setTimeout(function () {
      func(...args)
    }, 0)
    return timer
  }
  function delay (func, wait, ...args) {
    var timer = setTimeout(function () {
      func(...args)
    }, wait)
    return timer
  }
  function isEqualWith (value, other, customizer) {
    if (value === other) {
      return true
    }
    if (value !== value && other !== other) {
      return true
    }
    if (Array.isArray(value) && Array.isArray(other)) {
      let l = Math.max(value.length, other.length)
      for (let i = 0; i < value.length; i++) {
        if (!isEqual(customizer(value[i]), customizer(other[i]))) {
          return false
        }
      }
      return true
    }
    if (typeof value === 'object' && typeof other === 'object') {
      if (Object.keys(value).length !== Object.keys(other).length) return false
      for (let key in value) {
        if (!isEqual(customizer(value[key]), customizer(other[key]))) {
          return false
        }
      }
      return true
    }
    return value === other
  }
  function isLength (value) {
    if (typeof value === 'number') {
      if (value % 1 === 0) {
        return true
      }
    }
    return false
  }
  function isMatchWith (object, source, customizer) {
    var f = iteratee(customizer)
    for (let key in source) {
      if (!isEqual(f(source[key]), f(object[key]))) {
        return false
      }
    }
    return true
  }
  function toSafeInteger (number) {
    if (number > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
    return parseInt(number)
  }
  function defaults (object, ...sources) {
    sources.forEach(obj => {
      for (var key in obj) {
        if (!object[key]) {
          object[key] = obj[key]
        }
      }
    })
    return object
  }
  function defaultsDeep (object, ...sources) {
    sources.forEach(obj => {
      for (var key in obj) {
        if (object[key]) {
          if (typeof obj[key] === 'object') {
            defaultsDeep(object[key], obj[key])
          }
        } else {
          object[key] = obj[key]
        }
      }
    })
    return object
  }
  function merge (object, ...sources) {
    sources.forEach (item => {
      for (var key in item) {
        if (typeof item[key] === 'object') {
          merge(object[key], item[key])
        } else {
          object[key] = item[key]
        }
      }
    })
    return object
  }
  function mergeWith (object, ...sources) {
    var f
    if (typeof sources[sources.length - 1] === 'function' || typeof sources[sources.length - 1] === 'string') {
      f = sources.pop()
    } else {
      f = identity
    }
    f = iteratee(f)

    iterator(object, sources, f)
    function iterator (obj, sources, f) {
      sources.forEach(src => {
        for (var key in src) {
          if (obj[key]) {
            obj[key] = f(obj[key], src[key], key, obj, src, '') // 没弄 stack
          } else {
            obj[key] = src[key]
          }
        }
      })
    }
    return object
  }
  function result (object, path, defaultValue) {
    var res = get(object, path, defaultValue)
    if (typeof res === 'function') {
      return res.call(object)
    }
    return res
  }
  // 获取object对象上的path路径上的指向, 把value作为值给路径的指向
  function set (object, path, value) {
    return lizaidong.updateWith(object, path, it => it, '', value)
  }
  // 获取object对象上的path路径上的指向, 把value作为参数调用customizer重新赋值给路径的指向
  function setWith (object, path, value, customizer) {
    return updateWith(object, path, it => it, customizer, value)
  }
  function transform (object, identity, accumulator) {
    var f = iteratee(identity)
    var keys = Object.keys(object)
    var length = keys.length
    accumulator = accumulator || keys.unshift()
    for (var i = 0; i < length; i++) {
      var flag = f(accumulator, object[keys[i]], keys[i], object)
      if (flag === false) {
        break
      }
    }
    return accumulator
  }
  function invokeMap (collection, path, ...args) {
    var props = Object.keys(collection)
    return props.map((key, index) => {
      if (typeof path === 'string') {
        if (args.length === 0) {
          return collection[key][path].call(collection[key])
        } else {
          return collection[key][path].apply(collection[key], args)
        }
      } else {
        if (args.length === 0) {
          return path.call(collection[key])
        } else {
          return path.apply(collection[key], args)
        }
      }
    })
  }
  // 移除object对象上的path路径上的属性
  function unset (object, path) {
    if (typeof path === 'string') path = toPath(path)
    path = path.reverse()
    var prop
    var map = object
    while(prop = path.pop()) {
      if (map[prop]) {
        map = map[prop]
      } else {
        return false
      }
      if (path.length === 1) {
        var del = path.pop()
        if (map[del]) {
          return delete map[del]
        } else {
          return false
        }
      }
    }
  }
  // 获取object对象上的path路径上的值并以此为参数调用updater赋值给path路径
  function update (object, path, updater) {
    return updateWith(object, path, updater)
  }
  function updateWith (object, path, updater, customizer) {
    var value
    if (arguments.length > 4) value = arguments[4] // set, setWith
    if (typeof path === 'string') path = toPath(path)
    var props = path.reverse()
    var prop
    var map = object
    var key = path.pop()
    while (prop = props.pop()) {  
      if (!map[key]) {
        if (customizer) {
          map[key] = customizer()
        } else {
          map[key] = window.isNaN(prop) ? {} : []
        }
      }
      map = map[key]
      key = prop
    }
    map[key] = value ? updater(value) : updater(map[key])
    return object
  }
  function unescape (string) {
    var map = new Map([['&amp;', '&'], ['&lt;', '<'], ['&gt;', '>'], ['&quot;', '"'], ['&#39;', "'"], ['&#96;', '`']])
    var pattern = /(\&amp;)|(\&lt;)|(\&gt;)|(\&quot;)|(\&#39;)|(\&#96;)/g
    return string.replace(pattern, c => map.get(c))
  }
  function deburr () {

  }
  function bindAll (object, methodNames) {
    methodNames.forEach(mathod => {
      
    })
  }
  function mixin () {

  }
  function uniqueId () {

  }
  function curry (func, arity = func.length) { // curried(1)(_, 3)(2); 没有弄
    var ary = []
    return function fn(...args) {
      ary = ary.concat(args)
      if (ary.length < arity) {
        return fn
      } else {
        return func(...ary)
      }
    }
  }
  function memoize () {

  }
  // var a = {
  //   "employees": [
  //       { "firstName":"Bill" , "lastName":"Gates" },
  //       { "firstName":"George" , "lastName":"Bush" },
  //       { "firstName":"Thomas" , "lastName":"Carter" }
  //   ]
  // }
  // "{"employees":[{"firstName":"Bill","lastName":"Gates"},{"firstName":"George","lastName":"Bush"},{"firstName":"Thomas","lastName":"Carter"}]}"



// 输入：parseJson("\"true\"")
// 期望："true"

// 输入：parseJson("23")
// 期望：23

// 输入：parseJson("[1,2,3]")
// 期望：[1,2,3]

// 输入：parseJson("true")
// 期望：true

// 输入：parseJson("null")
// 期望：null

// 输入：parseJson("{\"a\":1}")
// 期望：{"a":1}

// 输入：parseJson("[{\"a\":1,\"b\":true},2]")
// 期望：[{"a":1,"b":true},2]

// 输入：parseJson("{\"a\":[1,2]}")
// 期望：{"a":[1,2]}

// 输入：parseJson("[[1,2],[3,4]]")
// 期望：[[1,2],[3,4]]

// 输入：parseJson("{\"a\":{\"b\":3}}")
//期望：{"a":{"b":3}}
  function parseJson (str) {
    var i = 0
    return parseValue()
    function parseValue () {
      var curr = str[i]
      if (curr === 'n') {
        return parseNull()
      } else if (curr === '"') {
        return parseString()
      } else if (curr === 't') {
        return parseTure()
      } else if (curr === 'f') {
        return parseFalse()
      } else if (curr === '{') {
        return parseObject()
      } else if (curr === '[') {
        return parseArray()
      } else {
        return parseNumber()
      }
    }
    function parseObject () {
      var obj = {}
      while (str[i] !== '}') {
        i++
        var key = ''
        while (str[i] !== ':') {
          key += str[i]
          i++
        }
        i++
        obj[key] = parseValue()
        i++
      }
      return obj
    }
    function parseArray () {
      var ary = []
      while (str[i] !== ']') {
        i++
        ary.push(parseValue())
        i++
      }
      return ary
    }
    function parseString () {
      var s = ''
      i++
      while(str[i] !== '"') {
        if (str[i] === '\\') {
          i++
        }
        s += str[i]
        i++
      }
      return s
    }
    function parseNumber () {
      var s = str[i]
      while (parseIsNumber(str[i + 1])) {
        i++
        s += str[i]
      }
      return parseInt(s)
    }
    function parseIsNumber (c) {
      var chars = {
        '-': true,
        '+': true,
        'e': true,
        'E': true,
        '.': true,
      }
      if (chars[c]) return true
      if (c >= 0 && c <= 9) return true
      else return false
    }
    function parseTure () {
      i += 3
      return true
    }
    function parseFalse () {
      i += 4
      return false
    }
    function parseNull () {
      i += 3
      return null
    } 
  }
//   输入：stringifyJson({"a":1})
// 输出/期望："{\"a\":1}"
// =================
// 输入：stringifyJson([1,2,3,4,5])
// 输出/期望："[1,2,3,4,5]"
// =================
// 输入：stringifyJson({"a":1,"b":true,"c":null,"d":[1,2,{"x":5,"y":6,"z":{"i":"foobar","j":3.45}}]})
// 输出/期望："{\"a\":1,\"b\":true,\"c\":null,\"d\":[1,2,{\"x\":5,\"y\":6,\"z\":{\"i\":\"foobar\",\"j\":3.45}}]}"

  function stringifyJson (obj) {
    var str = ''
    if (Array.isArray(obj)) {
      return stringifyArray(obj)
    }
    if (typeof obj === 'object') {
      if (obj) {
        return stringifyObject(obj)
      } else {
        return 'null'
      }
    }
    if (typeof obj === 'string') {
      return '"' + obj + '"'
    }
    return obj + ''
  }
  function stringifyArray (ary) {
    var length = ary.length
    var str = '['
    for (var i = 0; i < length; i++) {
      var curr = ary[i]
      if (Array.isArray(curr)) {
        str += stringifyArray(curr)
      } else if (typeof curr === 'object') {
        if (curr) {
          str += stringifyObject(curr)
        } else {
          str += 'null'
        }
      } else {
        if (typeof curr === 'string') {
          str += '"' + curr + '"'
        } else {
          str += curr
        }
      }
      str += ','
    }
    return str.slice(0, -1) + ']'
  }
  function stringifyObject (obj) {
    var str = '{'
    for (var i in obj) {
      var curr = obj[i]
      str += '"' + i + '"' + ':'
      if (Array.isArray(curr)) {
        str += stringifyArray(curr)
      } else if (typeof curr === 'object') {
        if (curr) {
          str += stringifyObject(curr)
        } else {
          str += 'null'
        }
      } else {
        if (typeof curr === 'string') {
          str += '"' + curr + '"'
        } else {
          str += curr
        }
      }
      str += ','
    }
    return str.slice(0, -1) + '}'
  }
  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
    differenceBy: differenceBy,
    differenceWith: differenceWith,
    drop: drop,
    dropRight: dropRight,
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,
    reverse: reverse,
    sortedIndex: sortedIndex,
    sortedIndexBy: sortedIndexBy,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    takeRightWhile: takeRightWhile,
    takeWhile: takeWhile,
    union: union,
    unionBy: unionBy,
    unionWith: unionWith,
    uniq: uniq,
    uniqBy: uniqBy,
    uniqWith: uniqWith,
    unzip: unzip,
    unzipWith: unzipWith,
    without: without,
    xor: xor,
    xorBy: xorBy,
    xorWith: xorWith,
    zip: zip,
    zipObject: zipObject,
    zipObjectDeep: zipObjectDeep,
    zipWith: zipWith,
    countBy: countBy,
    every: every,
    filter: filter,
    find: find,
    findLast: findLast,
    flatMap: flatMap,
    flatMapDeep: flatMapDeep,
    flatMapDepth: flatMapDepth,
    forEach: forEach,
    forEachRight: forEachRight,
    groupBy: groupBy,
    includes: includes,
    invoke: invoke,
    keyBy: keyBy,
    map: map,
    orderBy: orderBy,
    partition: partition,
    reduce: reduce,
    reduceRight: reduceRight,
    reject: reject,
    sample: sample,
    sampleSize: sampleSize,
    shuffle: shuffle,
    size: size,
    some: some,
    sortBy: sortBy,
    defer: defer,
    delay: delay,
    castArray: castArray,
    conformsTo: conformsTo,
    eq: eq,
    gt: gt,
    gte: gte,
    isArguments: isArguments,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isDate: isDate,
    isElement: isElement,
    isEmpty: isEmpty,
    isEqual: isEqual,
    isEqualWith: isEqualWith,
    isError: isError,
    isFinite: isFinite,
    isFunction: isFunction,
    isInteger: isInteger,
    isLength: isLength,
    isMap: isMap,
    isMatch: isMatch,
    isMatchWith: isMatchWith,
    isNaN: isNaN,
    isNative: isNative,
    isNil: isNil,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isPlainObject: isPlainObject,
    isRegExp: isRegExp,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isTypedArray: isTypedArray,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    lt: lt,
    lte: lte,
    toArray: toArray,
    toFinite: toFinite,
    toInteger: toInteger,
    toLength: toLength,
    toNumber: toNumber,
    assign: assign,
    toSafeInteger: toSafeInteger,
    add: add,
    ceil: ceil,
    divide: divide,
    floor: floor,
    max: max,
    maxBy: maxBy,
    mean: mean,
    meanBy: meanBy,
    min: min,
    minBy: minBy,
    multiply: multiply,
    round: round,
    subtract: subtract,
    sum: sum,
    sumBy: sumBy,
    clamp: clamp,
    inRange: inRange,
    random: random,
    assignIn: assignIn,
    at: at,
    defaults: defaults,
    defaultsDeep: defaultsDeep,
    findKey: findKey,
    findLastKey: findLastKey,
    forIn: forIn,
    forInRight: forInRight,
    forOwn: forOwn,
    forOwnRight: forOwnRight,
    functions: functions,
    functionsIn: functionsIn,
    get : get ,
    has: has,
    invert: invert,
    invertBy: invertBy,
    invoke: invoke,
    keys: keys,
    keysIn: keysIn,
    mapKeys: mapKeys,
    mapValues: mapValues,
    merge: merge,
    mergeWith: mergeWith,
    omit: omit,
    omitBy: omitBy,
    pick: pick,
    pickBy: pickBy,
    result: result,
    set: set,
    setWith: setWith,
    toPairs: toPairs,
    toPairsIn: toPairsIn,
    transform: transform,
    unset: unset,
    update: update,
    updateWith: updateWith,
    values: values,
    valuesIn: valuesIn,
    camelCase: camelCase,
    capitalize: capitalize,
    deburr: deburr,
    endsWith: endsWith,
    escape: escape,
    escapeRegExp: escapeRegExp,
    kebabCase: kebabCase,
    lowerCase: lowerCase,
    lowerFirst: lowerFirst,
    pad: pad,
    padEnd: padEnd,
    padStart: padStart,
    parseInt: parseInt,
    repeat: repeat,
    replace: replace,
    snakeCase: snakeCase,
    split: split,
    startCase: startCase,
    startsWith: startsWith,
    toLower: toLower,
    toUpper: toUpper,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    truncate: truncate,
    unescape: unescape,
    upperCase: upperCase,
    upperFirst: upperFirst,
    words: words,
    bindAll: bindAll,
    defaultTo: defaultTo,
    range: range,
    rangeRight: rangeRight,
    mixin: mixin,
    times: times,
    toPath: toPath,
    uniqueId: uniqueId,
    cloneDeep: cloneDeep,
    identity: identity,
    concat: concat,
    pullAt: pullAt,
    matches: matches,
    property: property,
    ary: ary,
    unary: unary,
    negate: negate,
    once: once,
    spread: spread,
    curry: curry,
    memoize: memoize,
    flip: flip,
    conforms: conforms,
    constant: constant,
    flow: flow,
    method: method,
    methodOf: methodOf,
    nthArg: nthArg,
    propertyOf: propertyOf,
    parseJson : parseJson,
    iteratee: iteratee,
    invokeMap: invokeMap,
    hasIn: hasIn,
    stringifyJson, stringifyJson
  }
})()
  














