const deleteObj={
     deleteFile(fileId) {
        wx.cloud.deleteFile({
            fileList:[fileId],
            success: res => {
                // handle success
                console.log(res)
              },
              fail:err=>{
                  console.log(err)
              }
        })
    }
}
export {
    deleteObj
}