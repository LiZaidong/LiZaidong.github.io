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
    return this.differenceBy(array, [].concat(...values, it => it))
  },
  differenceBy (array, ...args) {
    let iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    iteratee = this.iteratee(iteratee)
    return array.filter(item => {
      var ary = [].concat(...args).map(arg => iteratee(arg))
      return !ary.includes(iteratee(item))
    })
  },
  differenceWith (array, values, comparator) {
    return array.filter()
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
    const res = []
    for (let i = 0; i < array.length; i++) {
      if (lizaidong.isArray(array[i])) {
        res.push(...array[i])
      } else {
        res.push(array[i])
      }
    }
    return res
  },
  flattenDeep (array) {
    const res = []
    iterate(array)
    function iterate (ary) {
      ary.forEach(v => {
        if (lizaidong.isArray(v)) {
          iterate(v)
        } else {
          res.push(v)
        }
      })
    }
    return res
  },
  flattenDepth (array, depth = 1) {
    const res = []
    let count = 0
    iterate(array)
    function iterate (ary) {
      count++
      ary.forEach(v => {
        if (lizaidong.isArray(v)) {
          if (count >= depth) {
            res.push(...v)
          } else {
            iterate(v)
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
    return this.intersectionBy(array[0], [].concat(...array.slice(1), it => it))
  },
  intersectionBy (array, ...args) {
    let iteratee = null
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
    } else {
      iteratee = lizaidong.identity
    }
    iteratee = this.iteratee(iteratee)
    return array.filter(item => {
      var ary = [].concat(...args).map(arg => iteratee(arg))
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
        res = res.concat(array.splice(i, 1))
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
      if (f(value) === f(array[i]) || f(value) < f(array[i])) {
        return i
      }
    }
    return i - 1
  },
  sortedIndexOf (array, value) {
    var index = 0
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
    if (value <= array[0]) return 0
    if (value > array[array.length - 1]) return array.length
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        return i + 1
      }
      if (array[i] < value && value < array[i + 1]) {
        return i
      }
    }
  },
  sortedLastIndexBy (array, value, iteratee = lizaidong.identity) {
    
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
  union (...arrays) {
    // let ary = arrays.reduce((res, item) => {
    //   res = res.concat(item)
    //   return res
    // }, [])
    // return Array.from(new Set(ary))
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
  xor (...arrays) {
    let res = [].concat(...arrays)
    return res.filter((item, index, ary) => ary.indexOf(item) === ary.lastIndexOf(item))
  },
  keyBy (collectiion, iteratee = lizaidong.identity) {
    iteratee = this.iteratee(iteratee)
    return collectiion.reduce((map, item) => {
      map[iteratee(item)] = item
      return map
    }, {})
  },
  groupBy (collectiion, iteratee = lizaidong.identity) {
    iteratee = this.iteratee(iteratee)
    return collectiion.reduce ((map, item) => {
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
  flip (func) {
    return function (...args) {
      return func(args.reverse())
    }
  },
  spread (func, start = 0) {
    return function (args) {
      return func.apply(null, [...args].slice(start))
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
  includes (collectiion, value, fromIndex = 0) {
    if (Object.prototype.toString.call(collectiion) === '[object Object]') {
      let count = 0
      for (let i in collectiion) {
        if (count === fromIndex) {
          if (collectiion[i] === value) {
            return true
          }
        } else {
          count++
        }
      }
      return false
    } else {
      return lizaidong.indexOf(collectiion, value, fromIndex) > -1
    }
  },
  // slice (array, start = 0, end = array.length) {
  //   const res = []
  //   start = start < 0 ? start + array.length : start
  //   end = end < 0 ? end + array.length : end
  //   end = end > array.length ? array.length : end
  //   for (let i = start; i < end; i++) {
  //     res.push(array[i])
  //   }
  //   return res
  // },
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
      if (source[key] !== object[key]) {
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
    return Object.prototype.toString.call(value) === '[object Object]'
  },
  matches (source) {
    return function (object) {
      for (let key in source) {
        if (source[key] === object[key]) {
          return true
        } else {
          return false
        }
      }
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
      return obj[path]
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
  add (augend, addend) {
    return augend + addend
  },
  // 作业：用reduce实现map,filter,forEach,slice,fill,concat....
  map (collection, iteratee = lizaidong.identity) {
    iteratee = lizaidong.iteratee(iteratee)
    return collection.reduce((res, item, index) => {
      res[index] = iteratee(item)
      return res
    }, [])
  },
  forEach (collection, iteratee = lizaidong.identity) {
    iteratee = lizaidong.iteratee(iteratee)
    return collection.reduce ((res, item, ary) => {
      return iteratee(item, index, ary)
    }, collection)
  },
  filter (collectiion, predicate = lizaidong.identity) {
    predicate = lizaidong.iteratee(predicate)
    return collectiion.reduce((res, item, index) => {
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


