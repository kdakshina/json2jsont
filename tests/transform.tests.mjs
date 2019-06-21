import test from 'tape'
import j2j from '../src/transform'

test('null', (t) => {
    var result = j2j().transform(null, null)
    t.deepEqual(result, {})
    t.end()
}),

test('null-data non-empty-map', (t) => {
    var result = j2j().transform(null, {a:'a'})
    t.deepEqual(result, {a:'a'})
    t.end()
}),

test('empty', (t) => {
    var result = j2j().transform({}, {})
    t.deepEqual(result, {})
    t.end()
}),

test('empty-data non-empty-map', (t) => {
    var result = j2j().transform({}, {a:'a'})
    t.deepEqual(result, {a:'a'})
    t.end()
}),

test('simple', (t) => {
    var result = j2j().transform({a:'b'}, {b:'a'})
    t.deepEqual(result.b, 'b')
    t.end()
}),
test('object-within-object', (t) => {
    let data = {a : {aa:'aavalue'}}
    let map = {'at:a':{aat : 'aa'}}
    let expected = {at : {aat:'aavalue'}}
    var result = j2j().transform(data, map)
    t.deepEquals(result, expected)
    t.end()
}) 
