import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadCodeFiles = (code) => {
  const { html = '', css = '', script = '' } = code;
  const zip = new JSZip();

  // Add files if they contain content
  if (html.trim()) zip.file("index.html", html);
  if (css.trim()) zip.file("style.css", css);
  if (script.trim()) zip.file("script.js", script);

  // Generate zip and trigger download
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "project.zip");
  });
};
