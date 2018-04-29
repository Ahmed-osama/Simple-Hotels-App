import util from '../../../src/modules/utility'

test('get day length between 2 dates', () => {
  expect(util.getDaysLengthBetween('17-10-2018', '20-10-2018')).toBe(3)
})

test('is daterange is in other date range', () => {
  expect(util.isDateInRange(
    {
      from: '11-10-2020',
      to: '13-10-2020'
    },
    {
      from: '10-10-2020',
      to: '15-10-2020'
    }
  )).toBeTruthy()
})

test('is it return date', () => {
  expect(util.toDate('01-10-2018')).toEqual(new Date(2018, 9, 1))
})

test('date format to match dd-mm-yyy', () => {
  expect(util.formatDate('Sun Apr 29 2018 03:37:53 GMT+0200 (Egypt Standard Time)')).toBe('29-04-2018')
})

test('sort lowest', () => {
  expect([{ price: 5 }, { price: 3 }, { price: 1 }].sort(util.sortby.lowest)).toEqual([{ price: 1 }, { price: 3 }, { price: 5 }])
})

test('sort highest', () => {
  expect([{ price: 3 }, { price: 6 }, { price: 9 }].sort(util.sortby.highest)).toEqual([{ price: 9 }, { price: 6 }, { price: 3 }])
})

test('sort assending', () => {
  expect([{name: 'c'}, {name: 'a'}, {name: 'b'}].sort(util.sortby.assending)).toEqual([{name: 'a'}, {name: 'b'}, {name: 'c'}])
})

test('sort descending', () => {
  expect([{name: 'c'}, {name: 'a'}, {name: 'b'}].sort(util.sortby.descending)).toEqual([{name: 'c'}, {name: 'b'}, {name: 'a'}])
})
