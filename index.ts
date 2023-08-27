import * as unzipper from 'unzipper';
import {S3} from 'aws-sdk';
import {v4 as uuid} from 'uuid';

import config from './config';

const s3Client = new S3({
    accessKeyId: config.awsCredentials.accessKeyId,
    secretAccessKey: config.awsCredentials.secretKeyId,
});

async function unzipFile(zipFileS3Key: string, s3BucketName: string): Promise<void> {
    const centralDirectory = await unzipper.Open.s3(s3Client, {
        Bucket: s3BucketName,
        Key: zipFileS3Key,
    });

    const uploadId = uuid();

    console.debug('Uploading files to S3...');

    // TODO: optimize to parallelize uploads to S3 without exceeding the rate limit or saturating the network
    for (const file of centralDirectory.files) {
        await s3Client.upload({
            Bucket: s3BucketName,
            Key: `${uploadId}/${file.path}`,
            Body: file.stream(),
        }).promise();
    }

    console.debug('Upload complete');
}

(async () => {
    await unzipFile(config.zipFileS3Key, config.s3BucketName);
})();
