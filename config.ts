import * as dotenv from 'dotenv-safe';

dotenv.config({
    example: '.env.example',
    path: '.env',
});

export default {
    zipFileS3Key: String(process.env.ZIP_FILE_S3_KEY),
    s3BucketName: String(process.env.S3_BUCKET_NAME),
    awsCredentials: {
        accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
        secretKeyId: String(process.env.AWS_SECRET_ACCESS_KEY),
    }
};
