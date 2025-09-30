import { container } from "tsyringe";
import mailConfig from '@config/mail';

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "./MailProvider/implementations/SESMailProvider";

import IMailTemplateProvider from "./MailTemplateProvider/models/IMailProviderTemplate";
import HandleBarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandleBarsMailTemplateProvider";

import ICacheProvider from "./CacheProvider/models/ICacheProvider";
import RedisCacheProvider from "./CacheProvider/implementations/RedisCacheProvider";

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandleBarsMailTemplateProvider
);

container.registerSingleton<IMailProvider>(
    'MailProvider',
    mailConfig.driver === 'ethereal'
        ? EtherealMailProvider
        : SESMailProvider
);

container.registerSingleton<ICacheProvider>(
    'CacheProvider',
    RedisCacheProvider
);