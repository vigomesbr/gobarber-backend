import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailProviderTemplate";


export default class FakeMailTemplateProvider implements  IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail content'
    }
}