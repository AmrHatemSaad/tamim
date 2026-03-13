import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAdmin } from "../context/AdminContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

export function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    governorate: "",
    postalCode: "",
    notes: "",
  });

  // --- إعدادات بوت تيليجرام (أوتوماتيك 100%) ---
  const TELEGRAM_BOT_TOKEN = "8686229064:AAFDbrj7h_m6xR90p_DdjawNWt74_Kdddc0";
  const TELEGRAM_CHAT_ID = "763727675";

  const sendTelegramNotification = async (orderTotal: number) => {
    // تنسيق المنتجات بشكل احترافي للرسالة
    const itemsList = items.map(item => 
      `▫️ *${item.name}*\n   المقاس: ${item.size} | الكمية: ${item.quantity} | السعر: ${item.price} EGP`
    ).join('\n\n');

    const message = 
      `🚨🚨🚨 *أوردر جديد يا هندسة! (متجر تميم)* 🚨🚨🚨\n` +
      `━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *العميل:* ${formData.fullName}\n` +
      `📞 *الموبايل:* ${formData.phone}\n` +
      `📍 *العنوان:* ${formData.address}\n` +
      `🏙 *المنطقة:* ${formData.city}, ${formData.governorate}\n` +
      `📝 *ملاحظات:* ${formData.notes || 'لا يوجد'}\n\n` +
      `📦 *الطلبات:*\n${itemsList}\n\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `💰 *الإجمالي النهائي:* ${orderTotal} EGP\n\n` +
      `🔔 _يرجى مراجعة الطلب فوراً_`;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
          disable_notification: false, // لضمان إصدار صوت تنبيه
        }),
      });
    } catch (error) {
      console.error("Telegram error:", error);
    }
  };

  if (items.length === 0 && !showSuccess) {
    navigate("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = getTotalPrice();
  const shipping = 50;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. حفظ الطلب في Firebase
      await addOrder({
        items: items,
        customer: formData,
        total: total,
      });
      
      // 2. إرسال إشعار فوري لتيليجرام (مع صوت)
      await sendTelegramNotification(total);

      // 3. إظهار رسالة النجاح
      setShowSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right" dir="rtl">
          {/* بيانات العميل */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>بيانات الاتصال</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>الاسم بالكامل *</Label>
                  <Input name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="اكتب اسمك الثلاثي" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رقم الموبايل *</Label>
                    <Input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} placeholder="01XXXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label>البريد الإلكتروني (اختياري)</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>عنوان التوصيل</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>العنوان بالتفصيل *</Label>
                  <Input name="address" required value={formData.address} onChange={handleInputChange} placeholder="اسم الشارع، رقم العمارة" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>المحافظة *</Label>
                    <Input name="governorate" required value={formData.governorate} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>المدينة *</Label>
                    <Input name="city" required value={formData.city} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ملاحظات إضافية</Label>
                  <Textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="أي تعليمات خاصة للمندوب..." rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 pt-6">
                <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300">
                  <p className="font-bold mb-1">الدفع عند الاستلام (Cash on Delivery)</p>
                  <p className="text-sm text-gray-600">الدفع نقداً للمندوب عند استلام الشحنة.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ملخص الطلب */}
          <div className="lg:col-span-1" dir="ltr">
            <Card className="sticky top-20 shadow-lg border-2 border-black">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b pb-2 last:border-0">
                      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-bold truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-500">{item.size} × {item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-900">EGP {item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm"><span>Subtotal</span><span>EGP {subtotal}</span></div>
                  <div className="flex justify-between text-sm"><span>Shipping</span><span>EGP {shipping}</span></div>
                  <div className="border-t pt-3 flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span><span>EGP {total}</span>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-zinc-800 py-6" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "جاري المعالجة..." : "تأكيد الطلب"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>

      <Dialog open={showSuccess} onOpenChange={handleSuccessClose}>
        <DialogContent className="sm:max-w-md text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <DialogTitle className="text-2xl">تم استلام طلبك بنجاح!</DialogTitle>
          <DialogDescription className="space-y-4 mt-4">
            <p className="text-lg font-bold text-black">إجمالي المبلغ: EGP {total}</p>
            <p>شكراً لثقتك في متجر تميم. سنقوم بالتواصل معك قريباً لتأكيد الشحن.</p>
          </DialogDescription>
          <Button onClick={handleSuccessClose} className="w-full mt-4">العودة للتسوق</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}