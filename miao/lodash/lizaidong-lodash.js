var lizaidong = {
  chunk (array, size = 1) {
    let res = []
    for (let i = 0; i < array.length; i += size) {
      res.push(array.slice(i, size + i))
    }
    return res
  },
  compact (array) {
    return array.filter(v => v)
  },
  difference (array, ...values) {
    return this.differenceBy.call(this, array, ...values, it => it)
  },
  differenceBy (array, ...args) {
    let iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    iteratee = this.iteratee(iteratee)
    var ary = [].concat(...args).map(arg => iteratee(arg))
    return array.filter(item => {
      return !ary.includes(iteratee(item))
    })
  },
  differenceWith (array, ...args) {
    let iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    iteratee = this.iteratee(iteratee)
    var ary = [].concat(...args)
    return array.filter (item => {
      for (var i = 0; i < ary.length; i++) {
        if (iteratee(item, ary[i])) {
          return false
        }
      }
      return true
    })
  },
  drop (array, n = 1) {
    return array.slice(n)
  },
  dropRight (array, n = 1) {
    // return array.reverse().slice(n).reverse()
    return n === 0 ? array : array.slice(0, -n)
  },
  dropRightWhile (array, predicate = lizaidong.identity) {
    let f = lizaidong.iteratee(predicate)
    for (let i = array.length - 1; i >= 0; i--) {
      if (!f(array[i])) {
        return array.slice(0, i + 1)
      }
    }
  },
  dropWhile (array, predicate = lizaidong.identity) {
    let f = lizaidong.iteratee(predicate)
    for (let i = 0; i < array.length; i++) {
      if (!f(array[i])) {
        return array.slice(i)
      }
    }
  },
  findIndex (array, predicate, fromIndex = 0) {
    let f = lizaidong.iteratee(predicate)
    for (let i = 0; i < array.length; i++) {
      if (f(array[i])) {
        return i
      }
    }
  },
  findLastIndex (array, predicate = lizaidong.identity, fromIndex = array.length - 1) {
    let f = this.iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if(f(array[i])) {
        return i
      }
    }
  },
  head (array) {
    return array[0]
  },
  flatten (array) {
    return this.flattenDepth(array)
  },
  flattenDeep (array) {
    return this.flattenDepth(array, Infinity)
  },
  flattenDepth (array, depth = 1) {
    const res = []
    let count = 0
    recursive(array)
    function recursive (ary) {
      count++
      ary.forEach(v => {
        if (lizaidong.isArray(v)) {
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
  },
  fromPairs (pairs) {
    const obj = {}
    pairs.forEach((v, i) => obj[v[0]] = v[1])
    return obj
  },
  negate (predicate) {
    return (...args) => !predicate(...args)
  },
  range (start = 0, end, step = 1) {
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
  },
  keys (object) {
    return Object.keys(object)
  },
  indexOf (array, value, fromIndex = 0) {
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
  },
  initial (array) {
    return array.slice(0, -1)
  },
  intersection (...array) {
    return this.intersectionBy(array[0], [].concat(...array.slice(1)), it => it)
  },
  intersectionBy (array, ...args) {
    let iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    iteratee = this.iteratee(iteratee)
    var ary = [].concat(...args).map(arg => iteratee(arg))
    return array.filter(item => {
      return ary.includes(iteratee(item))
    })
  },
  intersectionWith (array, ...args) {
    var iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    return array.filter(item => {
      var ary = [].concat(...args)
      for (var i = 0; i < ary.length; i++) {
        if (iteratee(item, ary[i])) {
          return true
        }
      }
    })
  },
  join (array, separator = ',') {
    return array.reduce((prev, curr) => prev + '' + separator + curr)
  },
  last (array) {
    return array[array.length - 1]
  },
  lastIndexOf (array, value, fromIndex = array.length - 1) {
    if (fromIndex < 0) {
      fromIndex = array.length + fromIndex
    }
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  },
  nth (array, n = 0) {
    if (n < 0) {
      n = array.length + n
    }
    return array[n]
  },
  pull (array, ...values) {
    return array.filter(v => ![].concat(...values).includes(v))
  },
  pullAll (array, values) {
    return this.pull(array, values)
  },
  pullAllBy (array, values, iteratee = lizaidong.identity) {
    var f = this.iteratee(iteratee)
    return array.filter(item => {
      for (var i = 0; i < values.length; i++) {
        if (lizaidong.isEqual(item, values[i])) {
          return false
        }
      }
      return true
    })
  },
  pullAllWith (array, values, comparator) {
    return this.pullAllBy(array, values, comparator)
  },
  pullAt (array, indexs) {
    var ary = [].concat(indexs).sort((a, b)=> b - a)
    var res = []
    for (var i = array.length - 1; i >= 0; i--) {
      if (ary.includes(i)) {
        res = (array.splice(i, 1)).concat(res)
      }
    }
    return res
  },
  reverse (array) {
    let len = array.length
    for (let i = 0; i < len / 2; i++) {
      let temp = 0
      temp = array[i]
      array[i] = array[len - 1 - i]
      array[len - 1 - i] = temp
    }
    return array
  },
  sortedIndex (array, value) {
    return this.sortedIndexBy(array, value, item => item)
  },
  sortedIndexBy (array, value, iteratee = lizaidong.identity) {
    var f = this.iteratee(iteratee)
    for (var i = 0; i < array.length; i++) {
      if (f(value) <= f(array[i])) {
        return i
      }
    }
    return i - 1
  },
  sortedIndexOf (array, value) {
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
  },
  sortedLastIndex (array, value) {
    return this.sortedLastIndexBy(array, value, item => item)
  },
  sortedLastIndexBy (array, value, iteratee = lizaidong.identity) {
    var f = this.iteratee(iteratee)
    for (var i = array.length - 1; i >= 0; i--) {
      if (f(value) >= f(array[i])) {
        return i + 1
      }
    }
    return 0
  },
  sortedLastIndexOf (array, value) {
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
  },
  sortedUniq (array) {
    return this.sortedUniqBy(array, item => item)
  },
  sortedUniqBy (array, iteratee) {
    return this.uniqBy(array, iteratee)
  },
  tail (array) {
    return this.slice(array, 1)
  },
  take (array, n = 1) {
    return this.slice(array, 0, n)
  },
  takeRight (array, n = 1) {
    if (n <= 0) {
      n = array.length - n
    } else {
      n = -n
    }
    return this.slice(array, n)
  },
  takeRightWhile (array, predicate = lizaidong.iteratee) {
    var f = this.iteratee(predicate)
    for (var i = array.length - 1; i >= 0; i--) {
      if (!f(array[i])) {
        return array.slice(i + 1)
      }
    }
  },
  takeWhile(array, predicate = lizaidong.identity) {
    var f = this.iteratee(predicate)
    for (var i = 0; i < array.length; i++) {
      if (!f(array[i])) {
        return array.slice(0, i)
      }
    }
  },
  union (...arrays) {
    return this.unionBy(...arrays, item => item)
  },
  unionBy (array, ...args) {
    let iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    iteratee = this.iteratee(iteratee)
    let ary = array.concat(...args)
    return this.uniqBy(ary, iteratee)
  },
  unionWith (array, ...args) {
    var iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    var f = this.iteratee(iteratee)
    return this.uniqWith([].concat(array, ...args), f)
  },
  uniq (array) {
    return this.uniqBy(array, item => item)
  },
  uniqBy (array, iteratee) {
    iteratee = this.iteratee(iteratee)
    let ary = array.map(item => iteratee(item))
    return array.filter((item, index) => {
      if (ary.indexOf(ary[index]) === index) {
        return true
      } else {
        return false
      }
    })
  },
  uniqWith (array, comparator) {
    var f = this.iteratee(comparator)
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
  },
  unzip (array) {
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
  },
  unzipWith (array, iteratee = lizaidong.identity) {
    let ary = this.unzip(array)
    return  ary.map((item) => {
      item = item.reduce((prev, curr) => {
        return iteratee(prev, curr)
      })
      return item
    })
  },
  zip (arrays) {
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
  },
  zipObject (props, values) {
    let map = {}
    props.forEach((item, index) => {
      map[item] = values[index]
    })
    return map
  },
  // zipObjectDeep (props, values) {
  //   var map = {}
  //   props.forEach ((item, index) => {
  //     var key = item.split('.')
  //     // ['a', 'b[0]', 'c']
  //   })
  // },
  zipWith (array, ...args) {
    var iteratee = null
    if (typeof args[args.length - 1] ==='function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    var f = this.iteratee(iteratee)
    var ary = this.zip(array, ...args)
    return ary.map(item => {
      return item = f(...item)
    })
  },
  countBy (collection, iteratee = lizaidong.identity) {
    var f = this.iteratee(iteratee)
    return collection.reduce((map, item) => {
      var key = f(item)
      if (map[key]) {
        map[key]++
      } else {
        map[key] = 1
      }
      return map
    }, {})
  },
  every (collection, predicate = lizaidong.identity) {
    var f = this.iteratee(predicate)
    for (var i = 0; i < collection.length; i++) {
      if (!f(collection[i])) {
        return false
      }
    }
    return true
  },
  xor (array, ...args) {
    return this.xorBy.call(this, array, ...args, it => it)
  },
  find (collection, predicate = lizaidong.identity, fromIndex = 0) {
    var f = this.iteratee(predicate)
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
  },
  findLast (collection, predicate = lizaidong.identity, fromIndex = collection.length - 1) {
    var f = this.iteratee(predicate)
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
  },
  flatMap (collection, iteratee = lizaidong.identity) {
    return this.flatMapDepth(collection, iteratee)
  },
  flatMapDeep (collection, iteratee) {
    return this.flatMapDepth(collection, iteratee, Infinity)
  },
  flatMapDepth (collection, iteratee, depth = 1) {
    var f = this.iteratee(iteratee)
    return collection.reduce((ary, item) => {
      return ary.concat(lizaidong.flattenDepth(f(item), depth - 1))
    }, [])
  },
  partition (collection, predicate = lizaidong.identity) {
    var f = this.iteratee(predicate)
    var truthy = collection.filter(item => f(item))
    var falsey = collection.filter(item => !f(item))
    return [truthy, falsey]
  },
  reduce (collection, iteratee = lizaidong.identity, accumulator = collection[0]) {
    var keys = Object.keys(collection)
    var i
    if (arguments.length > 2) {
      i = 0
    } else {
      i = 1
    }
    var f = this.iteratee(iteratee)
    for (;i < keys.length; i++) {
      accumulator = f(accumulator, collection[keys[i]], keys[i])
    }
    return accumulator
  },
  reduceRight (collection, iteratee, accumulator = collection[collection.length - 1]) {
    var keys = Object.keys(collection)
    var i
    if (arguments.length > 2) {
      i = collection.length - 1
    } else {
      i = collection.length - 2
    }
    var f = this.iteratee(iteratee)
    for (;i >= 0; i--) {
      accumulator = f(accumulator, collection[keys[i]], keys[i])
    }
    return accumulator
  },
  reject (collection, predicate) {
    var f = this.iteratee(predicate)
    var keys = Object.keys(collection)
    var res = []
    // for (var i = 0; i < keys.length; i++) {
    //   if (!f(collection[keys[i]])) {
    //     res.push(collection[keys[i]])
    //   }
    // }
    for (var key of keys) {
      if (!f(collection[key])) {
        res.push(collection[key])
      }
    }
    return res
  },
  sample (collection) {
    return this.sampleSize(collection)[0]
  },
  sampleSize (collection, n = 1) {
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
  },
  shuffle (collection) {
    var keys = Object.keys(collection)
    var res = []
    while (keys.length > 0) {
      var index = Math.floor(Math.random() * keys.length)
      res.push(collection[keys.splice(index, 1)])
    }
    return res
  },
  size (collection) {
    return Object.keys(collection).length
  },
  some (collection, predicate = lizaidong.identity) {
    var keys = Object.keys(collection)
    var f = this.iteratee(predicate)
    for (var i = 0; i < keys.length; i++) {
      var item = collection[keys[i]]
      if (f(item)) {
        return true
      }
    }
    return false
  },
  sortBy (collection, iteratees) {
    var fs = iteratees.map(item => lizaidong.iteratee(item))
    var keys = Object.keys(collection)
    var res = keys.map(item => collection[item])
    for (var i = fs.length - 1; i >= 0; i--) {
      res = res.sort(function(a, b) {
        return fs[i](a) > fs[i](b)
      })
    }
    return res
  },
  castArray (value) {
    if (arguments.length === 0) return []
    if (Array.isArray(value)) {
      return value
    } else {
      return [value]
    }
  },
  conformsTo (object, source) {
    for (var key in object) {
      if (key in source) {
        var f = this.iteratee(source[key]) 
        if (!f(object[key])) {
          return false
        }
      }
    }
    return true
  },
  eq (value, other) {
    if (value !== value && other !== other) {
      return true
    } else {
      return value === other
    }
  },
  gt (value, other) {
    return value > other
  },
  gte(value, other) {
    return value >= other
  },
  xorBy (array, ...args) {
    var iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = this.identity
    }
    var f = this.iteratee(iteratee)
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
  },
  xorWith (array, ...args) {
    var iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = this.identity
    }
    var f = this.iteratee(iteratee)
    var array = [].concat(array, ...args)
    return array.filter((item, index) => {
      for (var i = 0; i < array.length; i++) {
        if (i !== index && f(item, array[i])) {
          return false
        }
      }
      return true
    })
  },
  keyBy (collection, iteratee = lizaidong.identity) {
    iteratee = this.iteratee(iteratee)
    return collection.reduce((map, item) => {
      map[iteratee(item)] = item
      return map
    }, {})
  },
  groupBy (collection, iteratee = lizaidong.identity) {
    iteratee = this.iteratee(iteratee)
    return collection.reduce ((map, item) => {
      let key = iteratee(item)
      if (!map[key]) {
        map[key] = [item]
      } else {
        map[key].push(item)
      }
      return map
    }, {})
  },
  before (n, func) {
    let count = 0
    return function (...args) {
      count++
      let res
      if (count <= n) {
        res = func(...args)
      }
      return res
    }
  },
  after (n, func) {
    let count = 0
    return function (...args) {
      count++
      if (count >= n) {
        return func(...args)
      }
    }
  },
  unary (func) {
    return function (value) {
      return func(value)
    }
  },
  without (array, ...values) {
    for (var i = 0; i < array.length;) {
      if (values.includes(array[i])) {
        array.splice(i, 1)
      } else {
        i++
      }
    }
    return array
  },
  flip (func) {
    return function (...args) {
      return func(...args.reverse())
    }
  },
  spread (func, start = 0) {
    return function (args) {
      return func.apply(null, [...args].slice(start))
    }
  },
  assign (object, ...sources) {
    sources.forEach(item => {
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          object[key] = item[key]
        }
      }
    })
    return object
  },
  assignIn (object, ...sources) {
    sources.forEach(item => {
      for (var key in item) {
        object[key] = item[key]
      }
    })
    return object
  },
  merge (object, ...sources) {
    sources.forEach (item => { // item = other
      for (var key in item) { // a
        if (typeof item[key] === 'object') {
          this.merge(object[key], item[key])
        } else {
          object[key] = item[key]
        }
      }
    })
    return object
  },
  forOwn (object, iteratee = lizaidong.identity) {
    var f = this.iteratee(iteratee)
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        f(object[key], key, object)
      }
    }
    return object
  },
  // forOwnRight (object, iteratee = lizaidong.identity) {},
  toPairs (object) {
    var ary = []
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        ary.push([key, object[key]])
      }
    }
    return ary
  },
  toPairsIn (object) {
    var ary = []
    for (var key in object) {
      ary.push([key, object[key]])
    }
    return ary
  },
  values (object) {
    var ary = Object.keys(object)
    return ary.map(item => object[item])
  },
  valuesIn (object) {
    if (this.isObject(object)) {
      var ary = []
      for (var key in object) {
        ary.push(object[key])
      }
      return ary
    } else {
      return this.values(object)
    }
  },
  isEqual(value, other) {
    if (value === other) {
      return true
    }
    if (value !== value && other !== other) {
      return true
    }
    if (Array.isArray(value) && Array.isArray(other)) {
      let l = Math.max(value.length, other.length)
      for (let i = 0; i < value.length; i++) {
        if (!lizaidong.isEqual(value[i], other[i])) {
          return false
        }
      }
      return true
    }
    if (typeof value === 'object' && typeof other === 'object') {
      if (Object.keys(value).length !== Object.keys(other).length) return false
      for (let key in value) {
        if (!lizaidong.isEqual(value[key], other[key])) {
          return false
        }
      }
      return true
    }
    return value === other
  },
  identity (value) {
    return arguments[0]
  },
  includes (collection, value, fromIndex = 0) {
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
      return lizaidong.indexOf(collection, value, fromIndex) > -1
    }
  },
  isArguments (value) {
    return Object.prototype.toString.call(value) === "[object Arguments]"
  },
  isArray (value) {
    return Object.prototype.toString.call(value) === '[object Array]'
  },
  isArrayBuffer (value){
    return Object.prototype.toString.call(value) === "[object ArrayBuffer]"
  },
  isArrayLike(value) {
    return value.length !== undefined
  },
  isArrayLikeObject (value) {
    return typeof value === 'object' && this.isArrayLike(value)
  },
  isBoolean(value){
    return Object.prototype.toString.call(value) === "[object Boolean]"
  },
  isDate (value) {
    return Object.prototype.toString.call(value) === "[object Date]"
  },
  isElement (value) {
    return Object.prototype.toString.call(value) === "[object HTMLBodyElement]"
  },
  isEmpty (value) {
    try{
      if (Object.keys(value).length === 0){
        return true
      } else {
        return false
      }
    } catch (error) {
      return true
    }
  },
  isError (value) {
    return Object.prototype.toString.call(value) === "[object Error]"
  },
  isFinite (value) {
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
  },
  isFunction (value) {
    return Object.prototype.toString.call(value) === "[object Function]"
  },
  isInteger (value) {
    return Number.isInteger(value)
  },
  isMap (value) {
    return Object.prototype.toString.call(value) === "[object Map]"
  },
  isNaN (value) {
    try {
      if (value.valueOf() !== value.valueOf()) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  },
  isNative(value) {
    return /\{\s\[native code\]\s\}/.test('' + value)
  },
  isNil (value) {
    if (value === null || value === undefined) {
      return true
    } else {
      return false
    }
  },
  isNull (value) {
    if (value === null) {
      return true
    } else {
      return false
    }
  },
  isMatch (object, source) {
    for (let key in source) {
      if (!this.isEqual(source[key], object[key])) {
        return false
      }
    }
    return true
  },
  isNumber (value) {
    if (typeof value === 'number') {
      return true
    } else {
      return false 
    }
  },
  isObject (value) {
    return value !== null && (typeof value === 'object' || typeof value === 'function')
  },
  isObjectLike (value) {
    return typeof value === 'object' && value !== null
  },
  isPlainObject (value) {
    return Object.prototype.toString.call(value) === '[object Object]'
  },
  isRegExp (value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
  },
  isInteger (value) {
    return typeof value === 'number' && value % 1 === 0
  },
  isSet (value) {
    return Object.prototype.toString.call(value) === '[object Set]'
  },
  isString (value) {
    return Object.prototype.toString.call(value) === '[object String]'
  },
  isSymbol (value) {
    return Object.prototype.toString.call(value) === '[object Symbol]'
  },
  isTypedArray (value) {
    return Object.prototype.toString.call(value) === '[object Uint8Array]'
  },
  isUndefined (value) {
    return Object.prototype.toString.call(value) === '[object Undefined]'
  },
  isWeakMap (value) {
    return Object.prototype.toString.call(value) === '[object WeakMap]'
  },
  isWeakSet(value) {
    return Object.prototype.toString.call(value) === '[object WeakSet]'
  },
  lt (value, other) {
    return value < other
  },
  lte (value, other) {
    return value <= other
  },
  toArray (value) {
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
  },
  toFinite (value) {
    var num = this.toNumber(value)
    if (num > Number.MAX_VALUE) {
      return Number.MAX_VALUE
    }
    if (num < Number.MIN_VALUE) {
      return -Number.MAX_VALUE
    }
    return num
  },
  toInteger (value) {
    var num = this.toFinite(value)
    return Math.floor(num)
  },
  toLength (value) {
    var num = this.toInteger(value)
    if (num < 0) return 0
    if (num > 2 ** 32 - 1) return 2 ** 32 - 1
    return num
  },
  toNumber (value) {
    return Number(value)
  },
  add (augend, addend) {
    return augend + addend
  },
  ceil (number, precision = 0) {
    var d = 10 ** precision
    return Math.ceil(number * d) / d
  },
  divide (dividend, divisor) {
    return dividend / divisor
  },
  floor (number, precision = 0) {
    var d = 10 ** precision
    return Math.floor(number * d) / d
  },
  max (array) {
    if (array.length === 0) {
      return undefined
    }
    return this.maxBy(array, it => it)
  },
  maxBy (array, iteratee = lizaidong.identity) {
    var f = this.iteratee(iteratee)
    return array.reduce((prev, item) => {
      if (f(prev) > f(item)) {
        return prev
      } else {
        return item        
      }
    })
  },
  mean (array) {
    return this.meanBy(array, it => it)
  },
  meanBy (array, iteratee) {
    var f = this.iteratee(iteratee)
    return array.map(f).reduce((prev, item) => prev + item) / array.length
  },
  min (array) {
    if (array.length === 0) {
      return undefined
    }
    return this.minBy(array, it => it)
  },
  minBy (array, iteratee = lizaidong.identity) {
    var f = this.iteratee(iteratee)
    return array.reduce((prev, item) => {
      if (f(prev) < f(item)) {
        return prev
      } else {
        return item
      }
    })
  },
  multiply (augend, addend) {
    return augend * addend
  },
  round (number, precision = 0) {
    var d = 10 ** precision
    return Math.round(number * d) / d
  },
  substract (minuend, substrahend) {
    return minuend - substrahend
  },
  matches (source) {
    return function (object) {
      for (let key in source) {
        if (source[key] !== object[key]) {
          return false
        }
      }
      return true
    }
  },
  matchesProperty (srcValue) {
    return function (path) {
      if (path[srcValue[0]] === srcValue[1]) {
        return true
      }
      return false
    }
  },
  property (path) {
    return function (obj) {
      var ary = path.split('.')
      var key = obj[ary[0]]
      if (ary.length > 1) {
        for (var i = 1; i < ary.length; i++) {
          key = key[ary[i]]
        }
      }
      return key
      // console.log(path)
      // return ary.reduce((obj, item) => obj[item], obj)
    }
  },
  sum (array) {
    return this.sumBy(array, v => v)
  },
  sumBy (array, iteratee) {
    iteratee = lizaidong.iteratee(iteratee)
    let sum = 0
    array.forEach(item => {
      sum += iteratee(item)
    })
    return sum
  },
  iteratee (func) {
    if (typeof func === 'function') {
      return func
    }
    if (typeof func === 'string'){
      return lizaidong.property(func)
    }
    if (Array.isArray(func)) {
      return lizaidong.matchesProperty(func)
    }
    if (typeof func === 'object') {
      return lizaidong.matches(func)
    }
  },
  // 作业：用reduce实现map,filter,forEach,slice,fill,concat....
  map (collection, iteratee = lizaidong.identity) {
    iteratee = lizaidong.iteratee(iteratee)
    var keys = Object.keys(collection)
    return keys.reduce((res, item, index, ary) => {
      res[index] = iteratee(collection[item], item, ary)
      return res
    }, [])
  },
  forEach (collection, iteratee = lizaidong.identity) {
    iteratee = lizaidong.iteratee(iteratee)
    var keys = Object.keys(collection)
    return keys.reduce ((res, item, _, ary) => {
      return iteratee(collection[item], item, ary)
    }, keys)
  },
  forEachRight (collection, iteratee = lizaidong.identity) {
    iteratee = lizaidong.iteratee(iteratee)
    collection = collection.reverse()
    var keys = Object.keys(collection)
    return keys.reduce ((res, item, _, ary) => {
      return iteratee(collection[item], item, ary)
    }, keys)
  },
  filter (collection, predicate = lizaidong.identity) {
    predicate = lizaidong.iteratee(predicate)
    return collection.reduce((res, item, index) => {
      if (predicate(item)) {
        res.push(item)
      }
      return res
    }, [])
  },
  slice (array, start = 0, end = array.length) {
    if (start < 0) start += array.length
    if (end < 0) end += array.length
    return array.reduce ((res, item, index) => {
      if (index >= start && index < end) {
        res.push(item)
      }
      return res
    }, [])
  },
  fill (array, value, start = 0, end = array.length) {
    if (start < 0) start += array.length
    if (end < 0) end += array.length
    return array.reduce((res, item, index) => {
      if (index >= start && index < end) {
        res[index] = value
      }
      return res
    }, array)
  },
  concat (array, ...values) {
    return values.reduce((res, item) => {
      if (this.isArray(item)) {
        res.push(...item)
      } else {
        res.push(item)
      }
      return res
    }, [...array])
  }
}


