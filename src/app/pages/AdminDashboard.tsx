import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { LogOut, Package, ShoppingCart, Plus } from "lucide-react";
import { ProductsManager } from "../components/admin/ProductsManager";
import { OrdersManager } from "../components/admin/OrdersManager";
import { AddProductDialog } from "../components/admin/AddProductDialog";

export function AdminDashboard() {
  const { isAdmin, logout, products, orders } = useAdmin();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Redirect if not admin
  if (!isAdmin) {
    navigate("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.quantity < 10).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Tamim Admin Panel</h1>
              <p className="text-sm text-gray-600">Manage your e-commerce store</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalProducts}</div>
              {lowStock > 0 && (
                <p className="text-xs text-orange-600 mt-1">
                  {lowStock} item{lowStock !== 1 ? "s" : ""} low in stock
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingOrders}</div>
              <p className="text-xs text-gray-600 mt-1">
                {orders.length} total orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
              <span className="text-sm font-semibold">EGP</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600 mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Products and Orders */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="products" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <Button onClick={() => setShowAddProduct(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <TabsContent value="products" className="mt-0">
                <ProductsManager />
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <OrdersManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <AddProductDialog
        open={showAddProduct}
        onOpenChange={setShowAddProduct}
      />
    </div>
  );
}
