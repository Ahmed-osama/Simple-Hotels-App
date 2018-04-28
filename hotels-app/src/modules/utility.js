export default {
  formatDate (date) {
    date = new Date(date)
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yyyy = date.getFullYear()
    dd = dd < 10 ? '0' + dd : dd
    mm = mm < 10 ? '0' + mm : mm
    return dd + '-' + mm + '-' + yyyy
  },
  toDate (date) {
    let parts = date.split('-')
    return new Date(parts[2], parts[1] - 1, parts[0])
  },
  isDateInRange (userRange, AvilableRange) {
    let userFrom = this.toDate(userRange.from)
    let userTo = this.toDate(userRange.to)
    let avilableFrom = this.toDate(AvilableRange.from)
    let avilableTo = this.toDate(AvilableRange.to)
    return (userFrom >= avilableFrom && userTo <= avilableTo)
  },
  getDaysLengthBetween (startDate, EndDate) {
    console.log(startDate, EndDate)
    startDate = this.toDate(startDate).getTime()
    EndDate = this.toDate(EndDate).getTime()
    console.log(startDate, EndDate)
    return Math.round((EndDate - startDate) / 1000 / 60 / 60 / 24)
  },
  sortby: {
    'assending': (a, b) => {
      a = a.name.toLowerCase()
      b = b.name.toLowerCase()
      if (a < b) return -1
      if (a > b) return 1
      return 0
    },
    'descending': (a, b) => {
      a = a.name.toLowerCase()
      b = b.name.toLowerCase()
      if (a > b) return -1
      if (a < b) return 1
      return 0
    },
    'lowest': (a, b) => {
      return a.price - b.price
    },
    'highest': (a, b) => {
      return b.price - a.price
    }
  }
}
