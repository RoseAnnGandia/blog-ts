import { pathsToModuleNameMapper } from "ts-jest";
import { Config } from "jest";

// const require = createRequire(import.meta.url);
const { compilerOptions } = require("./tsconfig.paths.json");

/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  // testMatch: ["<rootDir>/tests/**/*.test.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
};

export default config;
