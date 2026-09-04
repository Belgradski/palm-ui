import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Используем ts-jest для обработки TypeScript файлов
  preset: 'ts-jest',
  
  // Эмулируем браузерное окружение
  testEnvironment: 'jsdom',
  
  // Корневая директория для тестов
  roots: ['<rootDir>/src'],
  
  // Паттерны для поиска тестовых файлов
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  
  // Пути для игнорирования
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
  // Файлы для трансформации
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
      }
    }],
  },
  
  // Обработка статических файлов
  moduleNameMapper: {
    // Игнорируем CSS/SCSS при тестировании
    '\\.(css|less|scss|sass|sss)$': 'identity-obj-proxy',
  },
  
  // Настройка для работы с React 19
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Покрытие кода (опционально)
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/**/index.ts',
  ],
  
  // Добавляем поддержку jsx
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  
  // Игнорируем определенные модули
  transformIgnorePatterns: [
    'node_modules/(?!(react|react-dom|@testing-library)/)'
  ],
};

export default config;