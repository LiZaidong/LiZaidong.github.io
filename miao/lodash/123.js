var LiZaidong = {
  chunk = function (array, size) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      res.push(array.slice(i, size + i))
      i += size - 1
    }
    return res
  }
}