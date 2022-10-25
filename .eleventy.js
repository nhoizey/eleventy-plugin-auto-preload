"use strict";

const { parseHTML } = require("linkedom");

const autoPreload = (content) => {
  if (!this.outputPath || !this.outputPath.endsWith(".html")) {
    return content;
  }

  const { document } = parseHTML(content);

  // Find first non SVG image with fetchpriority="high"
  const image = document.querySelector(
    'img:not([src$=svg])[fetchpriority="high"]'
  );
  if (!image) {
    return content;
  }

  // Prepare a new link for preload
  const link = document.createElement("link");
  link.setAttribute("rel", "preload");
  link.setAttribute("as", "image");
  link.setAttribute("fetchpriority", "high");

  // Check if this is a responsive images
  const srcset = image.getAttribute("srcset");
  const sizes = image.getAttribute("sizes");

  console.log(image.getAttribute("src"), srcset, sizes);
  console.dir(image.toString());

  if (srcset && sizes) {
    // imagesrcset & imagesizes attributes for responsive images
    // https://web.dev/preload-responsive-images/
    link.setAttribute("imagesrcset", srcset);
    link.setAttribute("imagesizes", sizes);
  } else {
    // Check if there's at least a src
    const src = image.getAttribute("src");
    if (!src) {
      return content;
    }

    // href atribute for non responsive image
    link.setAttribute("href", src);
  }

  const title = document.querySelector("title");
  title.insertAdjacentElement("afterend", link);

  return document.toString();
};

module.exports = (eleventyConfig) => {
  eleventyConfig.addTransform("autopreload", autoPreload);
};
