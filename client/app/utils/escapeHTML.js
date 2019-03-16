// https://github.com/markedjs/marked/issues/1232#issuecomment-470656704

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
  '/': '&#47;'
};

const escapeHTML = html => html.replace(/[&<>"'\/]/g, char => entityMap[char]);

export default escapeHTML;
