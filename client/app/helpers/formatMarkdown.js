import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import marked from 'marked';
import * as hljs from 'highlightjs';

const liveRenderer = new marked.Renderer();
const deadRenderer = new marked.Renderer();

const safeURI = href => encodeURI(href).replace(/%25/g, '%');

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

// TODO: do this within Marked itself
const parseChecklists = markdown => {
  return markdown.replace(/(?:\s*[*-]\s+\[[xv ]\].+)+/gm, m => {
    const lines = m.trim().split(/[\r\n]+/g)
    return `\n\n<ul class='checklist'>${
      lines.map(rawLine => {
        const line = rawLine.replace(/^\s*[*-]\s+/, '');
        const checked = line[1] !== ' ';

        const content = line.slice(3).trim();

        const checkbox = `<input type='checkbox' disabled${checked ? ' checked' : ''}>`

        return `<li>${checkbox} ${content}</li>`;
      }).join('\n')
    }</ul>\n\n`;
  })
};

const formatMarkdown = ([ markdown, isLive=true ]) => {

  marked.setOptions({
    renderer: isLive ? liveRenderer : deadRenderer
  })

  return htmlSafe(marked(parseChecklists(markdown)));
};

export default helper(formatMarkdown);
