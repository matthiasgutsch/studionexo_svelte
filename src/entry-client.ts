import "./app.scss";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")!,
  hydrate: true,
  props: {
    url: window.location.pathname,
  },
});
