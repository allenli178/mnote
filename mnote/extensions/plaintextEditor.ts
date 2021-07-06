import { Mnote } from "../common/types";
import { EditorsModule } from "../modules/editors";
import {
  DocInfo,
  EditorContext,
  EditorProvider,
  Extension,
} from "../modules/types";
import { Editor } from "../modules/types";
import { el } from "../common/elbuilder";
import { FSModule } from "../modules/fs";

// an editor extension contains:
// - the editor
// - the provider
// - the extension itself

class PlaintextEditor implements Editor {
  app: Mnote;
  element: HTMLElement;
  textarea: HTMLTextAreaElement;
  container?: HTMLElement;
  fs: FSModule;

  contents: string = "";

  constructor(app: Mnote) {
    this.app = app;

    this.fs = (app.modules.fs as FSModule);

    this.textarea = el("textarea")
      .class("plaintext-textarea")
      .attr("spellcheck", "false")
      .element as HTMLTextAreaElement;

    this.element = el("div")
      .class("plaintext-editor")
      .children(
        this.textarea,
      )
      .element;
  }

  startup(containter: HTMLElement, ctx: EditorContext) {
    this.textarea.addEventListener("input", () => {
      this.contents = this.textarea.value;
      ctx.updateEdited();
    });

    this.container = containter;
    containter.appendChild(this.element);
  }

  async load(path: string) {
    const contents = await this.fs.readTextFile(path);
    this.textarea.value = contents;
  }

  cleanup() {
    this.container.removeChild(this.element);
  }

  async save(path: string) {
    console.log("plaintext: save file", path, this.contents);
    await this.fs.writeTextFile(path, this.contents);
  }
}

// provider

class PlaintextEditorProvider implements EditorProvider {
  app: Mnote;

  constructor(app: Mnote) {
    this.app = app;
  }

  tryGetEditor(_path: string) {
    // always return true, plaintext can open anything
    return new PlaintextEditor(this.app);
  }
  createNewEditor() {
    return new PlaintextEditor(this.app);
  }
}

// extension

export class PlaintextExtension implements Extension {
  app: Mnote;

  constructor(app: Mnote) {
    this.app = app;
  }

  startup() {
    (this.app.modules.editors as EditorsModule).registerEditor(
      "plaintext",
      new PlaintextEditorProvider(this.app),
    );
  }

  cleanup() {}
}
