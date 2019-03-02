import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import marked from 'marked';
import * as hljs from 'highlightjs';

import safeURI from './safeURI';

const liveRenderer = new marked.Renderer();
const deadRenderer = new marked.Renderer();

const checkbox = (checked) => {
  // <label> self-closes before </li>
  // TODO: enable (must be reliable against dupes)
  return `<label><input type="checkbox" ${checked ? 'checked ' : ''} disabled> `;
};

const list = (body, ordered, start) => {
  const type = ordered ? 'ol' : 'ul';
  const startAt = (ordered && start !== 1) ? ` start="${start}"` : '';

  const isChecklist =  body.trim().split(/[\r\n]+/).every(line => {
    return line.trim().startsWith('<li><label><input type="checkbox"');
  });

  const checklistClass = (!ordered && isChecklist) ? ' class="checklist"' : '';

  return `<${type}${checklistClass}${startAt}>\n${body}</${type}>\n`;
};

[liveRenderer, deadRenderer].forEach(renderer => {
  renderer.checkbox = checkbox;
  renderer.list = list;
});

liveRenderer.link = (href, title, text) => {
  try {
    href = safeURI(href);
  } catch (e) {
    return text;
  }

  return `<a target="_blank" rel="nofollow noreferrer" href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

liveRenderer.heading = (text, level, raw, slugger) => {
  const id = liveRenderer.options.headerPrefix + slugger.slug(raw);

  return `<h${level} class="heading" id="${id}"><a class="unstyled-link" href="#${id}">${text}</a></h${level}>\n`;
};

deadRenderer.link = (href, title, text) => {
  try {
    href = safeURI(href);
  } catch (e) {
    return text;
  }

  return `<a tabindex="-1" href="${href}">${text}</a>`;
};

deadRenderer.heading = (text, level, _raw, _slugger) => {
  return `<h${level} class="heading">${text}</h${level}>\n`;
};


marked.setOptions({
  highlight: function(code, lang) {
    if (['plaintext', 'plain', 'txt'].includes(lang.trim().toLowerCase())) {
      return code;
    } else {
      try {
        return hljs.highlight(lang, code).value;
      } catch (e) { // hljs throws error on unrecognized or empty `lang` param
        return hljs.highlightAuto(code).value;
      }
    }
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false, // covered by htmlSafe
  smartLists: true,
  smartypants: true,
  xhtml: false
});

const formatMarkdown = ([ markdown, isLive=true ]) => {

  marked.setOptions({
    renderer: isLive ? liveRenderer : deadRenderer
  })

  return htmlSafe(marked(/*parseChecklists(*/markdown/*)*/));
};

export default helper(formatMarkdown);
