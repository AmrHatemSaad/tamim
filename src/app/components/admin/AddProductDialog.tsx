import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
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
import { Checkbox } from "../ui/checkbox";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AVAILABLE_SIZES = {
  men: ["S", "M", "L", "XL", "XXL"],
  women: ["XS", "S", "M", "L", "XL"],
  children: ["4-6Y", "6-8Y", "8-10Y", "10-12Y"],
  teraz: ["S", "M", "L", "XL", "XXL"],
};

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const { addProduct } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "men" as "men" | "women" | "children" | "teraz",
    image: "",
    quantity: "",
    description: "",
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image || !formData.quantity) {
      alert("Please fill in all required fields");
      return;
    }

    if (selectedSizes.length === 0) {
      alert("Please select at least one size");
      return;
    }

    addProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      quantity: parseInt(formData.quantity),
      sizes: selectedSizes,
      description: formData.description,
    });

    // Reset form
    setFormData({
      name: "",
      price: "",
      category: "men",
      image: "",
      quantity: "",
      description: "",
    });
    setSelectedSizes([]);
    onOpenChange(false);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleCategoryChange = (category: "men" | "women" | "children" | "teraz") => {
    setFormData({ ...formData, category });
    setSelectedSizes([]); // Reset sizes when category changes
  };

  // الدالة الخاصة برفع الصورة تم فصلها هنا
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Classic T-Shirt"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="teraz">طِراز (Teraz)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price (EGP) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="299"
                required
              />
            </div>

            <div>
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                placeholder="50"
                required
              />
            </div>

            {/* الجزء الخاص برفع الصورة بعد تعديله */}
            <div>
              <Label htmlFor="image">Product Image *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required={!formData.image}
                className="cursor-pointer mt-1"
              />
              {formData.image && (
                <div className="mt-2 flex justify-center border rounded-md p-2 bg-gray-50">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-24 w-auto object-contain rounded"
                  />
                </div>
              )}
            </div>

            <div className="col-span-2">
              <Label>Available Sizes *</Label>
              <div className="flex flex-wrap gap-3 mt-2">
                {AVAILABLE_SIZES[formData.category].map((size) => (
                  <label
                    key={size}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Optional product description..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}