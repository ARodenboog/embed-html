import { App, Editor, Plugin, MarkdownPostProcessorContext, parseYaml, MarkdownRenderer } from 'obsidian';


export default class EmbedPlugin extends Plugin {


	async postprocessor(content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext){
		let json;
	    try{
	    	// Parse content of block
	        json = parseYaml(content);
	        // Validate content
	        validate(json, el);
	        // Generate iframe string
			var frame = '<iframe src="file:' +this.app.vault.getRoot().vault.adapter.basePath + "/"+ json.path + '" width="'+json.width+'" height="'+json.height+'" frameborder="0"></iframe>';
			// Render iframe using default renderer
			await MarkdownRenderer.renderMarkdown(frame, el, '',
											  this.app.workspace.activeLeaf.view);
	    } catch (error) {
	    	// Catch parsing errors
	        let errorDiv = document.createElement('div');
	        errorDiv.textContent = "Couldn't render HTML:" + error;
	        el.appendChild(errorDiv);
	    }



	}
	async onload() {
		console.log('Loading EmbedPlugin');
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




const allowValues = ["path", "width", "height"];

const validate = (json: any, el: HTMLElement) => {
    if(!json){
        throw "There should be a valid JSON in this block."
    }

    Object.keys(json).forEach(key=>{
        if(!allowValues.contains(key)){
            throw "The only valid keys are path, width and height."
        }
    })
}

