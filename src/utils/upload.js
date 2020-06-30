/* eslint-disable */

import request from '@/utils/request'

const getOssSign =  () => request.get('/api/system/aliyun/getOssSign')
/**
 * @desc 收藏
 * @param {*} params 
 */
const collect =  (params) => request.post('/api/feed/collect/collect', params)
/**
 * @desc 收藏
 * @param {*} params 
 */
const cancelCollect =  (params) => request.post('/api/feed/collect/cancelCollect', params)
/**
 * @desc 物料视频上传地址和凭证
 * @param {*} params 
 */
const createUploadVideo =  (params) => request.post('/api/system/media/createUploadVideo', params)
/**
 * @desc 刷新物料视频上传地址和凭证
 * @param {*} params 
 */
const refreshUploadVideo =  (params) => request.post('/api/system/media/refreshUploadVideo', params)

/**
 * @desc 物料图片上传地址和凭证
 * @param {*} params 
 */
const createUploadImage =  (params) => request.post('/api/system/media/createUploadImage', params)


/**
 * @desc 上传视频
 */

 /**
  * 
  * // 创建上传实例
    const upload = new upload({
      change({type, uploadInfo}) { // 发生变化的时候出发
        
        if (type === 'onUploadSucceed') {
          console.log(uploadInfo, self.imageFileList)
        }
      },
      start(option) {  // 开始上传变化的时候
        console.log('start', option)
      },
      end(option) { // 上传结束上传变化的时候
        console.log('end', args)
      },
      success(option){ // 上传成功},
      progress(option) { // 上传进度
        console.log('progress', option)
      } 
    })
    // 添加文件
    upload.addFile(file)
    // 开始上传
    upload.autoUpload()
    // 暂停上传
    upload.pauseUpload()
    // 恢复上传
    upload.resumeUpload ()
  */
