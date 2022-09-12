import App from "./App";

const server = App.listen(process.env.PORT ?? 443, () => {
  console.log("Website Started");
});

export default server;