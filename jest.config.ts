import { pathsToModuleNameMapper } from 'ts-jest';
import { parse } from 'jsonc-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // 👈 1. Importe as ferramentas de URL

// ✅ 2. Obtenha o caminho do diretório ATUAL usando o padrão ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 3. Leia o tsconfig.json usando o caminho recriado e correto
const tsconfig = parse(fs.readFileSync(path.resolve(__dirname, './tsconfig.json'), 'utf-8'));

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/*.spec.ts",
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ],
  // O resto da configuração continua funcionando normalmente
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/src/' }),
};