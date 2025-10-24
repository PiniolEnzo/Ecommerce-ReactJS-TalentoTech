export function adaptProducts(apiProducts) {
    return apiProducts.map((data) => ({
        id: data.id,
        title: data.title,
        price: Number(data.price),
        description: data.description,
        category: data.category,
        image: data.image,
        rating: data.rating?.rate ?? null,
    }));
}