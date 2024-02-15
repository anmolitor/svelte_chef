/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'npm run build && npm run preview:test',
		port: 4173
	},
	testDir: 'tests'
};

export default config;
