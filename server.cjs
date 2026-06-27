const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "json-server-auth-123456";

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  noCors: false,
});

server.db = router.db;
server.use(middlewares);
server.use(auth);

/* GET /me — devuelve el usuario autenticado desde el JWT */
server.get("/me", (req, res) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).jsonp("Missing authorization header");

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return res.status(401).jsonp("Invalid authorization scheme");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.sub;
    const user = router.db.get("users").getById(userId).value();
    if (!user) return res.status(404).jsonp("User not found");

    const { password, ...safe } = user;
    res.jsonp(safe);
  } catch (err) {
    res.status(401).jsonp(err.message);
  }
});

server.use(router);

const PORT = process.env.API_PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Mock API corriendo en http://localhost:${PORT}`);
  console.log(`   Recursos: /products, /users, /register, /login`);
});
