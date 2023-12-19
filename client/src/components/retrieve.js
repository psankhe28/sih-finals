const { Web3Storage, getFilesFromPath } = require('web3.storage')
 
 const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUyRDhBMzhEMkFlMTYxQzJBMjgyOWIzYjU0ZWVCMDc0Y2ExNmY0MzYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3NDM3Nzk1MDksIm5hbWUiOiJJbXBsZW1lbnRpbmcgSVBGUyJ9.e53-8mY566hURwV-dFCnPmyhKHnQ3aLa-P3AL5cVgvg"
 const client = new Web3Storage({ token })
 
 async function retrieveFiles () {
  const cid ="bafybeiepi3r6ve5jv3bz4htsj27cdhxlsili3glbqoz5o6yu2syc2jextm"
  //  const cid ="bafybeicavkvjv64qn2lqtjunkoshtu5et63qxypmdizeawpn4kvtoog5fi" (this cid works)
    //   'bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu'
    // const imageUrl = `https://ipfs.io/ipfs/${cid}/${imageFile.name}`;
 
   const res = await client.get(cid)
   const files = await res.files()
 
   for (const file of files) {
     console.log(`${file.cid}: ${file.name} (${file.size} bytes) `)
   }
 }
 
 retrieveFiles()