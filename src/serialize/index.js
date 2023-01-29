const DEFAULT_LENGTH = 40

exports.getSerialArr = (serialType, length = DEFAULT_LENGTH) => {
    const startStr = (serialType || '').slice(0, 1) || '1'
    if (isNaN(+startStr)) {
        // 字母类的则转char++
        const startInt = startStr.charCodeAt()
        const packArr = Array.from({ length }).fill(1)
        return packArr.map((_, index) => {
            return String.fromCharCode(startInt + index)
        })
    } else {
        // 数字类的递增直接++
        const packArr = Array.from({ length }).fill(1)
        return packArr.map((_, index) => {
            return (+startStr + index).toString()
        })
    }
}
