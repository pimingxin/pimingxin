

module.exports = function digitWidth(n) {
  if (n == 0) {
    return 1
  }
  var c = 0
  while(n > 0) {
    c++
    n = Math.floor(n/10)
  }
  return c
}