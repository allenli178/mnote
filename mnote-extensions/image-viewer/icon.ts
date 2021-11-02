import { toHtml } from "mnote-util/dom";

export const imageIcon = (
  _fillClass: string,
  strokeClass: string,
) =>
  toHtml(`
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect x="48" y="80" width="416" height="352" rx="48" ry="48" style="fill:none;stroke-linejoin:round;stroke-width:32px" class="${strokeClass}" />
    <circle cx="336" cy="176" r="32" style="fill:none;stroke-miterlimit:10;stroke-width:32px" class="${strokeClass}" />
    <path d="M304,335.79,213.34,245.3A32,32,0,0,0,169.47,244L48,352" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" class="${strokeClass}" />
    <path d="M224,432,347.34,308.66a32,32,0,0,1,43.11-2L464,368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"  class="${strokeClass}" />
  </svg>
`);
