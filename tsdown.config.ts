import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/index.tsx', 'src/providers/*/index.ts'],
	treeshake: true,
	sourcemap: true,
	minify: true,
	clean: true,
	dts: true,
	format: ['cjs', 'esm'],
	css: { inject: true },
});
