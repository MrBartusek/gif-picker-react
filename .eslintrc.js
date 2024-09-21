module.exports = {
	env: {
		browser: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:storybook/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [],
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: ['*.html'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: '13',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				useTabs: true,
				singleQuote: true,
				printWidth: 100,
				singleAttributePerLine: true,
			},
		],
	},
};
