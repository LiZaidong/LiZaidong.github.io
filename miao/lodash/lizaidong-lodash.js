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
  differenceWith (array, values, comparator) {},
  drop (array, n = 1) {
    return array.slice(n)
  },
  dropRight (array, n = 1) {
    // return array.reverse().slice(n).reverse()
    return n === 0 ? array : array.slice(0, -n)
  },
  // dropRightWhile
  // dropWhile

  // fill (array, value, start = 0, end = array.length) {
  //   for (let i = start; i < end; i++) {
  //     array[i] = value
  //   }
  //   return array
  // },
  // findIndex
  // findLastIndex
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
  sum (array) {
    return array.reduce((prev, curr) => prev + curr)
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
    return this.uniq(array)
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
      let isTure = temp.filter(item => item !== undefined)
      if (isTure.length > 0) {
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
      if (temp.length > 0) {
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
  isEqual (value, other) {
    if (value !== value && other !== other) {
      return true
    }
    if (value === other) {
      return true
    }
    if (typeof value === 'object') {
      let vtype = Object.prototype.toString.call(value)
      let otype = Object.prototype.toString.call(other)
      if (vtype === otype) {
        if (vtype === '[object Array]') {
          if (value.length === other.length) {
            return value.every((v, i) => v === other[i])
          } else {
            return false
          }
        } else if (vtype === '[object Object]') {
          for (let i in value) {
            if (value[i] !== other[i]) {
              return false
            }
          }
          return true
        }
      } else {
        return false
      }
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
  isArray (value) {
    return Object.prototype.toString.call(value) === '[object Array]'
  },

  add (augend, addend) {
    return augend + addend
  },
  // 作业：用reduce实现map,filter,forEach,slice,fill,concat....
  map (collection, iteratee = lizaidong.identity) {},
  filter (collection, iteratee = lizaidong.identity) {
    return
  },
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

console.log(lizaidong.takeRight([1,2,3],0))


