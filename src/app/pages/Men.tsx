import { ProductCard } from "../components/ProductCard";
import { useAdmin } from "../context/AdminContext";

export function Men() {
  const { products } = useAdmin();
  const menProducts = products.filter((p) => p.category === "men");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Men's Collection</h1>
        <p className="text-gray-600">Premium clothing for the modern man</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {menProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}