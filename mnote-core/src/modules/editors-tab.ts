import { Mnote } from "..";
import { FSModule } from "./fs";
import { PromptsModule } from "./prompts";
import { DocInfo, Editor, EditorContext, TabContext } from "./types";
import { LogModule } from "./log";
import { StringsModule } from ".";

export class TabManager {
  private ctx: TabContext;

  private fs: FSModule;
  private prompts: PromptsModule;
  private log: LogModule;
  private strings: StringsModule;

  constructor(app: Mnote, ctx: TabContext) {
    this.ctx = ctx;
    this.fs = app.modules.fs;
    this.prompts = app.modules.prompts;
    this.log = app.modules.log;
    this.strings = app.modules.strings;
    this.setVisible(false);
  }

  // mark the document as unsaved, remove the path
  private onWatcherRemove = (path: string) => {
    const { document } = this.ctx.getTabInfo();
    if (!document.path) return;
    if (path === document.path) {
      const newDoc = { ...document };
      delete newDoc.path;
      newDoc.saved = false;
      this.ctx.setDocument(newDoc);
    }
  };

  // update the document path and name
  private onWatcherRename = (path: string, targetPath: string) => {
    const { document } = this.ctx.getTabInfo();
    if (!document.path) return;
    if (path === document.path) {
      this.ctx.setDocument({
        ...document,
        path: targetPath,
        name: this.fs.getPathName(targetPath),
      });
    }
  };

  async startup() {
    const { container, editor } = this.ctx.getTabInfo();

    this.fs.onWatchEvent("rename", this.onWatcherRename);
    this.fs.onWatchEvent("remove", this.onWatcherRemove);

    this.setVisible(true);

    await editor.startup(container, this.makeContext());
    return this;
  }

  private makeContext(): EditorContext {
    return {
      updateEdited: () => {
        const doc = this.ctx.getTabInfo().document;
        doc.saved = false;
        this.ctx.setDocument(doc);
      },
      getDocument: () => this.ctx.getTabInfo().document,
      setDocument: (doc: DocInfo) => this.ctx.setDocument(doc),
    };
  }

  // DRY for saving with a prompt on error
  private async trySaveEditor(
    editor: Editor,
    document: Required<DocInfo>,
  ): Promise<boolean> {
    try {
      await editor.save(document.path);
      return true;
    } catch (e) {
      this.prompts.notify(this.strings.get("saveError")(e));
      this.log.err(
        "editor tab: error while saving document with trySaveEditor",
        document,
        e,
      );
      return false;
    }
  }

  async save(): Promise<boolean> {
    const { document, editor } = this.ctx.getTabInfo();

    if (document.path) {
      const success = await this.trySaveEditor(
        editor,
        document as Required<DocInfo>,
      );
      if (!success) return false;
      this.ctx.setDocument({
        ...document,
        saved: true,
      });
    } else {
      const success = await this.saveAs();
      if (!success) return false;
    }

    return true;
  }

  async saveAs(): Promise<boolean> {
    const { editor, editorInfo, document } = this.ctx.getTabInfo();

    const newPath = editorInfo.disableSaveAs
      ? document.path
      : await this.fs.dialogSave({
        filters: editorInfo.saveAsFileTypes,
        startingDirectory: document.path
          ? this.fs.getPathParent(document.path)
          : undefined,
        startingFileName: document.name,
      });

    this.log.info("editor tabs: saveAs - new path:", newPath);
    if (!newPath) return false;

    const newPathName = this.fs.getPathName(newPath);
    const newDoc = {
      path: newPath,
      name: newPathName,
      saved: false,
    };
    this.ctx.setDocument(newDoc);

    const success = await this.trySaveEditor(editor, newDoc);
    if (!success) return false;
    this.ctx.setDocument({
      ...newDoc,
      saved: true,
    });

    return true;
  }

  setVisible(visible: boolean) {
    const { container } = this.ctx.getTabInfo();
    if (visible) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  }

  mount(container: Element) {
    const tab = this.ctx.getTabInfo();
    container.appendChild(tab.container);
  }

  unmount(container: Element) {
    const tab = this.ctx.getTabInfo();
    container.removeChild(tab.container);
  }

  private async cleanup() {
    this.setVisible(false);
    this.fs.offWatchEvent("rename", this.onWatcherRename);
    this.fs.offWatchEvent("remove", this.onWatcherRemove);
    const { editor } = this.ctx.getTabInfo();
    await editor.cleanup();
  }

  async close(): Promise<boolean> {
    const { document } = this.ctx.getTabInfo();

    if (document.saved) {
      await this.cleanup();
      return true;
    } else {
      const action = await this.prompts.promptButtons(
        this.strings.get("confirmSaveBeforeClose"),
        [
          {
            kind: "normal",
            text: this.strings.get("cancel"),
            command: "cancel",
          },
          {
            kind: "normal",
            text: this.strings.get("dontSave"),
            command: "dontsave",
          },
          {
            kind: "emphasis",
            text: this.strings.get("save"),
            command: "save",
          },
        ],
      );

      switch (action as "cancel" | "save" | "dontsave") {
        case "save":
          if (await this.save()) {
            await this.cleanup();
            return true;
          } else {
            return false;
          }
        case "cancel":
          return false;
        case "dontsave":
          await this.cleanup();
          return true;
      }
    }
  }
}
