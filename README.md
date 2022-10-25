# eleventy-plugin-auto-preload

[![GitHub stars](https://img.shields.io/github/stars/nhoizey/eleventy-plugin-auto-preload.svg?style=social)](https://github.com/nhoizey/eleventy-plugin-auto-preload/stargazers)

`eleventy-plugin-auto-preload` is a plugin for [Eleventy](https://11ty.dev/) that adds a preload for the first image with `fetchpriority="high"`.

## Installation

To install and use the plugin, install it as a dev dependency in your Eleventy project:

```bash
npm install eleventy-plugin-auto-preload --save-dev
```

And add this to `.eleventy.js`:

```javascript
const autoPreload = require("eleventy-plugin-auto-preload");
eleventyConfig.addPlugin(autoPreload);
```

## Usage

Make sure the largest image visible above the fold has a `fetchpriority="high"` attribute, so that the plugin adds a `preload` element in the `<head>` of the document, to improve image loading start time.

More information:

- about `fetchpriority="high"`: [Optimizing resource loading with Priority Hints](https://web.dev/priority-hints/)
- about `<link rel="preload"… />`: [Preload critical assets to improve loading speed](https://web.dev/preload-critical-assets/)

## License

This project is licensed under the [MIT License](LICENSE.md).
