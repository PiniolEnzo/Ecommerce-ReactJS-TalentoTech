# Nexo - E-Commerce

> Proyecto final del curso **Frontend React JS** dictado por **Talento Tech** - E-Commerce mock con autenticación, CRUD de productos, carrito de compras, checkout.

---

## Características

- **Autenticación completa** - Registro, inicio de sesión y proteccion de rutas con JWT via `json-server-auth`.
- **Catálogo de productos** - Listado con filtro por categorías dinámicas, vista detalle con rating y precios.
- **Carrito de compras** - Agregar/remover items, persistido en sesión, con vista popover y página dedicada.
- **Checkout y órdenes** - Formulario de envío, resumen de orden, confirmación y historial de pedidos por usuario.
- **Panel administrador** - CRUD completo de productos (crear, editar, eliminar) con tabla y formulario.
- **Diseño responsive** - Adaptado a mobile, tablet y desktop con menú hamburguesa.
- **Experiencia de usuario** - Toasts de notificación, spinners de carga, estados vacíos, confirmación modal.
- **Mock API** - Backend simulado con `json-server` + `json-server-auth` para desarrollo offline.

---

## Tecnologías y herramientas

| Frontend | Backend (mock) | Herramientas |
|---|---|---|
| React 19.2 | json-server 0.17.4 | Vite 7.3 |
| React Router 7.18 | json-server-auth 2.1.0 | Tailwind CSS 4.1 |
| react-hot-toast 2.6 | bcryptjs 3.0 | @tailwindcss/vite 4.1 |
| — | jsonwebtoken 8.5 | Concurrently 10.0 |
| — | — | ESLint 9.38 |
| — | — | @vitejs/plugin-react 5.0 |

---

## Requisitos

- **Node.js** v18 o superior
- **npm** v9 o superior

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/piniolenzo/ecommerce-reactjs-talentotech.git
cd ecommerce-reactjs-talentotech

# 2. Instalar dependencias
npm install

# 3. Generar la base de datos inicial (usuarios seed + productos)
npm run seed
```

---

## Configuración

### Usuarios seed

Luego de ejecutar `npm run seed` se generan dos usuarios de prueba:

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | admin@talentotech.com | admin123 |
| Cliente | user@talentotech.com | user123 |

### API base

El frontend se conecta a `http://localhost:3001` por defecto. Si necesitás cambiarlo, editar `src/services/authService.js` y `src/services/productService.js`.

---

## Uso

```bash
# Iniciar solo la API mock (puerto 3001)
npm run api

# Iniciar solo el frontend (puerto 5173)
npm run dev

# Iniciar ambos simultáneamente
npm run dev:all

# Generar / regenerar la base de datos
npm run seed

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

### Uso con Docker

```bash
# Levantar frontend + API mock sin instalar dependencias en la máquina host
docker compose up --build

# Generar / regenerar la base de datos desde el contenedor de la API
docker compose run --rm api npm run seed

# Detener los contenedores
docker compose down
```

Abrir [http://localhost:5173](http://localhost:5173). La API queda disponible en [http://localhost:3001](http://localhost:3001).

---

## Estructura del proyecto

```
├── public/                     # Archivos estáticos
├── scripts/
│   └── seed.cjs               # Generador de db.json con datos iniciales
├── src/
│   ├── assets/                 # Recursos estáticos (imágenes, fuentes)
│   ├── components/             # Componentes compartidos
│   │   ├── CartPopover/        # Popover del carrito
│   │   ├── CartItemRow/        # Fila de item del carrito
│   │   ├── ConfirmModal/       # Modal de confirmación (eliminar)
│   │   ├── EmptyState/         # Estado vacío genérico
│   │   ├── Footer/             # Footer del sitio
│   │   ├── Header/             # Header con Navbar y marca
│   │   ├── Navbar/             # Barra de navegación principal
│   │   ├── ProductCard/        # Tarjeta de producto individual
│   │   ├── RatingStars/        # Estrellas de calificación
│   │   ├── ProtectedRoute/     # HOC para rutas protegidas
│   │   ├── ScrollToTop/        # Scroll automático al cambiar de ruta
│   │   └── Spinner/            # Indicador de carga
│   ├── contexts/
│   │   ├── AuthProvider.jsx    # Contexto de autenticación
│   │   ├── CartProvider.jsx    # Contexto del carrito
│   │   └── OrderProvider.jsx   # Contexto de órdenes
│   ├── pages/
│   │   ├── Account/            # Perfil de usuario e historial de órdenes
│   │   ├── Admin/              # Panel admin (Dashboard, ProductList, ProductForm)
│   │   ├── Cart/               # Página de carrito
│   │   ├── Checkout/           # Checkout + confirmación de orden
│   │   ├── Home/               # Página principal con productos
│   │   ├── Login/              # Inicio de sesión
│   │   ├── NotFound/           # Página 404
│   │   └── Register/           # Registro de usuario
│   ├── services/
│   │   ├── authService.js      # Llamadas a /login, /register, /me
│   │   └── productService.js   # CRUD de productos
│   ├── App.jsx                 # Componente raíz con rutas
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos globales + theme Tailwind
├── server.cjs                  # Servidor mock API (json-server + auth + /me)
├── db.json                     # Base de datos generada por seed
├── package.json
├── vite.config.js
└── README.md
```

---

## Comentarios y mejoras

¿Encontraste un bug, tenés una sugerencia o querés agregar funcionalidad? Este proyecto es abierto a contribuciones. Abrí un issue o enviá un pull request - toda ayuda suma.

Ideas para próximas iteraciones:

- Pasarela de pago real (Stripe / Mercado Pago)
- Buscador de productos con autocomplete
- Paginación en el catálogo
- Modo oscuro
- Tests unitarios con Vitest + React Testing Library

---

## Creador

**Piñol Enzo Ignacio**

Proyecto desarrollado como trabajo final del curso **Frontend React JS** - **Talento Tech**.
