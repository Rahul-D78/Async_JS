/** understanding async js with callbacks
 * 
 * A program that downloads a file compress it ,
 * and then upload it somewhere else.
 */

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

download('http://somepath/file/download/image.jpg', (err, file) => {
    if(err) throw err

    compress(file, 'zip', (err,archieve) => {
        // if(err) throw err
        //handling the err

        if(err) {
            console.warn(err);
            archieve = file; 
        }
 
        upload('ftp://server.com', archieve, (err) => {
            if(err) throw err
        })
    })
})
// compress('image.jpg', '7z')
// upload('http://nginx.com', 'image.zip')


//nested callbacks..............................
// task1(arr, (err1, data1) => {
//     task2(arr2, (err2, data2) => {
//         task3(arr3, (res3) => {
//             task4(arr4, (res4) => {})
//         })
//     })
// })