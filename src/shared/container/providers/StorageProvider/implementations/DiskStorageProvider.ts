import IStorageProvader from "../models/IStorageProvider";
import fs from 'fs';
import path from "path";
import uploadConfig from '@config/upload'

export default class DiskStorageProvider implements IStorageProvader {

    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadFolder, file),
        )

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch (err) {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}