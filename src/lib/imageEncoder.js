
export const imageEncodeToBase64 = (dataURI, type) => {
    
 // convert base64 to raw binary data held in a string
 var byteString = atob(dataURI.split(',')[1]);

 // separate out the mime component
 var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

 // write the bytes of the string to an ArrayBuffer
 var ab = new ArrayBuffer(byteString.length);
 var ia = new Uint8Array(ab);
 for (var i = 0; i < byteString.length; i++) {
     ia[i] = byteString.charCodeAt(i);
 }

 // write the ArrayBuffer to a blob, and you're done
 var bb = new Blob([ab], { type: type });
 return bb;
    
}