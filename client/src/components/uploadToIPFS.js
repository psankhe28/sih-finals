const { Web3Storage, getFilesFromPath } = require('web3.storage');
 const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUyRDhBMzhEMkFlMTYxQzJBMjgyOWIzYjU0ZWVCMDc0Y2ExNmY0MzYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3NDM3Nzk1MDksIm5hbWUiOiJJbXBsZW1lbnRpbmcgSVBGUyJ9.e53-8mY566hURwV-dFCnPmyhKHnQ3aLa-P3AL5cVgvg"
 const client = new Web3Storage({ token })
 
 async function storeFiles () {
   const files = await getFilesFromPath("Assignment1.pdf")
   const cid = await client.put(files)
   console.log(cid)
 }

 storeFiles()

// const { Web3Storage } = require('web3.storage');

// // Replace 'YOUR_API_TOKEN' with your actual API token from Web3.Storage
// const API_TOKEN = 'YOUR_API_TOKEN';
// const client = new Web3Storage({ token: API_TOKEN });

// // Example function to upload a file to Web3.Storage
// async function uploadFileToWeb3Storage() {
//   const fileInput = {
//     files: [ "/a.txt"]
//   };

//   try {
//     const rootCid = await client.put(fileInput.files);
//     console.log('File uploaded. Root CID:', rootCid);

//     const info = await client.status(rootCid);
//     console.log('Filecoin deals info:', info);

//     const res = await client.get(rootCid);
//     const files = await res.files();

//     for (const file of files) {
//       console.log(`${file.cid} ${file.name} ${file.size}`);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // Call the function to upload files
// uploadFileToWeb3Storage();
