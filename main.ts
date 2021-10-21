import { App, Editor, MarkdownView, Plugin, FileView, MarkdownPostProcessorContext, parseYaml, MarkdownRenderer } from 'obsidian';

const EmbedBase = '<iframe src= width= height=  frameborder="0"></iframe>'


const EmbedCode = (editor: Editor, path: str)=>{
	let doc = editor.getDoc();
	let cursor = doc.getCursor();
	// const x = [EmbedBase.slice(0, position), b, EmbedBase.slice(position)]. join('')
	doc.replaceRange([path,"Teststring"].join(""), cursor);
}

export default class EmbedPlugin extends Plugin {


	async postprocessor(content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext){
// Render the code using the default renderer
		var json = parseYaml(content);
		var frame = '<iframe src="file:' +this.app.vault.getRoot().vault.adapter.basePath + json.path + '" width="'+json.width+'" height="'+json.height+'" frameborder="0"></iframe>';
		await MarkdownRenderer.renderMarkdown(frame, el, '',
											  this.app.workspace.activeLeaf.view);

	}
	async onload() {
		console.log('Loading EmbedPlugin');
		const base_path = this.app.vault.getRoot().vault.adapter.basePath
		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});
		this.registerMarkdownCodeBlockProcessor('embedhtml', this.postprocessor.bind(this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log('Unloading EmbedPlugin');
	}
}




