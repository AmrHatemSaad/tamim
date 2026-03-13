import { ProductCard } from "../components/ProductCard";
import { useAdmin } from "../context/AdminContext";

export function Teraz() {
  const { products } = useAdmin();
  const terazProducts = products.filter((p) => p.category === "teraz");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">طِراز Collection</h1>
        <p className="text-gray-600">
          Exclusive Arabic calligraphy designs - تصميمات خط عربي حصرية
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {terazProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}