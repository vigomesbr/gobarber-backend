import IStorageProvader from "../models/IStorageProvider";
import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import path from "path";
import uploadConfig from '@config/upload'

export default class DiskStorageProvider implements IStorageProvader {

    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1'
        })
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = await path.resolve(uploadConfig.tmpFolder, file);
        const fileContent = fs.promises.readFile(originalPath)

        await this.client.putObject({
            Bucket: 'app-gobarber',
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
        }).promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: 'app-gobarber',
            Key: file
        }).promise()
    }
}