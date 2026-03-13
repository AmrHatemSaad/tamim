import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Upload, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const TSHIRT_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1E3A8A" },
  { name: "Red", hex: "#DC2626" },
  { name: "Green", hex: "#059669" },
  { name: "Yellow", hex: "#FDE047" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Purple", hex: "#8B5CF6" },
  { name: "Gray", hex: "#6B7280" },
  { name: "Orange", hex: "#F59E0B" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function Customize() {
  const [selectedColor, setSelectedColor] = useState(TSHIRT_COLORS[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (!uploadedImage) {
      toast.error("Please upload your design first");
      return;
    }

    addToCart({
      id: `custom-${Date.now()}`,
      name: "Custom T-Shirt",
      price: 499,
      size: selectedSize,
      color: selectedColor.hex,
      image: uploadedImage,
      customImage: uploadedImage,
      isCustom: true,
    });

    toast.success("Custom design added to cart!");
    
    // Reset form
    setUploadedImage(null);
    setImageFile(null);
    setSelectedColor(TSHIRT_COLORS[0]);
    setSelectedSize("M");
    
    // Navigate to cart
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Customize Your T-Shirt</h1>
        <p className="text-gray-600">
          Create your unique design - upload your artwork and choose your preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
              {/* T-shirt background */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: selectedColor.hex }}
              >
                {/* T-shirt shape outline */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M 25,15 L 35,15 L 40,25 L 60,25 L 65,15 L 75,15 L 75,30 L 70,30 L 70,85 L 30,85 L 30,30 L 25,30 Z"
                      fill={selectedColor.hex === "#FFFFFF" ? "#E5E7EB" : "#FFFFFF"}
                    />
                  </svg>
                </div>

                {/* Uploaded design */}
                {uploadedImage ? (
                  <div className="relative z-10 w-1/2 h-1/2 flex items-center justify-center">
                    <img
                      src={uploadedImage}
                      alt="Custom design"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="relative z-10 text-center text-gray-400">
                    <Upload className="h-16 w-16 mx-auto mb-2" />
                    <p>Your design will appear here</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold mb-2">Selected Options:</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Color: {selectedColor.name}</p>
                <p>Size: {selectedSize}</p>
                <p>Price: EGP 499</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Upload Design */}
          <Card>
            <CardHeader>
              <CardTitle>1. Upload Your Design</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="design-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="design-upload" className="cursor-pointer">
                    {uploadedImage ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="h-6 w-6" />
                        <span>Design uploaded! Click to change</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-sm text-gray-600 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, or SVG (max. 5MB)
                        </p>
                      </>
                    )}
                  </label>
                </div>
                {imageFile && (
                  <p className="text-sm text-gray-600">
                    File: {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Select Color */}
          <Card>
            <CardHeader>
              <CardTitle>2. Choose T-Shirt Color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3">
                {TSHIRT_COLORS.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`aspect-square rounded-lg border-2 transition-all ${
                      selectedColor.hex === color.hex
                        ? "border-gray-900 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.hex === color.hex && (
                      <Check
                        className={`w-6 h-6 mx-auto ${
                          color.hex === "#FFFFFF" ? "text-gray-900" : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Selected: {selectedColor.name}
              </p>
            </CardContent>
          </Card>

          {/* Select Size */}
          <Card>
            <CardHeader>
              <CardTitle>3. Choose Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-md border-2 transition-all ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full"
            disabled={!uploadedImage}
          >
            Add Custom T-Shirt to Cart - EGP 499
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Important Information:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Custom t-shirts are made to order and take 5-7 business days to produce</li>
          <li>Ensure your design is high quality for best printing results</li>
          <li>Designs with transparent backgrounds work best</li>
          <li>All custom orders are final and cannot be returned unless defective</li>
          <li>We use premium quality printing for vibrant, long-lasting designs</li>
        </ul>
      </div>
    </div>
  );
}
