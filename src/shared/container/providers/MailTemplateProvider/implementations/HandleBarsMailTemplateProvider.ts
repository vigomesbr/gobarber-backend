import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailProviderTemplate";
import handlebars from "handlebars";
import fs from 'fs';

export default class HandleBarsMailTemplateProvider implements  IMailTemplateProvider {
    public async parse({file, variables}: IParseMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8' 
        })
        
        const parseTemplate = handlebars.compile(templateFileContent);
        
        return parseTemplate(variables);
    }
}