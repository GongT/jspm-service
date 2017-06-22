import {HtmlContainer} from "@gongt/ts-stl-server/express/middlewares/html-render";
import {Application} from "express-serve-static-core";
import {resolve} from "path";
import {jspm} from "./client-jspm";

const indexMainBody = `
<div class="headerLine">
	<h1>JSPM CDN</h1>
	<div>
		<div>
			<a href="/browser" target="browser">浏览器</a>
		</div>
		<div>
			<button id="btnReconnect">断开并重新链接</button>
		</div>
		<div>
			<button id="btnClear"">清除控制台</button>
		</div>
	</div>
</div>
<div class="controlLine">
	<span>运行jspm命令</span>
	<input id="commandline" class="grow" type="text" autocomplete="off" placeholder="command line...">
	<input id="runbutton" type="button" value="RUN">
</div>
<div class="controlLine">
	<span>运行预定义过程</span>
	<select id="funcname">
		<option value="" selected> -- </option>
		<option value="install_inject">下载并打包</option>
	</select>
	<input id="funcargs" class="grow" type="text" style="flex-grow:1" autocomplete="off" placeholder="参数">
	<input id="funcbutton" type="button" value="RUN">
</div>
<div id="terminalDisplay"></div>
`;

export function mountClient(app: Application) {
	// home page init
	const html = new HtmlContainer;
	html.addHead('<title>jspm operation</title>');
	html.plugin(jspm);
	
	// main html structure
	html.stylesheet('/public/main.css');
	html.addBody(indexMainBody);
	
	// finalize
	app.get('/', html.createMiddleware());
}
