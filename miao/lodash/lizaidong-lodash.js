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
    let val = values.reduce ((res, item) => {
      res = res.concat(item)
      return res
    }, [])
    return array.filter(v => !val.includes(v))
  },
  differenceBy (array, values, iteratee = lizaidong.difference) {
    if (arguments.length === 1) {
      return []
    }
    if (!values) {
      return array
    }
    let res = []
    if (typeof iteratee === 'function') {
      let val = values.map(v => iteratee(v))
      return array.filter(v => this.indexOf(val, iteratee(v)) === -1)
    } else if (typeof iteratee === 'string') {
      array.forEach (v => {
        values.forEach( item => {
          if (v[iteratee]) {
            if (v[iteratee] !== item[iteratee]) {
              res.push(v)
            }
          }
        })
      })
    }
    return res
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
    let res = []
    if (typeof predicate === 'function') {
      array.forEach(item => {
        if (!predicate(item)) {
          res.push(item.user)
        }
      })
    } else if (typeof predicate  === 'string') {
      array.forEach(item => {
        if (predicate in item) {
          res.push(item.user)
        }
      })
    } else if (predicate instanceof Array) {
      predicate = this.fromPairs(predicate)
      array.forEach(item => {
        if (predicate.active === item.active) {
          res.push(item.user)
        }
      })
    } else if (typeof predicate === 'object') {
      array.forEach(item => {
        if (lizaidong.isEqual(item, predicate)) {
          res.push(item.user)
        }
      })
    }
    return res
  },

  // dropWhile
  // findIndex (array, predicate, fromIndex = 0) {},
  // findLastIndex
  head (array) {
    return array[0]
  },
  flatten (array) {
    // return [].concat(...array)
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
  // flattenDeep (array) {
  //   let res = []
  //   for (let i = 0; i < array.length; i++) {
  //     if (Array.isArray(array[i])) {
  //       let tmp = flattenDeep(array[i])
  //       res.push(...tmp)
  //     } else {
  //       res.push(array[i])
  //     }
  //   }
  //   return res
  // },
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
    if (fromIndex < 0) {
      for (let i = fromIndex + array.length; i >= 0; i--) {
        if (array[i] === value) {
          return i
        }
      }
      return -1
    } else {
      for (let i = fromIndex; i < array.length; i++) {
        if (array[i] === value) {
          return i
        }
      }
      return -1
    }
  },
  initial (array) {
    return array.slice(0, -1)
  },
  intersection (...array) {
    const res = []
    let index = 0
    for (let i = 0; i < array[0].length; i++) {
      index = 0
      for (let j = 1; j < array.length; j++) {
        if (!array[j].includes(array[0][i])) {
          break
        } else {
          index++
        }
      }
      if (index === array.length - 1) {
        res.push(array[0][i])
      }
    }
    return res
  },
  intersecrionBy (array, values, iteratee = lizaidong.difference) {
    if (arguments.length === 1) {
      return array
    }
    if (!values) {
      return []
    }
    let res = []
    if (typeof iteratee === 'function') {
      let val = values.map(v => iteratee(v))
      return array.filter(v => this.includes(val, iteratee(v)))
    } else if (typeof iteratee === 'string') {
      array.forEach (v => {
        values.forEach( item => {
          if (v[iteratee]) {
            if (v[iteratee] === item[iteratee]) {
              res.push(v)
            }
          }
        })
      })
    }
    return res
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
    return array.filter(v => !values.includes(v))
  },
  pullAll (array, values) {
    return array.filter(v => !this.includes(values, v))
  },
  // pullAllWith

  // pullAt (array, indexs) {
  //   var res = []
  //   var len = array.length
  //   for (let i = 0; i < len; i++) {
  //     if (this.includes(indexs, i)) {
  //       res.push(array[i])
  //     } else {
  //       array.push(array[i])
  //     }
  //   }
  //   array = array.slice(len)
  //   console.log(array)
  //   return res
  // },
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
    if (value <= array[0]) return 0
    if (value > array[array.length - 1]) return array.length
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
      if (array[i] < value && value < array[i + 1]) {
        return i + 1
      }
    }
  },
  sortedLastIndex (array, value) {
    if (value <= array[0]) return 0
    if (value > array[array.length - 1]) return array.length
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
      if (array[i] < value && value < array[i + 1]) {
        return i + 1
      }
    }
  },
  sortedUniq (array) {
    return this.sortedUniqBy(array, item => item)
  },
  sortedUniqBy (array, iteratee) {
    let ary = array.map(item => iteratee(item))
    let res = []
    for (let i = 1; i < ary.length; i++) {
      if (ary[i] === ary[i - 1]) {
        res.push(array[i - 1])
      }
    }
    return res
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
    let ary = arrays.reduce((res, item) => {
      res = res.concat(item)
      return res
    }, [])
    return Array.from(new Set(ary))
  },
  unionBy (array, iteratee) {
    if (typeof iteratee === 'function') {
      this.sortedUniqBy(array, iteratee)
    } else if (typeof iteratee === 'string') {

    }
  },
  uniq (array) {
    return Array.from(new Set(array))
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
        if (!isEqual(value[i], other[i])) {
          return false
        }
      }
      return false
    }
    if (typeof value === 'object' && typeof other === 'object') {
      if (Object.keys(value).length !== Object.keys(other).length) return false
      for (let key in value) {
        if (!isEqual(value[key], other[key])) {
          return false
        }
      }
      return true
    }
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
    typeof value === "boolean"
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
    }catch (error){
      return true
    }
  },
  isError (value) {
    return Object.prototype.toString.call(value) === "[object Error]"
  },
  isFinite (value) {
    if (!isNaN(value)) {
      if (value !== Infinity && value !== -Infinity) {
        return true
      } else {
        return false
      }
    } else
      return false
  },
  isFunction (value) {
    return Object.prototype.toString.call(value) === "[object Function]"
  },
  isInteger (value) {
    return Number.isInteger(value)
  },
  sum (array) {
    return this.sumBy(array, v => v)
  },
  sumBy (array, iteratee) {
    let sum = 0
    array.forEach(item => {
      sum += iteratee(item)
    })
    return sum
  },

  add (augend, addend) {
    return augend + addend
  },
  // 作业：用reduce实现map,filter,forEach,slice,fill,concat....
  // map (collection, iteratee = lizaidong.identity) {},
  // filter (collection, iteratee = lizaidong.identity) {},
  forEach (collection, iteratee = lizaidong.identity) {},
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

console.log(lizaidong.zip(["a","b"],[1,2],[true,false]))


