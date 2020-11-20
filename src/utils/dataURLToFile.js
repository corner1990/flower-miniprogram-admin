function dataURLtoBlob(dataurl) {
  dataurl = dataurl.replace(/%0A|\s/g,'')
  var arr = dataurl.split(',') //注意base64的最后面中括号和引号是不转译的

  var _arr = arr[1].substring(0, arr[1].length - 2)

  var mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(_arr),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new Blob([u8arr], {
    type: mime
  })
}

/**
 *
 * @param {String} dataurl base64的url
 * @param {String} filename 文件名
 */
function dataURLtoFile(dataurl, filename) {
  // console.log(dataurl)
  const blob = dataURLtoBlob(dataurl)

  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  //   bstr = atob(arr[1]),
  //   n = bstr.length,
  //   u8arr = new Uint8Array(n)

  // while (n--) {
  //   u8arr[n] = bstr.charCodeAt(n)
  // }

  return new File([blob], filename, { type: mime })
}

export default dataURLtoFile