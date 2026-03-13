import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { X } from "lucide-react"; // هتحتاج تثبت lucide-react لو مش عندك

const AVAILABLE_SIZES = {
  men: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  women: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  children: ["4-6Y", "6-8Y", "8-10Y", "10-12Y"],
  teraz: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
};

export function AddProductDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { addProduct } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "men" as keyof typeof AVAILABLE_SIZES,
    description: "",
    colors: "",
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [inventory, setInventory] = useState<{ [key: string]: number }>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // دالة رفع الصور المتعددة مع الضغط
  const handleMultipleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setIsProcessing(true);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setImages(prev => [...prev, dataUrl]);
          setIsProcessing(false);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (size: string, value: string) => {
    const qty = parseInt(value) || 0;
    setInventory(prev => ({ ...prev, [size]: qty }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalQty = Object.values(inventory).reduce((a, b) => a + b, 0);

    if (images.length === 0 || totalQty === 0) {
      alert("الرجاء إضافة صورة واحدة على الأقل وتحديد كمية للمقاسات");
      return;
    }

    await addProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      images: images,
      inventory: inventory,
      totalQuantity: totalQty,
      colors: formData.colors.split(",").map(c => c.trim()),
      description: formData.description,
      sizes: Object.keys(inventory).filter(s => inventory[s] > 0)
    });

    setImages([]);
    setInventory({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>إضافة منتج احترافي</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* رفع صور متعددة */}
          <div>
            <Label>صور المنتج (يمكنك اختيار أكثر من صورة)</Label>
            <Input type="file" multiple accept="image/*" onChange={handleMultipleImagesUpload} className="mt-1" />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} className="h-24 w-full object-cover rounded border" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>اسم المنتج</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            
            {/* تحديد الكمية لكل مقاس */}
            <div className="col-span-2 border p-4 rounded-md bg-gray-50">
              <Label className="mb-2 block font-bold">الكمية لكل مقاس:</Label>
              <div className="grid grid-cols-4 gap-4">
                {AVAILABLE_SIZES[formData.category].map(size => (
                  <div key={size} className="space-y-1">
                    <Label className="text-xs">{size}</Label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={inventory[size] || ""} 
                      onChange={e => handleQuantityChange(size, e.target.value)}
                      className="h-8"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>السعر</Label>
              <Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            </div>

            <div>
              <Label>الألوان (فاصلة بين كل لون)</Label>
              <Input value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} placeholder="أسود, أبيض" required />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "جاري معالجة الصور..." : "حفظ المنتج في المخزن"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}