import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark';

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (typeof file?.data?.astro?.frontmatter !== 'undefined') {
      file.data.astro.frontmatter.readingTime = readingTime;
    }
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (child.type === 'element' && child.tagName === 'table') {
        tree.children[i] = {
          type: 'element',
          tagName: 'div',
          properties: {
            style: 'overflow:auto',
          },
          children: [child],
        };

        i++;
      }
    }
  };
};

/**
 * Picsum URLs already declare their intrinsic dimensions in the path (for
 * example `/1000/550.jpg`). Supply those dimensions before Astro's built-in
 * rehype image plugin runs, so static builds do not need to fetch the remote
 * image just to infer its size. The original Markdown and image URL stay
 * unchanged.
 */
export const explicitPicsumImageDimensionsRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    const visit = (node: (typeof tree.children)[number]) => {
      if (node.type === 'element' && node.tagName === 'img' && typeof node.properties?.src === 'string') {
        try {
          const url = new URL(node.properties.src);
          const match = url.hostname === 'picsum.photos' ? url.pathname.match(/\/(\d+)\/(\d+)(?:\.[^/]+)?$/) : null;

          if (match) {
            node.properties.width ??= Number(match[1]);
            node.properties.height ??= Number(match[2]);
          }
        } catch {
          // Leave malformed or non-Picsum image references to the normal pipeline.
        }
      }

      if ('children' in node && Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    tree.children.forEach(visit);
  };
};
