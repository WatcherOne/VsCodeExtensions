const DEFAULT_LENGTH = 40

exports.getSerialArr = (serialType, length = DEFAULT_LENGTH) => {
    const startStr = (serialType || '').slice(0, 1) || '1'
    const startInt = startStr.charCodeAt()
    const packArr = Array.from({ length }).fill(1)
    return packArr.map((_, index) => {
        return String.fromCharCode(startInt + index)
    })
}
