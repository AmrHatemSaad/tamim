import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "children" | "teraz";
  image: string;
  sizes: string[];
  quantity: number;
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
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = "admin123"; // In production, this should be handled securely

// Initial seed products
const SEED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Men's T-Shirt",
    price: 299,
    category: "men",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    quantity: 50,
    description: "Comfortable cotton t-shirt for everyday wear",
  },
  {
    id: "2",
    name: "Men's Polo Shirt",
    price: 449,
    category: "men",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    quantity: 30,
    description: "Smart casual polo shirt",
  },
  {
    id: "3",
    name: "Women's Casual Top",
    price: 349,
    category: "women",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    quantity: 40,
    description: "Stylish and comfortable women's top",
  },
  {
    id: "4",
    name: "Women's Summer Dress",
    price: 599,
    category: "women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    quantity: 25,
    description: "Light and breezy summer dress",
  },
  {
    id: "5",
    name: "Kids' Graphic T-Shirt",
    price: 199,
    category: "children",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=500&fit=crop",
    sizes: ["4-6Y", "6-8Y", "8-10Y", "10-12Y"],
    quantity: 60,
    description: "Fun graphic tee for kids",
  },
  {
    id: "6",
    name: "Kids' Hoodie",
    price: 399,
    category: "children",
    image: "https://images.unsplash.com/photo-1622455147108-4fd74efc08bc?w=500&h=500&fit=crop",
    sizes: ["4-6Y", "6-8Y", "8-10Y", "10-12Y"],
    quantity: 35,
    description: "Cozy hoodie for children",
  },
  {
    id: "7",
    name: "Arabic Calligraphy T-Shirt - Peace",
    price: 499,
    category: "teraz",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    quantity: 20,
    description: "Exclusive Arabic calligraphy design - 'سلام' (Peace)",
  },
  {
    id: "8",
    name: "Arabic Calligraphy T-Shirt - Love",
    price: 499,
    category: "teraz",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    quantity: 20,
    description: "Exclusive Arabic calligraphy design - 'حب' (Love)",
  },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("tamim_products");
    if (saved) {
      return JSON.parse(saved);
    }
    return SEED_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("tamim_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("tamim_admin") === "true";
  });

  useEffect(() => {
    localStorage.setItem("tamim_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("tamim_orders", JSON.stringify(orders));
  }, [orders]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const addOrder = (order: Omit<Order, "id" | "createdAt" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
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
