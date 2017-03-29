import AWS from 'aws-sdk';

const uploadPhotoS3 = (buffer, id) => {
  const s3 = new AWS.S3(
    {
      region: 'us-east-2',
    },
  );
  const s3Params = {
    Bucket: '3lpm',
    Key: 'testfolder/test.jpg',
    Expires: 60,
    ACL: 'public-read',
    Body: buffer,
  };


   s3.upload(s3Params, (err, res) => {
     console.log(res);
     console.log(err);
  });
};


export { uploadPhotoS3 };
