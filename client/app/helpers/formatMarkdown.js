import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import marked from 'marked';
import insane from 'insane';
import * as hljs from 'highlightjs';

import safeURI from './safeURI';

const liveRenderer = new marked.Renderer();
const deadRenderer = new marked.Renderer();

const insaneOptions = {
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel', 'title', 'tabindex'],
    img: ['src', 'alt', 'title'],
    input: ['type', 'checked', 'disabled'],
    code: ['class'],
    span: ['class'],
    th: ['align'],
    tr: ['align']
  },
  allowedClasses: {
    ul: ['checklist'],
    a: ['unstyled-link'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedTags: [
    'a', 'article', 'b', 'blockquote', 'br', 'caption', 'code', 'del', 'details', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'li', 'main', 'ol', 'p', 'pre', 'section', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul'
  ],
  filter: node => {
    [
      [ 'code', 'language-' ],
      [ 'span', 'hljs-' ]
    ].forEach(([ tag, prefix ]) => {
      if (
        node.tag === tag
        && typeof node.attrs.class === 'string'
        && (/\s/.test(node.attrs.class) || !node.attrs.class.startsWith(prefix))
      ) {
        delete node.attrs.class;
      }
    });

    return true;
  },
  transformText: null
};

for (let i = 1; i <= 6; i++) {
  insaneOptions.allowedClasses[`h${i}`] = ['heading'];
  insaneOptions.allowedAttributes[`h${i}`] = ['id'];
}

const sanitize = html => insane(html, insaneOptions);

const checkbox = (checked) => {
  // TODO: enable (must be reliable against dupes)
  return `<label><input type="checkbox" ${checked ? 'checked ' : ''}disabled> `;
};

const listitem = text => {
  const closer = text.trim().startsWith('<label>') ? '</label>' : '';

  return `<li>${text}${closer}</li>\n`;
}

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
  renderer.listitem = listitem;
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
  sanitize: false, // covered by insane-powered `sanitize` function
  smartLists: true,
  smartypants: true,
  xhtml: false
});


const formatMarkdown = ([ markdown, isLive=true ]) => {

  markdown = markdown.replace(/\[\[(.+?)\]\]/g, '<kbd>$1</kbd>');

  marked.setOptions({
    renderer: isLive ? liveRenderer : deadRenderer
  })

  return htmlSafe(sanitize(marked(markdown)));
};

export default helper(formatMarkdown);
