import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import prettier from 'eslint-plugin-prettier/recommended';

export default defineConfig(
	globalIgnores(['dist/', 'storybook-static/', '**/*.html']),
	js.configs.recommended,
	tseslint.configs.recommended,
	react.configs.flat.recommended,
	storybook.configs['flat/recommended'],
	prettier,
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-this-alias': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
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
	},
);
