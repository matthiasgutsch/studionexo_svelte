export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.ZG_Fx79J.js","app":"_app/immutable/entry/app.DAXCGILv.js","imports":["_app/immutable/entry/start.ZG_Fx79J.js","_app/immutable/chunks/entry.DdiLCHWa.js","_app/immutable/chunks/scheduler.I48gaNEn.js","_app/immutable/entry/app.DAXCGILv.js","_app/immutable/chunks/scheduler.I48gaNEn.js","_app/immutable/chunks/index.CLjt9Cix.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
