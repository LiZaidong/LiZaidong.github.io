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
  // 设置默认值
  defaultTo (value, defaultValue) {
    return !this.isNil(value) && value === value ? value : defaultValue
  },
  // 起始到结束的步数
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
  // 起始到结束的步数的倒序
  rangeRight (start = 0, end, step = 1) {
    return this.range(start, end, step).reverse()
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
  // 按指定的迭代函数的升序排列
  sortBy (collection, iteratees = lizaidong.identity) {
    // var fs = iteratees.map(item => lizaidong.iteratee(item))
    // var keys = Object.keys(collection)
    // var res = keys.map(item => collection[item])
    // for (var i = fs.length - 1; i >= 0; i--) {
    //   res = res.sort(function(a, b) {
    //     return fs[i](a) > fs[i](b)
    //   })
    // }
    // return res
    return this.orderBy(collection, iteratees)
  },
  // 指定排序的迭代函数，并指定迭代函数的升序或降序
  orderBy (collection, iteratees = lizaidong.identity, orders) {
    var fs = iteratees.map(lizaidong.iteratee)
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
  ary (func, num = func.length) {
    return function (...value) {
      return func.apply(null, value.slice(0, num))
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
  // uniqueId (prefix = '') {

  // },
  cloneDeep (value) {
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
          res[item] = lizaidong.cloneDeep(value[item])
        } else {
          res[item] = value[item]
        }
      })
      return res
    } else {
      return value
    }
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
    sources.forEach (item => {
      for (var key in item) {
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
    return value.__proto__ === Object || value.__proto__ === undefined
  },
  isRegExp (value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
  },
  // 安全的整数
  isSafeInteger (value) {
    return this.isInteger(value) && (value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER)
  },
  // 整数
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
  // 转换成数字
  toNumber (value) {
    return Number(value)
  },
  // 加
  add (augend, addend) {
    return augend + addend
  },
  // 向上取整
  ceil (number, precision = 0) {
    var d = 10 ** precision
    return Math.ceil(number * d) / d
  },
  // 除
  divide (dividend, divisor) {
    return dividend / divisor
  },
  // 向下取整
  floor (number, precision = 0) {
    var d = 10 ** precision
    return Math.floor(number * d) / d
  },
  // 求最大值
  max (array) {
    if (array.length === 0) {
      return undefined
    }
    return this.maxBy(array, it => it)
  },
  // 根据迭代函数求最大值
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
  // 求平均值
  mean (array) {
    return this.meanBy(array, it => it)
  },
  // 根据迭代函数求平均值
  meanBy (array, iteratee) {
    var f = this.iteratee(iteratee)
    return array.map(f).reduce((prev, item) => prev + item) / array.length
  },
  // 求最小值
  min (array) {
    if (array.length === 0) {
      return undefined
    }
    return this.minBy(array, it => it)
  },
  // 根据迭代函数求最小值
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
  // 乘
  multiply (augend, addend) {
    return augend * addend
  },
  // 四舍五入
  round (number, precision = 0) {
    var d = 10 ** precision
    return Math.round(number * d) / d
  },
  // 减
  subtract (minuend, substrahend) {
    return minuend - substrahend
  },
  // 数字若超过范围，离哪个最近
  clamp (number, ...args) {
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
  },
  // 判断一个数是否在范围内
  inRange (number, start,end = 0) {
    if (start > end) {
      var temp = end
      end = start
      start = temp
    }
    return number >= start && number < end
  },
  // 是否有浮点数的随机数
  random (...args) {
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
  },
  // 根据字符串形式的路径取对象里的值
  at (object, paths) {
    var fs = [].concat(paths).map(lizaidong.toPath)
    return fs.map(item => lizaidong.get(object, item))
  },
  // 根据路径获取对象的值
  get (object, path, defaultValue) {
    if (typeof path === 'string') {
      path = lizaidong.toPath(path)
    }
    try {
      return path.reduce((obj, item) => obj[item], object)
    } catch (e) {
      return defaultValue
    }
  },
  // 把字符串路径转换成数组
  toPath (value) {
    return value.match(/[^\.\[\] ]+/g)
  },
  once (func) {
    var res
    var flag
    return function (...args) {
      if (!flag) {
        flag = true
        res = func(...args)
      }
      return res
    }
  },
  times (number, iteratee = lizaidong.identity) {
    var f = this.iteratee(iteratee)
    return new Array(number).fill(0).map((_, index) => index).map(f)
  },
  conforms (source) {
    return function (object) {
      for (var key in object) {
        if (source[key]) {
          return source[key](object[key])
        }
      }
    }
  },
  constant (value) {
    return function (object) {
      return value !== undefined ? value : object
    }
  },
  flow (func) {
    return function (...args) {
      var f = func.shift()
      res = f(...args)
      if (func.length > 0) {
        return lizaidong.flow(func)(res)
      } else {
        return res
      }
    }
  },
  method (path, ...args) {
    return function (object) {
      return lizaidong.get(object, path)(...args)      
    }
  },
  methodOf (object, ...args) {
    return function (path) {
      return lizaidong.get(object, path)(...args)
    }
  },
  nthArg (n = 0) {
    return function () {
      if (n < 0) n += arguments.length
      return arguments[n]
    }
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
      return lizaidong.get(obj, path)
    }
  },
  propertyOf (obj) {
    if (!obj) return
    return function (path) {
      return lizaidong.get(obj, path)
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
  // camelCase (string = '') {
  //   var res = string.match(/([A-Za-z]+)/g)
  //   var str = ''
  //   return res.reduce((init, item) => {

  //   })
  // },
  // update (object, path, updater) {
  //   var 
  //   return updater(lizaidong.get(object, path))
  // },
  // 把字符串转换成驼峰
  camelCase (string) {
    var res = string.match(/[a-zA-Z]+/g)
    return res.map(lizaidong.capitalize).join('')
  },
  // 首字母大写其余小写
  capitalize (string = '') {
    return lizaidong.upperFirst(lizaidong.toLower(string))
  },
  escape (string = '') {
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
  },
  escapeRegExp (string) {
    return string.replace(/([\^$.*?\(\)\[\]{}\| ])/g, '\\$1')
  },
  kebabCase (string = '') {
    return lizaidong.lowerCase(string).replace(' ', '-')
  },
  // 字符串分割成空格连接的全小写
  lowerCase (string) {
    var res = string.match(/[a-z]+|[A-Za-z]+/g)
    return res.map(lizaidong.toLower).join(' ')
  },
  // 首字母小写
  lowerFirst (string) {
    return string.replace(/^[A-Z]/, c => c.toLowerCase())
  },
  // 在起始和末尾都添加指定字符直到指定长度，优先满足后面
  pad (string = '', length = 0, chars = ' ') {
    var start_length = Math.floor((length - string.length) / 2) + string.length
    var start = lizaidong.padStart(string, start_length, chars)
    var end = lizaidong.padEnd(start, length, chars)
    return end
  },
  // 在末尾添加指定字符直到达到指定长度，超出截掉末尾的
  padEnd (string = '', length = 0, chars = ' ') {
    while (string.length < length) {
      string = string.replace(/$/, chars)
    }
    return string.slice(0, length)
  },
  // 在起始添加指定字符直到达到指定长度，超出截掉添加的内容的末尾部分
  padStart (string = '', length = 0, chars = ' ') {
    var length_s = string.length
    while (string.length < length) {
      string = string.replace(/^/, chars)
    }
    return string.slice(0, length - length_s) + string.slice(-length_s)
  },
  parseInt (string, radix = 10) {
    return Number(string.toString(radix))
  },
  repeat (string = '', n = 1) {
    var str = ''
    while (n > 0) {
      str += string
      n--
    }
    return str
  },
  replace (string = '', pattern, replacement) {
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
  },
  // 提取字符串中的连续字母，转换成全小写
  snakeCase (string) {
    var pattern = /([A-Z]?[a-z]+)|([a-zA-Z]+)/g
    string = string.match(pattern)
    return string.map(lizaidong.toLower).join('_')
  },
  // 把字符串用分隔符分割成数组
  split (string, separator, limit) {
    limit = limit || Infinity
    var res = []
    var match
    do {
      match = string.match(separator)
      res.push(string.substr(0, match.index))
      string = string.slice(match.index + 1)
    } while (match && res.length < limit)
    return res
  },
  // 提取字符串中的连续字母，首字母大写
  startCase (string = '') {
    var pattern = /([A-Z]?[a-z]+)|([a-zA-Z]+)/g
    string = string.match(pattern)
    return string.map(lizaidong.upperFirst).join(' ').trim()
  },
  // 字符串是否以目标值开头
  startsWith (string = '', target, position = 0) {
    var res = string.match(target)
    if (res) {
      return res.index === position
    }
    return false
  },
  // 全小写
  toLower (string = '') {
    for (var i = 0; i < string.length; i++) {
      if (/[A-Z]/.test(string[i])) {
        string = string.replace(string[i], String.fromCharCode(string[i].charCodeAt(0) + 32))
      }
    }
    return string
  },
  // 全大写
  toUpper (string = '') {
    for (var i = 0; i < string.length; i++) {
      if (/[a-z]/.test(string[i])) {
        string = string.replace(string[i], String.fromCharCode(string[i].charCodeAt(0) - 32))
      }
    }
    return string
  },
  // 去掉前后空格
  trim (string = '', chars = ' ') {
    chars = typeof chars === 'string' ? chars : ' '
    return lizaidong.trimEnd(lizaidong.trimStart(string, chars), chars)
  },
  // 删除字符串起始的空格或指定字符
  trimStart (string = '', chars = ' ') {
    chars = typeof chars === 'string' ? chars : ' '
    while (chars.match(string[0])) {
      string = string.slice(1)
    }
    return string
  },
  // 删除字符串结尾的空格或指定字符
  trimEnd (string = '', chars = ' ') {
    chars = chars ? chars : ' '
    while (chars.match(string[string.length - 1])) {
      string = string.slice(0, string.length - 1)
    }
    return string
  },
  // 根据条件截断字符串
  truncate (string = '', options = {}) {
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

  },
  // 字符串是否以目标字符串在指定位置结尾
  endsWith (string = '', target, position = string.length) {
    var res = string.match(target)
    if (res) {
      return res.index === position - 1
    }
    return false
  },
  // 字符串转成空格分割的全大写
  upperCase (string = '') {
    var res = string.match(/([A-Z]?[a-z]+)/g)
    if (res) {
      return res.reduce ((s, item) =>  s + lizaidong.toUpper(item) + ' ', '').trim()
    }
    return string
  },
  // 首字母大写
  upperFirst (string = '') {
    if (/[a-z]/.test(string[0])) {
      return String.fromCharCode(string.charCodeAt(0) - 32) + string.slice(1)
    }
    return string
  },
  // 把字符串按匹配结果拆分成数组
  words (string = '', pattern = undefined) {
    pattern = pattern || /[A-Z]?[a-z]+/g
    return string.match(pattern)
  },
  // 作业：用reduce实现map,filter,forEach,slice,fill,concat....
  map (collection, iteratee = lizaidong.identity) {
    iteratee = lizaidong.iteratee(iteratee)
    var values = Object.values(collection)
    return values.reduce((res, item, index, ary) => {
      res[index] = iteratee(item, index, ary)
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
