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

        transform(data, map) {
            map = map || {}
            data = data || {}
            //console.log([input, map])
            if (Array.isArray(data)) {
                return data.map((dataItem, index) => {
                    return this.transform(dataItem, map)
                })
            } else {
                let output = {}
                Object.keys(map).map((key) => {
                    let [targetKey, sourceKey] = this.evaluateKeys(map, key)
                    output[targetKey] = this.isObject(map[key])
                        ? this.transform(data[sourceKey], map[key])
                        : this.evaluateValue(data, sourceKey)
                })
                //console.log('OBJECT => ' + JSON.stringify(output))
                return output
            }
        }
    }
}