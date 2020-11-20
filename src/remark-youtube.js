import { selectAll } from "unist-util-select";
import youtube from "js-video-url-parser/lib/base";
import "js-video-url-parser/lib/provider/youtube";

export default () => (tree) => {
  const nodes = selectAll("paragraph link:only-child", tree) || [];
  console.log(nodes);
  nodes.forEach((node) => {
    const data = youtube.parse(node.url);
    if (data) {
      delete node.children;
      const embedUrl = youtube.create({ videoInfo: data, format: "embed" });
      node.type = "html";
      node.value = `<iframe src="${embedUrl}"></iframe>`;
    }
  });
};
