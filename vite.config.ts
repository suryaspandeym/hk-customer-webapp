import alias from '@rollup/plugin-alias';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import cssNanoPlugin from 'cssnano';
import { join } from 'node:path';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import { defineConfig, loadEnv } from 'vite';
import vitePrerender from 'vite-plugin-prerender';
import { VitePWA } from 'vite-plugin-pwa';

import AppRoutes from './src/utilities/app-routes';

import tailwindcss from 'tailwindcss';

export default ({ mode }: any) => {
	return defineConfig({
		envDir: 'envs',
		build: {
			...(() => {
				const currEnv: any = { ...process.env, ...loadEnv(mode, `${process.cwd()}/envs`) };
				return {
					sourcemap: currEnv.VITE_BUILD_SOURCEMAP?.toLowerCase?.() === 'true'
				};
			})()
		},
		plugins: [
			react(),
			VitePWA({
				registerType: 'autoUpdate',
				includeAssets: ['favicon.ico'],
				manifest: {
					name: 'React Template',
					short_name: 'React TPL',
					description: 'A React application!',
					theme_color: '#333333',
					icons: [
						{
							src: 'icon-512x512.png',
							sizes: '512x512',
							type: 'image/png'
						}
					]
				}
			}),
			vitePrerender({
				staticDir: join(__dirname, 'dist'),
				routes: Object.values(AppRoutes)
			}),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			alias({
				entries: {
					'@src': '/src',
					'@i18n': '/src/i18n',
					'@store': '/src/store',
					'@mocks': '/src/__mocks__',
					'@assets': '/src/assets',
					'@layouts': '/src/layouts',
					'@components': '/src/components',
					'@modals': '/src/modals',
					'@contexts': '/src/contexts',
					'@providers': '/src/providers',
					'@containers': '/src/containers',
					'@utilities': '/src/utilities',
					'@forms': '/src/forms'
				}
			})
		],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
				@use 'sass:list';
				@use 'sass:color';
				@use 'sass:string';
				@import "./src/assets/styles/settings.scss";
				`
				}
			},
			postcss: {
				plugins: [tailwindcss, autoprefixer, postcssFlexbugsFixes as any, cssNanoPlugin]
			}
		}
	});
};
