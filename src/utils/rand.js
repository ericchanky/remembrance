export const rand = n => Math.random() * n

export const randInt = n => Math.floor(rand(n))

export const randWith = list => list[randInt(list.length)]

export const randWithObj = obj => obj[randWith(Object.keys(obj))]

export const randColor = () => randInt(255)

export const randRGB = () => `${randColor()},${randColor()},${randColor()}`

export const randRGBA = (alpha) => `${randRGB()},${alpha}`
