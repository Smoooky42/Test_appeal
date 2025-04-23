export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	testMatch: ['**/tests/**/*.test.(ts|js)'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json'
		}
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1' // Иначе сломается из за алиасов
	}
}
