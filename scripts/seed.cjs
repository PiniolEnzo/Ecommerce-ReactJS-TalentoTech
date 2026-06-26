const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const salt = bcrypt.genSaltSync(10);

const db = {
  /* Reglas de permisos de json-server-auth:
     1er digito = sin autenticar, 2do = autenticado, 3ro = owner
     1=read  2=write  3=read+write  0=sin acceso */
  rules: {
    users: 616, // users: solo lectura pública, owner puede editar
    products: 133, // products: lectura pública, auth puede escribir
  },

  users: [
    {
      email: "admin@talentotech.com",
      password: bcrypt.hashSync("admin123", salt),
      name: "Admin",
      role: "admin",
    },
    {
      email: "user@talentotech.com",
      password: bcrypt.hashSync("user123", salt),
      name: "Usuario",
      role: "customer",
    },
  ],

  products: [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and target. Not too many compartments and not too few.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: 3.9,
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: 4.1,
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "Great outrance wear for spring/autumn/winter, suitable for many occasions.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      rating: 2.1,
    },
    {
      id: 5,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: 4.6,
    },
    {
      id: 6,
      title: "Solid Gold Petite Micropave",
      price: 168,
      description:
        "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      rating: 3.9,
    },
    {
      id: 7,
      title: "White Gold Plated Princess",
      price: 9.99,
      description:
        "Classic Created Wedding Engagement Solitaire Diamond Promise Ring.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      rating: 3,
    },
    {
      id: 8,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 10.99,
      description:
        "Rose Gold Plated Double Flared Tunnel Plug Earrings.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      rating: 1.9,
    },
    {
      id: 9,
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      price: 64,
      description:
        "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      rating: 3.3,
    },
    {
      id: 10,
      title: "SanDisk SSD PLUS 1TB Internal SSD",
      price: 109,
      description:
        "Easy upgrade for faster boot up, shutdown, application load and response.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      rating: 2.9,
    },
    {
      id: 11,
      title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost",
      price: 109,
      description:
        "3D NAND flash are applied to deliver high transfer speeds.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      rating: 4.8,
    },
    {
      id: 12,
      title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      price: 114,
      description:
        "Expand your PS4 gaming experience, easily store and play your digital games.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      rating: 4.8,
    },
    {
      id: 13,
      title: "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin",
      price: 599,
      description:
        "21.5 inches Full HD (1920 x 1080) widescreen IPS display.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      rating: 2.9,
    },
    {
      id: 14,
      title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
      price: 999.99,
      description:
        "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      rating: 4.2,
    },
    {
      id: 15,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56.99,
      description:
        "Note: The Jackets is US-standard, please choose size as your usual wear.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      rating: 2.6,
    },
    {
      id: 16,
      title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 29.95,
      description:
        "REMOVABLE HOOD, LIGHTWEIGHT SYNTHETIC LEATHER, and various fits.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      rating: 2.9,
    },
    {
      id: 17,
      title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      price: 39.99,
      description:
        "Lightweight waterproof and breathable, fully sealed for extreme weather.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
      rating: 3.8,
    },
    {
      id: 18,
      title: "MBJ Women's Solid Short Sleeve V-Neck V-Neck",
      price: 9.85,
      description:
        "Made in USA or Imported, lightweight fabric with great stretch.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
      rating: 4.7,
    },
    {
      id: 19,
      title: "Opna Women's Short Sleeve Moisture Active",
      price: 7.95,
      description:
        "100% Polyester, Machine wash, 100% cationic polyester.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
      rating: 4.5,
    },
    {
      id: 20,
      title: "DANVOUY Women's Casual Cotton T-Shirt",
      price: 12.99,
      description:
        "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
      rating: 3.6,
    },
  ],
};

fs.writeFileSync(path.join(__dirname, "..", "db.json"), JSON.stringify(db, null, 2));
console.log("✅ db.json generated with products and users");
console.log("   Admin: admin@talentotech.com / admin123");
console.log("   User:  user@talentotech.com / user123");
