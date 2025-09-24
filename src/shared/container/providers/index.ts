import { container } from "tsyringe";

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";

import IMailTemplateProvider from "./MailTemplateProvider/models/IMailProviderTemplate";
import HandleBarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandleBarsMailTemplateProvider";

// --- Registro Síncrono ---
container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandleBarsMailTemplateProvider
);

// --- Registro Assíncrono --
container.registerSingleton<IMailProvider>(
    'MailProvider',
    EtherealMailProvider
);