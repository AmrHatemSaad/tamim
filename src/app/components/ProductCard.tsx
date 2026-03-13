import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react"; // استيراد الأسهم للتقليب

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  inventory: { [size: string]: number };
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showDialog, setShowDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // حالة لتتبع الصورة المعروضة
  
  const availableSizes = product.sizes || [];
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");

  // دالة للتقليب للصورة التالية
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // عشان الديالوج ميتفتحش وإحنا بنقلب
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  // دالة للتقليب للصورة السابقة
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    const stock = product.inventory?.[selectedSize] || 0;
    if (stock <= 0) {
      toast.error("عذراً، هذا المقاس غير متوفر حالياً");
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.images[currentImageIndex], // نبعت الصورة اللي العميل واقف عليها
    });
    toast.success("تمت الإضافة للسلة بنجاح");
    setShowDialog(false);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border-none shadow-sm group">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
          <ImageWithFallback
            src={product.images && product.images[currentImageIndex] ? product.images[currentImageIndex] : ""}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          
          {/* أسهم التقليب تظهر فقط عند الوقوف بالماوس على الكارت ووجود أكثر من صورة */}
          {product.images && product.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={prevImage}
                className="bg-white/80 p-1 rounded-full shadow-md hover:bg-white text-gray-800"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextImage}
                className="bg-white/80 p-1 rounded-full shadow-md hover:bg-white text-gray-800"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* نقاط التتبع (Dots) */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all ${idx === currentImageIndex ? "w-4 bg-gray-900" : "w-1 bg-gray-400"}`}
                />
              ))}
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{product.category}</p>
          <p className="mt-2 font-bold text-gray-900">EGP {product.price}</p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {/* رجعناها Add to Cart زي ما طلبت */}
          <Button 
            onClick={() => setShowDialog(true)} 
            className="w-full bg-gray-900 hover:bg-black text-white font-medium"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>
              اختار المقاس واللون المفضلين لديك
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4 text-right">
            <div>
              <Label className="text-sm font-semibold mb-3 block">المقاس المتاح</Label>
              <div className="grid grid-cols-4 gap-2">
                {availableSizes.map((size) => {
                  const isOutOfStock = (product.inventory?.[size] || 0) <= 0;
                  return (
                    <button
                      key={size}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs border rounded transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : isOutOfStock 
                            ? "bg-gray-50 text-gray-300 border-gray-100"
                            : "border-gray-200 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <Label className="text-sm font-semibold mb-3 block">الألوان المتوفرة</Label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-1.5 text-xs border rounded-full transition-all ${
                        selectedColor === color
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleAddToCart} className="w-full bg-gray-900 py-6 text-lg">
              Add to Cart - EGP {product.price}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}