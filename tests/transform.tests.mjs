import test from 'tape'
import j2j from '../src/transform'


test('null-null', (t) => {
    var result = j2j().transform(null, null)
    t.deepEqual(result, {})
    t.end()
})

test('null-data', (t) => {
    var result = j2j().transform(null, {a:'a'})
    t.deepEqual(result, {a:'a'})
    t.end()
})

test('empty-empty', (t) => {
    var result = j2j().transform({}, {})
    t.deepEqual(result, {})
    t.end()
})

test('empty-!empty', (t) => {
    var result = j2j().transform({}, {at:'a'})
    t.deepEqual(result, {at:'a'})
    t.end()
})

test('object', (t) => {
    var result = j2j().transform({a:'b'}, {bt:'a', ct:'a'})
    t.deepEqual(result, {bt:'b',ct:'b'})
    t.end()
})

test('object-of-object', (t) => {
    let data = {a : {aa:'aavalue'}}
    let map = {'at:a':{aat : 'aa'}}
    let expected = {at : {aat:'aavalue'}}
    var result = j2j().transform(data, map)
    t.deepEquals(result, expected)
    t.end()
})

test('arrays', (t) => {
    let data = [{a : 'value1'}, {a : 'value2'}]
    let map = {at:'a'}
    let expected = [{at : 'value1'}, {at : 'value2'}]
    var result = j2j().transform(data, map)
    t.deepEquals(result, expected)
    t.end()
}) 

test('objects-of-arrays', (t) => {
    let data = { a0 : [{b0 : 'value1'}, {b0 : 'value2'}],
                 a1 : [{b1 : 'valueb1'}]}
    let map = { 'a0t:a0' : {b0t:'b0'},  a1t : 'a1'}
    let expected = { a0t : [{b0t : 'value1'}, {b0t : 'value2'}], a1t: [{b1 : 'valueb1'}]}
    var result = j2j().transform(data, map)
    t.deepEquals(result, expected)
    t.end()
}) 

test('arrays-of-objects', (t) => {
    let data = [{ a: { b: 'value' } }]
    let map = { 'at:a' : {bt:'b'}}
    let expected = [{ at: { bt: 'value' } }]
    var result = j2j().transform(data, map)
    t.deepEquals(result, expected)
    t.end()
}) 
