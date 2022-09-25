var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => EmbedPlugin
});
var import_obsidian = __toModule(require("obsidian"));
var EmbedPlugin = class extends import_obsidian.Plugin {
  postprocessor(content, el, ctx) {
    return __async(this, null, function* () {
      let json;
      try {
        json = (0, import_obsidian.parseYaml)(content);
        validate(json, el);
        var frame = '<iframe src="file:' + this.app.vault.getRoot().vault.adapter.basePath + "/" + json.path + '" width="' + json.width + '" height="' + json.height + '" frameborder="0"></iframe>';
        yield import_obsidian.MarkdownRenderer.renderMarkdown(frame, el, "", this.app.workspace.activeLeaf.view);
      } catch (error) {
        let errorDiv = document.createElement("div");
        errorDiv.textContent = "Couldn't render HTML:" + error;
        el.appendChild(errorDiv);
      }
    });
  }
  onload() {
    return __async(this, null, function* () {
      console.log("Loading EmbedPlugin");
      this.registerDomEvent(document, "click", (evt) => {
        console.log("click", evt);
      });
      this.registerMarkdownCodeBlockProcessor("embedhtml", this.postprocessor.bind(this));
      this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1e3));
    });
  }
  onunload() {
    console.log("Unloading EmbedPlugin");
  }
};
var allowValues = ["path", "width", "height"];
var validate = (json, el) => {
  if (!json) {
    throw "There should be a valid JSON in this block.";
  }
  Object.keys(json).forEach((key) => {
    if (!allowValues.contains(key)) {
      throw "The only valid keys are path, width and height.";
    }
  });
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQXBwLCBFZGl0b3IsIFBsdWdpbiwgTWFya2Rvd25Qb3N0UHJvY2Vzc29yQ29udGV4dCwgcGFyc2VZYW1sLCBNYXJrZG93blJlbmRlcmVyIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtYmVkUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHJcblxyXG5cdGFzeW5jIHBvc3Rwcm9jZXNzb3IoY29udGVudDogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQsIGN0eDogTWFya2Rvd25Qb3N0UHJvY2Vzc29yQ29udGV4dCl7XHJcblx0XHRsZXQganNvbjtcclxuXHQgICAgdHJ5e1xyXG5cdCAgICBcdC8vIFBhcnNlIGNvbnRlbnQgb2YgYmxvY2tcclxuXHQgICAgICAgIGpzb24gPSBwYXJzZVlhbWwoY29udGVudCk7XHJcblx0ICAgICAgICAvLyBWYWxpZGF0ZSBjb250ZW50XHJcblx0ICAgICAgICB2YWxpZGF0ZShqc29uLCBlbCk7XHJcblx0ICAgICAgICAvLyBHZW5lcmF0ZSBpZnJhbWUgc3RyaW5nXHJcblx0XHRcdHZhciBmcmFtZSA9ICc8aWZyYW1lIHNyYz1cImZpbGU6JyArdGhpcy5hcHAudmF1bHQuZ2V0Um9vdCgpLnZhdWx0LmFkYXB0ZXIuYmFzZVBhdGggKyBcIi9cIisganNvbi5wYXRoICsgJ1wiIHdpZHRoPVwiJytqc29uLndpZHRoKydcIiBoZWlnaHQ9XCInK2pzb24uaGVpZ2h0KydcIiBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT4nO1xyXG5cdFx0XHQvLyBSZW5kZXIgaWZyYW1lIHVzaW5nIGRlZmF1bHQgcmVuZGVyZXJcclxuXHRcdFx0YXdhaXQgTWFya2Rvd25SZW5kZXJlci5yZW5kZXJNYXJrZG93bihmcmFtZSwgZWwsICcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3KTtcclxuXHQgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHQgICAgXHQvLyBDYXRjaCBwYXJzaW5nIGVycm9yc1xyXG5cdCAgICAgICAgbGV0IGVycm9yRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ICAgICAgICBlcnJvckRpdi50ZXh0Q29udGVudCA9IFwiQ291bGRuJ3QgcmVuZGVyIEhUTUw6XCIgKyBlcnJvcjtcclxuXHQgICAgICAgIGVsLmFwcGVuZENoaWxkKGVycm9yRGl2KTtcclxuXHQgICAgfVxyXG5cclxuXHJcblxyXG5cdH1cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRjb25zb2xlLmxvZygnTG9hZGluZyBFbWJlZFBsdWdpbicpO1xyXG5cdFx0Ly8gSWYgdGhlIHBsdWdpbiBob29rcyB1cCBhbnkgZ2xvYmFsIERPTSBldmVudHMgKG9uIHBhcnRzIG9mIHRoZSBhcHAgdGhhdCBkb2Vzbid0IGJlbG9uZyB0byB0aGlzIHBsdWdpbilcclxuXHRcdC8vIFVzaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBhdXRvbWF0aWNhbGx5IHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIgd2hlbiB0aGlzIHBsdWdpbiBpcyBkaXNhYmxlZC5cclxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnY2xpY2snLCBldnQpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyTWFya2Rvd25Db2RlQmxvY2tQcm9jZXNzb3IoJ2VtYmVkaHRtbCcsIHRoaXMucG9zdHByb2Nlc3Nvci5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHQvLyBXaGVuIHJlZ2lzdGVyaW5nIGludGVydmFscywgdGhpcyBmdW5jdGlvbiB3aWxsIGF1dG9tYXRpY2FsbHkgY2xlYXIgdGhlIGludGVydmFsIHdoZW4gdGhlIHBsdWdpbiBpcyBkaXNhYmxlZC5cclxuXHRcdHRoaXMucmVnaXN0ZXJJbnRlcnZhbCh3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4gY29uc29sZS5sb2coJ3NldEludGVydmFsJyksIDUgKiA2MCAqIDEwMDApKTtcclxuXHR9XHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ1VubG9hZGluZyBFbWJlZFBsdWdpbicpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgYWxsb3dWYWx1ZXMgPSBbXCJwYXRoXCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl07XHJcblxyXG5jb25zdCB2YWxpZGF0ZSA9IChqc29uOiBhbnksIGVsOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgaWYoIWpzb24pe1xyXG4gICAgICAgIHRocm93IFwiVGhlcmUgc2hvdWxkIGJlIGEgdmFsaWQgSlNPTiBpbiB0aGlzIGJsb2NrLlwiXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmtleXMoanNvbikuZm9yRWFjaChrZXk9PntcclxuICAgICAgICBpZighYWxsb3dWYWx1ZXMuY29udGFpbnMoa2V5KSl7XHJcbiAgICAgICAgICAgIHRocm93IFwiVGhlIG9ubHkgdmFsaWQga2V5cyBhcmUgcGF0aCwgd2lkdGggYW5kIGhlaWdodC5cIlxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUErRjtBQUcvRixnQ0FBeUMsdUJBQU87QUFBQSxFQUd6QyxjQUFjLFNBQWlCLElBQWlCLEtBQWtDO0FBQUE7QUFDdkYsVUFBSTtBQUNELFVBQUc7QUFFQyxlQUFPLCtCQUFVO0FBRWpCLGlCQUFTLE1BQU07QUFFckIsWUFBSSxRQUFRLHVCQUFzQixLQUFLLElBQUksTUFBTSxVQUFVLE1BQU0sUUFBUSxXQUFXLE1BQUssS0FBSyxPQUFPLGNBQVksS0FBSyxRQUFNLGVBQWEsS0FBSyxTQUFPO0FBRXJKLGNBQU0saUNBQWlCLGVBQWUsT0FBTyxJQUFJLElBQ3ZDLEtBQUssSUFBSSxVQUFVLFdBQVc7QUFBQSxlQUM3QixPQUFQO0FBRUUsWUFBSSxXQUFXLFNBQVMsY0FBYztBQUN0QyxpQkFBUyxjQUFjLDBCQUEwQjtBQUNqRCxXQUFHLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1qQixTQUFTO0FBQUE7QUFDZCxjQUFRLElBQUk7QUFHWixXQUFLLGlCQUFpQixVQUFVLFNBQVMsQ0FBQyxRQUFvQjtBQUM3RCxnQkFBUSxJQUFJLFNBQVM7QUFBQTtBQUV0QixXQUFLLG1DQUFtQyxhQUFhLEtBQUssY0FBYyxLQUFLO0FBRzdFLFdBQUssaUJBQWlCLE9BQU8sWUFBWSxNQUFNLFFBQVEsSUFBSSxnQkFBZ0IsSUFBSSxLQUFLO0FBQUE7QUFBQTtBQUFBLEVBR3JGLFdBQVc7QUFDVixZQUFRLElBQUk7QUFBQTtBQUFBO0FBT2QsSUFBTSxjQUFjLENBQUMsUUFBUSxTQUFTO0FBRXRDLElBQU0sV0FBVyxDQUFDLE1BQVcsT0FBb0I7QUFDN0MsTUFBRyxDQUFDLE1BQUs7QUFDTCxVQUFNO0FBQUE7QUFHVixTQUFPLEtBQUssTUFBTSxRQUFRLFNBQUs7QUFDM0IsUUFBRyxDQUFDLFlBQVksU0FBUyxNQUFLO0FBQzFCLFlBQU07QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
