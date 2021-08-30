import nodefill from "../nodefill";

import { Mnote } from "mnote-core";
import { FS } from "./fs";
import "../styles.scss";

import { PlaintextExtension } from "mnote-extensions/plaintext";
import { SettingsExtension } from "mnote-extensions/settings";
import { MarkdownExtension } from "mnote-extensions/markdown";
import { ExcalidrawExtension } from "mnote-extensions/excalidraw";
import { KanbanExtension } from "mnote-extensions/kanban";
import { CalendarExtension } from "mnote-extensions/calendar";
import { TodoExtension } from "mnote-extensions/todo";

// run this so it gets bundled
console.log(nodefill);

// web build
// for quick visual debugging

(async () => {
  const app = new Mnote("#root", {
    startPath: "startpath",
    fs: new FS(),
  });

  await app.init();

  const extensions = app.modules.extensions;
  await Promise.all([
    extensions.add(new PlaintextExtension()),
    extensions.add(new SettingsExtension()),
    extensions.add(new MarkdownExtension()),
    extensions.add(new ExcalidrawExtension()),
    extensions.add(new KanbanExtension()),
    extensions.add(new CalendarExtension()),
    extensions.add(new TodoExtension()),
  ]);

  await app.startup();
})();
