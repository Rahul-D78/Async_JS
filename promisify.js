const util = require('util')


function download(url, downloaded) {

    console.log(`downloading from ${url}`);
    if(!url.startsWith('http')) {
       return downloaded(new Error('URL must starts with http'))
    }
 
    setTimeout(() => {
        let savedfile = url.split('/').pop()
     console.log(`downloaded and saved as ${savedfile}`);
     downloaded(null,savedfile); 
    }, 1000)
 
 }
 
 function compress(filepath, format, compressed) {
 
     console.log(`compressing ${filepath}`);
 
     if(['zip', '7z', 'gzip'].indexOf(format) === -1) {
         return compressed(`we only supports 'zip', '7z', 'gzip'`)
     }
     setTimeout(() => {
         let archieve = filepath.split('.')[0] + '.'+ format
         console.log(`compresses and saves as ${archieve}`);
         compressed(null,archieve)
 
     }, 1000)
 
 } 
  
 function upload(server, file, uploaded) {
 
     console.log(`uploading ${file} to ${server}`);
 
     if(!server.startsWith('ftp://')) {
        return uploaded(new Error('we can only upload to ftp server'))
     }
     setTimeout(() => {
         let remotepath = (`${server}/${file}`);
 
         if(typeof upload === 'function')
         console.log(`uploaded to ${remotepath}`); 
         uploaded(null, remotepath);     
     }, 1000)
 
 }


 const downloadPromise = util.promisify(download)
 const compressPromise = util.promisify(compress)
 const uploadPromise = util.promisify(upload)
 

 downloadPromise('http://somepath/file/download/image.jpg')
.catch((err) => {
    console.error('error during downloading the file')
    throw err
})
 .then((file) => compressPromise(file, 'zip'))
 .catch((err) => console.error('error during compresson of the file'))
 .then((archieve) => uploadPromise('ftp://', archieve))
 .catch((err) => console.error('error uploading the file'))