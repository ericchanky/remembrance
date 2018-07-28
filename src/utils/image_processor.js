import mapSeries from 'async/mapSeries'

const getOutputSize = (image) => {
  const widthRatio = screen.width / image.width
  const heightRatio = screen.height / image.height

  if (widthRatio < 1 && heightRatio < 1) {
    if (widthRatio < heightRatio) {
      return [screen.width, image.height * widthRatio]
    } else {
      return [image.width * heightRatio, screen.height]
    }
  } else {
    return [image.width, image.height]
  }
}

const readImage = (file) => new Promise((resolve) => {
  const reader = new FileReader()

  reader.onload = evt => resolve(evt.target.result)

  reader.readAsDataURL(file)
})

const resize = (img, type = 'image/jpeg') => new Promise((resolve) => {
  const image = new Image()

  image.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const [width, height] = getOutputSize(image)

    canvas.width = width
    canvas.height = height

    ctx.drawImage(image, 0, 0, width, height)
    resolve(canvas.toDataURL(type))
  }

  image.src = img
})

export default (files, progress) => new Promise((resolve, reject) => {
  mapSeries(files, (file, cb) => {
    Promise.resolve()
      .then(() => {
        if (typeof progress === 'function') progress()
      })
      .then(() => readImage(file))
      .then(img => resize(img, file.type))
      .then(res => cb(null, res))
  }, (err, results) => {
    if (err != null) {
      reject(err)
    } else {
      resolve(results)
    }
  })
})
