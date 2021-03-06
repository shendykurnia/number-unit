import test from 'tape-catch'
import { bitcoin } from './_fixtures'
import NumberUnit from '../'

test('should not error out on significant figures', function (t) {
  let isNumberUnit = function (x) {
    return x !== undefined && x !== null && x.constructor && x.constructor.name === NumberUnit.name
  }

  const maxSafeInteger = Number.MAX_SAFE_INTEGER !== undefined ? Number.MAX_SAFE_INTEGER : 9007199254740991
  const minSafeInteger = Number.MIN_SAFE_INTEGER !== undefined ? Number.MIN_SAFE_INTEGER : -9007199254740991

  let b1 = null
  let error1 = false
  try {
    b1 = bitcoin.BTC(maxSafeInteger)
  } catch (e) {
    error1 = true
  }
  t.ok(error1 === false && isNumberUnit(b1), 'Creation of NumberUnit with number Number.MAX_SAFE_INTEGER was successful')

  let b2 = null
  let error2 = false
  try {
    b2 = bitcoin.BTC(maxSafeInteger + 1)
  } catch (e) {
    error2 = true
  }
  t.ok(error2 === true && !isNumberUnit(b2), 'Creation of NumberUnit with number (Number.MAX_SAFE_INTEGER + 1) should throw an error')

  let b3 = null
  let error3 = false
  try {
    b3 = bitcoin.BTC(maxSafeInteger + '.1')
  } catch (e) {
    error3 = true
  }
  t.ok(error3 === true && !isNumberUnit(b3), 'Creation of NumberUnit with number (Number.MAX_SAFE_INTEGER + .1) should throw an error')

  let b4 = null
  let error4 = false
  try {
    b4 = bitcoin.BTC(minSafeInteger)
  } catch (e) {
    error4 = true
  }
  t.ok(error4 === false && isNumberUnit(b4), 'Creation of NumberUnit with number Number.MIN_SAFE_INTEGER was successful')

  let b5 = null
  let error5 = false
  try {
    b5 = bitcoin.BTC(minSafeInteger - 1)
  } catch (e) {
    error5 = true
  }
  t.ok(error5 === true && !isNumberUnit(b5), 'Creation of NumberUnit with number (Number.MIN_SAFE_INTEGER - 1) should throw an error')

  t.end()
})
