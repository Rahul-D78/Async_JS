const util = require('util')



function download(url) {
    return new Promise((resolve, reject) => {
    
    
    console.log(`downloading from ${url}`);
    if(!url.startsWith('http')) {
       return reject(new Error('URL must starts with http'))
    }
 
    setTimeout(() => {
        let savedfile = url.split('/').pop()
     console.log(`downloaded and saved as ${savedfile}`);
     resolve(savedfile); 
    }, 1000)
    }) 
}


 function compress(filepath, format) {

    return new Promise((resolve, reject) => {
        console.log(`compressing ${filepath}`);

        if(['zip', '7z', 'gzip'].indexOf(format) === -1) {
            return reject(new Error('not supported format'))
        }
        setTimeout(() => {
            let archieve = filepath.split('.')[0] + '.'+ format
            console.log(`compresses and saves as ${archieve}`);
            resolve(archieve)
    
        }, 1000)
    })
} 
  
 function upload(server, file) {


    return new Promise((resolve, reject) => {
        console.log(`uploading ${file} to ${server}`);
 
     if(!server.startsWith('ftp://')) {
        return reject(new Error('we can only upload to ftp server'))
     }
     setTimeout(() => {
         let remotepath = (`${server}/${file}`);
         console.log(`uploaded to ${remotepath}`); 
         resolve(remotepath);     
     }, 1000)
    })
}

const downloadCb = util.callbackify(download)
const compressCb = util.callbackify(compress)
const uploadCb = util.callbackify(upload)


downloadCb('http://somepath/file/download/image.jpg', (err, file) => {
    if(err) throw err

    compressCb(file, 'zip', (err,archieve) => {
        // if(err) throw err
        //handling the err

        if(err) {
            console.warn(err);
            archieve = file; 
        }
 
        uploadCb('ftp://server.com', archieve, (err) => {
            if(err) throw err
        })
    })
})