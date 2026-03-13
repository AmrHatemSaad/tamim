import { useState, useEffect } from "react";
import { useAdmin, Product } from "../../context/AdminContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X } from "lucide-react";

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AVAILABLE_SIZES = {
  men: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  women: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  children: ["4-6Y", "6-8Y", "8-10Y", "10-12Y"],
  teraz: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
};

export function EditProductDialog({
  product,
  open,
  onOpenChange,
}: EditProductDialogProps) {
  const { updateProduct } = useAdmin();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price.toString(),
    category: product.category,
    description: product.description || "",
    colors: product.colors ? product.colors.join(", ") : "",
  });

  const [images, setImages] = useState<string[]>(product.images || []);
  const [inventory, setInventory] = useState<{ [key: string]: number }>(product.inventory || {});
  const [isProcessing, setIsProcessing] = useState(false);

  // تحديث البيانات عند فتح الحوار بمنتج مختلف
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        description: product.description || "",
        colors: product.colors ? product.colors.join(", ") : "",
      });
      setImages(product.images || []);
      setInventory(product.inventory || {});
    }
  }, [product]);

  const handleMultipleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setIsProcessing(true);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          setImages((prev) => [...prev, dataUrl]);
          setIsProcessing(false);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleInventoryChange = (size: string, value: string) => {
    const qty = parseInt(value) || 0;
    setInventory((prev) => ({ ...prev, [size]: qty }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const totalQty = Object.values(inventory).reduce((a, b) => a + (b || 0), 0);

    if (images.length === 0) {
      alert("الرجاء إضافة صورة واحدة على الأقل");
      return;
    }

    const colorsArray = formData.colors
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c !== "");

    await updateProduct(product.id, {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      images: images,
      inventory: inventory,
      totalQuantity: totalQty,
      colors: colorsArray,
      description: formData.description,
      sizes: Object.keys(inventory).filter((s) => inventory[s] > 0),
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تعديل منتج: {product.name}</DialogTitle>
          <DialogDescription>تحديث بيانات وصور المنتج في السحابة</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* قسم الصور المتعددة */}
          <div className="space-y-2">
            <Label>صور المنتج</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultipleImagesUpload}
              className="cursor-pointer"
            />
            <div className="grid grid-cols-4 gap-4 mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative group aspect-square border rounded-lg overflow-hidden bg-gray-100">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="edit-name">اسم المنتج *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* تعديل الكمية لكل مقاس */}
            <div className="col-span-2 p-4 border rounded-lg bg-slate-50">
              <Label className="font-bold mb-3 block">المخزون المتوفر لكل مقاس:</Label>
              <div className="grid grid-cols-4 gap-3">
                {AVAILABLE_SIZES[formData.category].map((size) => (
                  <div key={size} className="space-y-1">
                    <Label className="text-[10px] uppercase text-gray-500">{size}</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inventory[size] || ""}
                      onChange={(e) => handleInventoryChange(size, e.target.value)}
                      className="h-9 bg-white"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="edit-category">الفئة *</Label>
              <Select
                value={formData.category}
                onValueChange={(v: any) => setFormData({ ...formData, category: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="teraz">طِراز (Teraz)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-price">السعر (EGP) *</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="edit-colors">الألوان (افصل بينها بفاصلة) *</Label>
              <Input
                id="edit-colors"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                placeholder="Black, White, Red"
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="edit-description">الوصف</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "جاري المعالجة..." : "حفظ التغييرات"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}