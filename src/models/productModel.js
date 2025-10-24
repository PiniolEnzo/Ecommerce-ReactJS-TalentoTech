export function createProduct(data) {
    // data la obtengo de una API como puede tener otros campos o 
    // cambiar de nombre los campos, podría validar la información 
    // antes de crear el producto, asi no cambio la estructura interna 
    // en cada lugar donde use los productos
    return {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
        rating: data.rating,
    };
}