import IStorageProvader from "./StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";

import { container } from "tsyringe";

container.registerSingleton<IStorageProvader>(
    'StorageProvider',
    DiskStorageProvider
)
