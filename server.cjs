const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  noCors: false,
});

server.db = router.db;
server.use(middlewares);
server.use(auth);
server.use(router);

const PORT = process.env.API_PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Mock API corriendo en http://localhost:${PORT}`);
  console.log(`   Recursos: /products, /users, /register, /login`);
});
