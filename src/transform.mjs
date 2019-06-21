import jp from 'jsonpath'
const reserved = {
    'null': null,
    'void': void (0),
    'true': true,
    'false': false
}
export default () => {
    return {
        isObject(value) {
            return value && typeof value === 'object' && value.constructor === Object
        },

        isString(value) {
            return typeof value === 'string' || value instanceof String
        },

        isUndefined(value) {
            return typeof value === 'undefined'
        },

        evaluate_undefined(data, key) {
            return null
        },


        evaluate_object(data, key) {
            return key
        },

        evaluate_string(data, key) {
            let keys = key.split('||')
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i].replace(/(^\s+|\s+$)/g, '')
                if (Object.keys(reserved).indexOf(k) >= 0) {
                    return reserved[k]
                }
                var val = jp.value(data, k)
                if (!this.isUndefined(val)) {
                    return val
                } else {
                    return k
                }
            }
        },

        evaluateValue(data, key) {
            if (data === null) return
            return this['evaluate_' + typeof key](data, key)
        },

        evaluateKeys(map, key) {
            let [tgtKey, srcKey] = key.split(':')
            srcKey = srcKey || map[key]
            if (this.isObject(srcKey)) {
                srcKey = tgtKey
            }
            return [tgtKey, srcKey]
        },

        transform(input, map) {
            let output = {}
            map = map || {}
            input = input || {}
            Object.keys(map).map((key) => {
                let [targetKey, sourceKey] = this.evaluateKeys(map, key)
                let sourceObject = this.evaluateValue(input, sourceKey)
                if (Array.isArray(input[sourceKey]) && this.isObject(map[key])) {
                    output[targetKey] = sourceObject.map((dataItem, index) => {
                        return this.transform(dataItem, map[key])
                    })
                    //console.log('ARRAY => ' + [targetKey, sourceKey, output[targetKey]])
                } else if (this.isObject(input[sourceKey]) && this.isObject(map[key])) {
                    output[targetKey] = this.transform(sourceObject, map[key])
                    //console.log('OBJECT => ' + [targetKey, sourceKey, output[targetKey]])
                } else {
                    output[targetKey] = sourceObject
                    //console.log('PROPERTY => ' + [targetKey, sourceKey, output[targetKey]])
                }
                //console.log([targetKey, sourceKey, output[targetKey]])
            })
            return output
        }
    }
}