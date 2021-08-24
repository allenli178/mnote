import { toHtml } from "mnote-util/dom";

// icons will require a stroke class and a fill class. stroke
// classes will have the color in the stroke property and so on

export type IconsList = typeof icons;

export const titleAlt = (alt?: string) => alt ? `<title>${alt}</title>` : "";

export function createIcon(
  name: keyof IconsList,
  fillClass: string,
  strokeClass: string,
  alt?: string,
) {
  return icons[name](fillClass, strokeClass, alt);
}

const icons = {
  //
  kebabMenu: (
    _fillClass: string,
    strokeClass: string,
    alt?: string,
  ) =>
    toHtml(`
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      ${titleAlt(alt)}
      <circle cx="256" cy="256" r="32" class="${strokeClass}" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/>
      <circle cx="256" cy="416" r="32" class="${strokeClass}" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/>
      <circle cx="256" cy="96" r="32" class="${strokeClass}" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/>
    </svg>
  `),
  //
  add: (
    _fillClass: string,
    strokeClass: string,
    alt?: string,
  ) =>
    toHtml(`
    <svg viewBox="0 0 512 512" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
      ${titleAlt(alt)}
      <defs>
        <path d="M0 0L512 0L512 512L0 512L0 0Z" id="path_1" />
        <clipPath id="mask_1">
          <use xlink:href="#path_1" />
        </clipPath>
      </defs>
      <g id="add-outline-svgrepo-com" transform="translate(16 16)">
        <path d="M0 0L512 0L512 512L0 512L0 0Z" id="Background" fill="none" fill-rule="evenodd" stroke="none" />
        <g clip-path="url(#mask_1)">
          <path d="M1 0L1 288" transform="translate(255 112)"
            class="${strokeClass}" id="Line" fill="none" fill-rule="evenodd" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M288 1L0 1" transform="translate(112 255)"
            class="${strokeClass}" id="Line" fill="none" fill-rule="evenodd" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
    </svg>
  `),
  //
  settings: (
    _fillClass: string,
    strokeClass: string,
    alt?: string,
  ) =>
    toHtml(`
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      ${titleAlt(alt)}
      <path d="M262.29,192.31a64,64,0,1,0,57.4,57.4A64.13,64.13,0,0,0,262.29,192.31ZM416.39,256a154.34,154.34,0,0,1-1.53,
        20.79l45.21,35.46A10.81,10.81,0,0,1,462.52,326l-42.77,74a10.81,10.81,0,0,1-13.14,4.59l-44.9-18.08a16.11,16.11,0,0,
        0-15.17,1.75A164.48,164.48,0,0,1,325,400.8a15.94,15.94,0,0,0-8.82,12.14l-6.73,47.89A11.08,11.08,0,0,1,298.77,
        470H213.23a11.11,11.11,0,0,1-10.69-8.87l-6.72-47.82a16.07,16.07,0,0,0-9-12.22,155.3,155.3,0,0,1-21.46-12.57,16,16,
        0,0,0-15.11-1.71l-44.89,18.07a10.81,10.81,0,0,1-13.14-4.58l-42.77-74a10.8,10.8,0,0,1,2.45-13.75l38.21-30a16.05,
        16.05,0,0,0,6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16,16,0,0,0-6.07-13.94l-38.19-30A10.81,10.81,0,
        0,1,49.48,186l42.77-74a10.81,10.81,0,0,1,13.14-4.59l44.9,18.08a16.11,16.11,0,0,0,15.17-1.75A164.48,164.48,0,0,1,187,
        111.2a15.94,15.94,0,0,0,8.82-12.14l6.73-47.89A11.08,11.08,0,0,1,213.23,42h85.54a11.11,11.11,0,0,1,10.69,8.87l6.72,
        47.82a16.07,16.07,0,0,0,9,12.22,155.3,155.3,0,0,1,21.46,12.57,16,16,0,0,0,15.11,1.71l44.89-18.07a10.81,10.81,0,0,1,
        13.14,4.58l42.77,74a10.8,10.8,0,0,1-2.45,13.75l-38.21,30a16.05,16.05,0,0,0-6.05,14.08C416.17,247.67,416.39,251.83,
        416.39,256Z"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
        class="${strokeClass}"
      />
    </svg>
  `),
  //
  textFile: (
    _fillClass: string,
    strokeClass: string,
    alt?: string,
  ) =>
    toHtml(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${titleAlt(alt)}
    <path d="M416,221.25V416a48,48,0,0,1-48,48H144a48,48,0,0,1-48-48V96a48,48,0,0,1,48-48h98.75a32,32,0,0,1,22.62,9.37L406.63,
      198.63A32,32,0,0,1,416,221.25Z" style="fill:none;stroke-linejoin:round;stroke-width:32px"
      class="${strokeClass}"/>
    <path d="M256,56V176a32,32,0,0,0,32,32H408" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      class="${strokeClass}"/>
    <line x1="176" y1="288" x2="336" y2="288" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      class="${strokeClass}"/>
    <line x1="176" y1="368" x2="336" y2="368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      class="${strokeClass}"/>
  </svg>
  `),
  //
  leftSidebar: (
    _fillClass: string,
    strokeClass: string,
    alt?: string,
  ) =>
    toHtml(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    ${titleAlt(alt)}
      <line x1="50" y1="96" x2="462" y2="100" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
        class="${strokeClass}" />
      <line x1="50" y1="256" x2="330" y2="256" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
        class="${strokeClass}" />
      <line x1="50" y1="416" x2="360" y2="412" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
        class="${strokeClass}" />
    </svg>
  `),
};
