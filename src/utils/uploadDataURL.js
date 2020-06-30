import dataURLToFile from './dataURLToFile'
import uploadOSS from './uploadOSS'
import {nanoid} from 'nanoid'

const uploadDataURL = async (dataURL, bucket)=>{
  const extname = '.'+dataURL.match(/data:image\/(\w+)/)[1]
  console.log( extname )
  const filename = nanoid()
  const file = dataURLToFile(dataURL, filename)
  const res = await uploadOSS(bucket+filename+extname, file)
  return res.url
}

export default uploadDataURL