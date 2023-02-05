import app from "./api/app.js";

const port = 9000;

// App listening to port 9000
app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});
