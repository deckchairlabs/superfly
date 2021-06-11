import ReactDOMServer from "react-dom/server";
import React from "react";
import Root from "./_default/Root";

type RenderContext = {
  Page: React.ComponentType;
};

export function render({ Page }: RenderContext) {
  return ReactDOMServer.renderToNodeStream(
    <Root>
      <Page />
    </Root>
  );
}

export const passToClient = ["pageProps", "documentProps"];
