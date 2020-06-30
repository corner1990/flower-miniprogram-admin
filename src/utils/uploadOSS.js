import { getOssSign } from '../api/OSS'
import OSS from 'ali-oss'
import { Message } from 'element-ui'

const getClient = async () => {
  // 先获取OSS的accessKey和Secret
  const { errorCode, data } = await getOssSign()

  // 获取成功后返回实例
  if (errorCode === 0) {
    const { securityToken, accessKeyId, accessKeySecret, bucket, endpoint } = data

    // 创建OSS实例
    const client = new OSS({
      endpoint,
      accessKeyId,
      accessKeySecret,
      bucket,
      stsToken: securityToken
    })

    return client
  }
}


/**
 * 
 * @param {String} filename ipxmall/bucket/filename
 * @param {File} file file对象
 */
const uploadOSS = async (filename, file)=>{
  try {
    const client = await getClient()
    const res = await client.put(filename, file)
    if(res.res.status === 200){
      return res
    }else {
      throw Error('上传OSS失败')
    }
  }catch (err){
    Message.error(err.message)
    console.log( err )
  }
}

export default uploadOSS
