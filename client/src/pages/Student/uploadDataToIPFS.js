import React from "react";
const { Web3Storage, getFilesFromPath } = require('web3.storage');
 const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUyRDhBMzhEMkFlMTYxQzJBMjgyOWIzYjU0ZWVCMDc0Y2ExNmY0MzYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3NDM3Nzk1MDksIm5hbWUiOiJJbXBsZW1lbnRpbmcgSVBGUyJ9.e53-8mY566hURwV-dFCnPmyhKHnQ3aLa-P3AL5cVgvg"
 const client = new Web3Storage({ token })

 const UploadDataToIPFS=async ({token})=>{
  console.log(token.user);
  const StudentDetails={
    "name" : `${token.user.full_name}`,
    "email" : `${token.user.email}`,
    "phone_no" : `${token.user.phone}`,
    "home_state" : `${token.user.state}`
  }

// const StudentDetails=`${token.user.full_name}`+`${token.user.email}`+`${token.user.phone}`+`${token.user.state}`;

  const cid=await client.put(StudentDetails);
  console.log(cid);
}
UploadDataToIPFS()

