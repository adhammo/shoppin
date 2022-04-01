export const capitalize = str => str.replace(/^\w/, c => c.toUpperCase())

export const firstWordOnly = str => str.replace(/ .*/, '')

export const removeFirstWord = str => str.match(/ (.*)/)?.[1]
