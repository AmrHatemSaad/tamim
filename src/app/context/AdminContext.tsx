import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { db } from "../../lib/firebase"; 
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

// 1. تحديث واجهة المنتج (Product Interface)
export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "children" | "teraz";
  images: string[]; // مصفوفة صور بدل صورة واحدة
  sizes: string[]; 
  colors: string[]; 
  inventory: { [size: string]: number }; // كمية كل مقاس (مثل: {"M": 10, "L": 5})
  totalQuantity: number; // إجمالي الكمية
  description?: string;
}

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color?: string;
    image: string;
    isCustom?: boolean;
  }>;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    governorate: string;
    postalCode?: string;
    notes?: string;
  };
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

interface AdminContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Promise<void>;
  updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);
const ADMIN_PASSWORD = "reem2010";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("tamim_admin") === "true");

  // جلب المنتجات من Firestore
  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsArray: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsArray);
    });
    return () => unsubscribe();
  }, []);

  // جلب الطلبات من Firestore
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersArray: Order[] = [];
      querySnapshot.forEach((doc) => {
        ordersArray.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ordersArray);
    });
    return () => unsubscribe();
  }, []);

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      await addDoc(collection(db, "products"), product);
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("حصل خطأ أثناء رفع المنتج للسحابة.");
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updates);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const addOrder = async (order: Omit<Order, "id" | "createdAt" | "status">) => {
    try {
      const newOrder = {
        ...order,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      await addDoc(collection(db, "orders"), newOrder);
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  };

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { status });
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("tamim_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("tamim_admin");
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}