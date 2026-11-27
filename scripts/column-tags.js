'use strict';

/**
 * Custom Hexo tag plugins for AI Tutorials & AI News columns.
 * Solves Hexo 3.7.1 marked limitation where Markdown inside raw HTML blocks isn't parsed.
 *
 * Usage in Markdown:
 *   {% zh %}中文内容，支持 **加粗**、`代码`、[链接](url) 等全部 Markdown{% endzh %}
 *   {% en %}English content with full **Markdown** support.{% enden %}
 *   {% callout tip "实战技巧 / Pro Tip" %}提示内容{% endcallout %}
 */

function renderMd(content) {
  return hexo.render.renderSync({ text: content, engine: 'markdown' });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

hexo.extend.tag.register('zh', function (args, content) {
  var html = renderMd(content);
  return '<div class="bi-block bi-zh" data-lang="zh"><span class="bi-badge">中文</span><div class="bi-body">' + html + '</div></div>';
}, { ends: true });

hexo.extend.tag.register('en', function (args, content) {
  var html = renderMd(content);
  return '<div class="bi-block bi-en" data-lang="en"><span class="bi-badge">EN</span><div class="bi-body">' + html + '</div></div>';
}, { ends: true });

hexo.extend.tag.register('callout', function (args, content) {
  var type = (args[0] || 'info').toLowerCase();
  var allowed = { tip: '💡', info: '📌', warn: '⚠️', key: '🔑' };
  if (!allowed[type]) type = 'info';
  var title = args.slice(1).join(' ').replace(/^["']|["']$/g, '') || type.toUpperCase();
  var html = renderMd(content);
  return (
    '<div class="col-callout col-callout-' + type + '">' +
      '<div class="col-callout-title"><span class="col-callout-icon">' + allowed[type] + '</span>' + escapeHtml(title) + '</div>' +
      '<div class="col-callout-body">' + html + '</div>' +
    '</div>'
  );
}, { ends: true });
