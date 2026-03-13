export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors?: string[];
}

export const menProducts: Product[] = [
  {
    id: "m1",
    name: "Classic Cotton T-Shirt",
    price: 299,
    image: "https://images.unsplash.com/photo-1769164661151-97a337382aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjYXN1YWwlMjB0c2hpcnR8ZW58MXx8fHwxNzczMjk0MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "T-Shirts",
    colors: ["#000000", "#FFFFFF", "#1E3A8A", "#059669"],
  },
  {
    id: "m2",
    name: "Premium Polo Shirt",
    price: 449,
    image: "https://images.unsplash.com/photo-1706007647543-460bfa7db776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBwb2xvJTIwc2hpcnR8ZW58MXx8fHwxNzczMzU3MjgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Polo Shirts",
    colors: ["#1E3A8A", "#DC2626", "#000000", "#FFFFFF"],
  },
  {
    id: "m3",
    name: "Casual Cotton Tee",
    price: 279,
    image: "https://images.unsplash.com/photo-1769164661151-97a337382aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjYXN1YWwlMjB0c2hpcnR8ZW58MXx8fHwxNzczMjk0MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "T-Shirts",
    colors: ["#4B5563", "#0EA5E9", "#000000"],
  },
  {
    id: "m4",
    name: "Sport Performance Shirt",
    price: 399,
    image: "https://images.unsplash.com/photo-1706007647543-460bfa7db776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBwb2xvJTIwc2hpcnR8ZW58MXx8fHwxNzczMzU3MjgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Sport",
    colors: ["#000000", "#DC2626", "#F59E0B"],
  },
];

export const womenProducts: Product[] = [
  {
    id: "w1",
    name: "Elegant Cotton Blouse",
    price: 349,
    image: "https://images.unsplash.com/photo-1761117228880-df2425bd70da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGJsb3VzZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzczMjkzOTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Blouses",
    colors: ["#FFFFFF", "#FDE047", "#EC4899", "#6366F1"],
  },
  {
    id: "w2",
    name: "Classic Fashion Tee",
    price: 299,
    image: "https://images.unsplash.com/photo-1652638848589-470539b54b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGZhc2hpb24lMjB0c2hpcnR8ZW58MXx8fHwxNzczMzU3MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "T-Shirts",
    colors: ["#000000", "#FFFFFF", "#DC2626", "#059669"],
  },
  {
    id: "w3",
    name: "Casual Cotton Top",
    price: 329,
    image: "https://images.unsplash.com/photo-1761117228880-df2425bd70da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGJsb3VzZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzczMjkzOTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Casual",
    colors: ["#EC4899", "#8B5CF6", "#06B6D4"],
  },
  {
    id: "w4",
    name: "Premium Fashion Shirt",
    price: 399,
    image: "https://images.unsplash.com/photo-1652638848589-470539b54b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGZhc2hpb24lMjB0c2hpcnR8ZW58MXx8fHwxNzczMzU3MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Premium",
    colors: ["#FFFFFF", "#000000", "#FDE047"],
  },
];

export const childrenProducts: Product[] = [
  {
    id: "k1",
    name: "Kids Colorful T-Shirt",
    price: 199,
    image: "https://images.unsplash.com/photo-1667401604586-1d68d9788e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY29sb3JmdWwlMjBzaGlydHxlbnwxfHx8fDE3NzMzNTcyODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "T-Shirts",
    colors: ["#DC2626", "#0EA5E9", "#FDE047", "#059669"],
  },
  {
    id: "k2",
    name: "Comfortable Kids Wear",
    price: 229,
    image: "https://images.unsplash.com/photo-1733924304841-7320116fbe69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGtpZHMlMjBjbG90aGluZ3xlbnwxfHx8fDE3NzMzNTcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Casual",
    colors: ["#EC4899", "#8B5CF6", "#F59E0B"],
  },
  {
    id: "k3",
    name: "Fun Print Tee",
    price: 219,
    image: "https://images.unsplash.com/photo-1667401604586-1d68d9788e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY29sb3JmdWwlMjBzaGlydHxlbnwxfHx8fDE3NzMzNTcyODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "T-Shirts",
    colors: ["#059669", "#0EA5E9", "#DC2626"],
  },
  {
    id: "k4",
    name: "Active Kids Shirt",
    price: 249,
    image: "https://images.unsplash.com/photo-1733924304841-7320116fbe69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGtpZHMlMjBjbG90aGluZ3xlbnwxfHx8fDE3NzMzNTcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Sport",
    colors: ["#000000", "#FFFFFF", "#F59E0B"],
  },
];

export const terazProducts: Product[] = [
  {
    id: "t1",
    name: "خط عربي كلاسيكي",
    price: 399,
    image: "https://images.unsplash.com/photo-1761475048718-c28c775135de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBjYWxsaWdyYXBoeSUyMHNoaXJ0fGVufDF8fHx8MTc3MzM1NzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Arabic Calligraphy",
    colors: ["#000000", "#FFFFFF", "#1E3A8A"],
  },
  {
    id: "t2",
    name: "تصميم عربي معاصر",
    price: 429,
    image: "https://images.unsplash.com/photo-1761475048718-c28c775135de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBjYWxsaWdyYXBoeSUyMHNoaXJ0fGVufDF8fHx8MTc3MzM1NzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Modern Arabic",
    colors: ["#DC2626", "#059669", "#000000"],
  },
  {
    id: "t3",
    name: "طِراز مصري أصيل",
    price: 449,
    image: "https://images.unsplash.com/photo-1761475048718-c28c775135de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBjYWxsaWdyYXBoeSUyMHNoaXJ0fGVufDF8fHx8MTc3MzM1NzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Egyptian Heritage",
    colors: ["#FFFFFF", "#F59E0B", "#DC2626"],
  },
  {
    id: "t4",
    name: "خط الثلث الفاخر",
    price: 479,
    image: "https://images.unsplash.com/photo-1761475048718-c28c775135de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBjYWxsaWdyYXBoeSUyMHNoaXJ0fGVufDF8fHx8MTc3MzM1NzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Premium Calligraphy",
    colors: ["#000000", "#1E3A8A", "#FFFFFF"],
  },
];
