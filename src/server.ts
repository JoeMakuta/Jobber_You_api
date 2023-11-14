import App from "./app";

const app: App = new App();

app
  .init()
  .then(() => {
    app.server.listen(process.env.PORT, () => {
      console.log("Server started at : http://localhost:" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("An error occured at initialisation : ", err);
  });

export default app;
