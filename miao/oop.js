function MyArray (...vals) {
  // if (vals.length > 1) {
    for (var i = 0; i < vals.length; i++) {
      this[i] = vals[i]
    }
  // }
}

// Object.defineProperty(MyArray.prototype, 'length', {
//   writable: rtue,
// })
MyArray.prototype = {
  get length () {
    return Object.keys(this).length || 0
  },
  set length (val) {
    var l = this.length
    if (val < l) {
      for (var i = val; i < l; i++) {
        delete this[i]
      }
      // return this.length
    } else {
      for (var i = l; i < val; i++) {
        this[i] = undefined
      }
    }
  },
  fill (value, start = 0, end = this.length) {
    var l = this.length
    for (var i = start; i < end; i++) {
      this[i] = value
    }
    return this
  },
  push () {
    for (var i = 0; i < arguments.length; i++) {
      this[this.length] = arguments[i]
    }
    return this.length
  },
  pop () {
    if (this.length > 0) {
      var temp = this[this.length - 1]
      delete this[this.length - 1]
      return temp
    }
  },
  unshift () {
    var l = this.length
    var keys = Object.keys(arguments)
    for (var i = l - 1; i >= 0; i--) {
      this[i + keys.length] = this[i]
    }
    for (var j = 0; j < keys.length; j++) {
      this[j] = arguments[keys[j]]
    }
    return this.length
  },
  shift () {
    if (this.length > 0) {
      var temp = this[0]
      delete this[0]
      for (var i = 0; i < this.length; i++) {
        this[i] = this[i + 1]
        delete this[i + 1]
      }
      return temp
    }
  },
  reverse () {
    var l = this.length
    for (var i = 0; i < l / 2; i++) {
      var tmp = this[i]
      this[i] = this[l - i - 1]
      this[l - i - 1] = tmp
    }
    return this
  },
  forEach (callback, thisArg = this) {
    var keys = Object.keys(this)
    for (var i = 0; i < keys.length; i++) {
      callback(this[keys[i]], keys[i], this)
    }
  },
  join (separator = ',') {
    var str = this[0]
    var l = this.length
    for(var i = 1; i < l; i++) {
      str += separator + this[i]
    }
    return str
  },
  keys () {
    var keys = Object.keys(this)
    return new MyArray(...keys)
  },
  concat () {
    var l = arguments.length
    var ary = this.slice()
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'object') {
        var keys = arguments[i].keys()
        for (var j = 0; j < keys.length; j++) {
          ary.push(arguments[i][keys[j]])
        }
      } else {
        ary.push(arguments[i])
      }
    }
    return ary
  },
  indexOf (item, start = 0) {
    var l = this.length
    for (var i = start; i < l; i++) {
      if (item === this[i]) {
        return i
      }
    }
    return -1
  },
  lastIndexOf (item, end = thie.length - 1) {
    for (var i = end; i >= 0; i--) {
      if (item === this[i]) {
        return i
      }
    }
    return -1
  },
  includes (item, start = 0) {
    return this.indexOf(item, start) > -1
  },
  slice (start = 0, end = this.length - 1) {
    var l = this.length
    var res = new MyArray()
    if (start < 0) strat += l
    if (end < 0) end += l
    for (var i = start; i <= end; i++) {
      res.push(this[i])
    }
    return res
  },
  splice (start, deleteCount = this.length - 1,...args) {
    console.log(arguments.length)
    var res = new MyArray()
    var l = this.length
    // 截取的在前面
    if (start === 0 && deleteCount > 0) {
      for (var i = start; i < deleteCount; i++) {
        res.push(this.shift())
      }
      this.unshift(...args)
    } else if (start >= l - 1) {
      // 结尾
      this.push(...args)
    } else {
      // 中间
      var rest = this.slice(start + deleteCount)
      var right = new MyArray(...args).concat(rest)
      for (var i = l - 1; i >= start; i--) {
        if (i <= start + deleteCount - 1) {
          res.unshift(this.pop())  
        } else {
          this.pop()
        }
      }
      for (var j = 0; j < right.length; j++) {
        this.push(right[j])
      }
    }
    return res
  },
  sort (func = it => it) {
    
  },
} 


function MyMap (val) {
  if (val !== undefined) {
    for (var item of val) {
      this[item[0]] = item[1]
    }
  }
}

MyMap.prototype = {
  get size () {
    return Object.keys(this).length || 0
  },
  clear () {
    var keys = Object.keys(this)
    for (var i = 0; i < keys.length; i++) {
      delete this[keys[i]]
    }
  },
  delete (key) {
    return delete this[key]
  },
  forEach (callback, thisArg = this) {
    var keys = Object.keys(this)
    for (var i = 0; i < keys.length; i++) {
      callback(this[keys[i]], keys[i], this)
    }
  },
  get (key) {
    return this[key] 
  },
  has (key) {
    var keys = Object.keys(this)
    return keys.includes(key)
  },
  set (key, value) {
    this[key] = value
    return this
  },
  keys () {
    return Object.keys(this)
  },
  values () {
    var keys = Object.keys(this)
    return keys.map(item => {
      return this[item]
    })
  }
}

function MySet (val) {
  if (val !== undefined) {
    for (var item of val) {
      this[item] = item
    }
  }
}

MySet.prototype = {
  get size () {
    return Object.keys(this).length
  },
  add (value) {
    this[value] = value
    return this
  },
  clear () {
    var keys = Object.keys(this)
    for (var i = 0; i < keys.length; i++) {
      delete this[keys[i]]
    }
  },
  delete (key) {
    return delete this[key]
  },
  forEach (callback, thisArg = this) {
    var keys = Object.keys(this)
    for (var i = 0; i < keys.length; i++) {
      callback(this[keys[i]], keys[i], this)
    }
  },
  has (key) {
    var keys = Object.keys(this)
    return keys.includes(key)
  },
  values () {
    return Object.keys(this)
  }
}