class upLoad {
  options = {
    timeout: '',
    partSize: '',
    parallel: '',
    retryCount: '',
    retryDuration: '',
    region: 'cn-shanghai',
    userId: '1466115486763096',        
    stsProgress: 0,
    uploadDisabled: true,
    resumeDisabled: true,
    pauseDisabled: true,
    statusText: ''
  }
  videoId = ''
  uploader = null
  orginFile = null
  isUpload = false
  fileList = [] // 文件列表
  waitList = []
  constructor(options = {}) {
    Object.keys(options).map(key => this[key] = options[key])
    
    console.log('init upLoad')
  }
  change() {}
  start() {}
  end() {}
  success() {}
  progress() {}
  // 添加需要上传的文件
  addFile (file) {
    if (Array.isArray(file)) {
      this.waitList = [...this.waitList, ...Array.from(file)]
      // 图片的话需要判断是否有文件正在上传
      if (!this.orginFile) {
        // debugger
        let currFile = this.waitList.shift()
        debugger
        this.file = currFile.file
        this.orginFile = currFile
      }
    } else {
      this.file = file.file
      this.orginFile = file
    }
    if (!this.file) {
      alert("请先选择需要上传的文件!")
      return
    }

    var userData = '{"Vod":{}}'
    if (this.uploader) {
      this.uploader.stopUpload()
      this.authProgress = 0
      this.statusText = ""
    }
    this.uploader = this.createUploader()
    console.log(userData, this.file)
    this.uploader.addFile(this.file, null, null, null, userData)
    this.uploadDisabled = false
    this.pauseDisabled = true
    this.resumeDisabled = true
    this.isUpload = true
    this.change('addFile', file)
  }
  autoUpload () {
    // 然后调用 startUpload 方法, 开始上传
    if (this.uploader !== null) {
      this.uploader.startUpload()
      this.uploadDisabled = true
      this.pauseDisabled = false
    }
  }
  // 暂停上传
  pauseUpload () {
    if (this.uploader !== null) {
      this.uploader.stopUpload()
      this.resumeDisabled = false
      this.pauseDisabled = true
      this.change({type: 'pauseUpload', file: this.file})
    }
    
  }
  // 恢复上传
  resumeUpload () {
    if (this.uploader !== null) {
      this.uploader.startUpload()
      this.resumeDisabled = true
      this.pauseDisabled = false
      this.change({type: 'resumeUpload', file: this.file})
    }
  }
  // 创建
  createUploader () {
    let { options } = this
    let self = this
    let uploader = new AliyunUpload.Vod({
      timeout: options.timeout || 60000,
      partSize: options.partSize || 1048576,
      parallel: options.parallel || 5,
      retryCount: options.retryCount || 3,
      retryDuration: options.retryDuration || 2,
      region: options.region,
      userId: options.userId,
      // 添加文件成功
      addFileSuccess: function (uploadInfo) {
        options.uploadDisabled = false
        options.resumeDisabled = false
        options.statusText = '添加文件成功, 等待上传...'
        console.log("addFileSuccess: " + uploadInfo.file.name)
      },
      // 开始上传
      onUploadstarted: function (uploadInfo) {
        // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
        // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
        self.start({type: 'upload start', uploadInfo})
       // 如果是图片
        let regImg=/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/
        if (regImg.test(uploadInfo.file.name)) {
          self.createImgAuth(uploadInfo)
          return false
        }
        // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
        if (!uploadInfo.videoId) {
          self.crateVideoAuth(uploadInfo)
        } else {
          // 如果videoId有值，根据videoId刷新上传凭证
          let data = self.refreshAuth({ 'video_id': self.videoId })
          if (data) {
            let { uploadAddress, videoId, uploadAuth } = data
            self.videoId = videoId
            uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
          }
        }
        
      },
      // 文件上传成功
      onUploadSucceed: function (uploadInfo) {
        // console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        self.orginFile.uploadInfo = uploadInfo
        options.statusText = '文件上传成功!'
        self.change({ type: 'onUploadSucceed', uploadInfo })
        self.success({ type: 'onUploadSucceed', uploadInfo })
      },
      // 文件上传失败
      onUploadFailed: function (uploadInfo, code, message) {
        self.change({ type: 'onUploadFailed', uploadInfo })
        // console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
        options.statusText = '文件上传失败!'
      },
      // 取消文件上传
      onUploadCanceled: function (uploadInfo, code, message) {
        self.change({ type: 'onUploadCanceled', uploadInfo })
        // console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
        options.statusText = '文件已暂停上传'
      },
      // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
      onUploadProgress: function (uploadInfo, totalSize, progress) {
        // console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
        let progressPercent = Math.ceil(progress * 100)
        options.authProgress = progressPercent
        self.progress({options, uploadInfo})
        options.statusText = '文件上传中...'
      },
      // 上传凭证超时
      onUploadTokenExpired: function (uploadInfo) {
        // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
        // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
        // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
        // 如果videoId有值，根据videoId刷新上传凭证
        self.change({ type: 'onUploadTokenExpired', uploadInfo })
        let data = self.refreshAuth({ 'video_id': self.videoId })
        if (data) {
          let {  uploadAuth } = data
          self.videoId = videoId
          uploader.resumeUploadWithAuth(uploadAuth)
        }
        options.statusText = '文件超时...'
      },
      // 全部文件上传结束
      onUploadEnd: function () {
        self.change({ type: 'onUploadEnd'})
        self.orginFile = null
        let file = self.waitList.shift()
        if(file) {
          self.addFile(file)
          self.autoUpload()
          return false
        }
        console.log("onUploadEnd: uploaded all the files")
        options.statusText = '文件上传完毕'
      }
    })
    return uploader
  }
  /**
   * @desc 更新视频凭证
   * @param {} params 
   */
  async refreshAuth(params) {
    let { errorCode, data } = await refreshUploadVideo(params)
    if(errorCode === 0) return data
    return -1
  }
  /**
   * @desc 创建video上传凭证
   * @param {*} uploadInfo 
   */
  async crateVideoAuth(uploadInfo) {
    let self = this
    let name = self.file.name
    let size = self.file.size
    createUploadVideo({ title: name, 'file_name': name, 'file_size': size})
      .then(res => {
        let { errorCode, data } = res
        if (errorCode === 0) {
          let { uploadAddress, videoId, uploadAuth } = data
          self.videoId = videoId
          self.uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
          self.options.statusText = '文件开始上传...'
          console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        }
      })
  }
  /**
   * @desc 创建上传图片
   */
  async createImgAuth(uploadInfo) {
    let { name } = this.file
    let ext = name.slice(name.lastIndexOf('.')+1)
    let params = { 'image_type': 'default', 'image_ext': ext }
    let { errorCode, data } = await createUploadImage(params)
    if (errorCode ===0) {
      let {
        uploadAddress,
        requestId,
        uploadAuth,
        imageURL,
        fileURL,
        imageId
      } = data
      this.uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,imageId)
    }
  }
}

export default upLoad