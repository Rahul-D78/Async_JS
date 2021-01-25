/**
 * Ideally we wnat to write 
 * const file = download('http://somesite/path/image.png')
 * const compress = compress(file, 'zip')
 * upload('ftp://nginx.com', image.jpg)
 * 
 * promises help us get there
 * rewrite callback to promises
 */


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
 
// download()
// .then((file) => {
//    compress(file, '.zip')
//     .then((archieve) => {
//         upload('ftp://nginx.com', archieve)
//     })
// })

download('http://somepath/file/download/image.jpg')
.catch((err) => {
    console.error('error during downloading the file')
    throw err
})
 .then((file) => compress(file, 'zip'))
 .catch((err) => console.error('error during compresson of the file'))
 .then((archieve) => upload('ftp://', archieve))
 .catch((err) => console.error('error uploading the file'))