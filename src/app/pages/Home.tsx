import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Sparkles, Shirt, Users } from "lucide-react";

export function Home() {
  const categories = [
    {
      name: "Men",
      path: "/men",
      image: "Men.png",
    },
    {
      name: "Women",
      path: "/women",
      image: "Women.png",
    },
    {
      name: "Children",
      path: "/children",
      image: "Children.png",
    },
    {
      name: "طِراز",
      path: "/teraz",
      image: "2 طِراز.png",
    },
  ];

  const features = [
    {
      icon: <Shirt className="h-8 w-8" />,
      title: "Premium Quality",
      description: "High-quality fabrics and materials for lasting comfort",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Unique Designs",
      description: "Exclusive Arabic prints and modern styles",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "For Everyone",
      description: "Collections for men, women, and children",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50 z-10" />
        <ImageWithFallback
          src="Background.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">TAMIM</h1>
          <p className="text-xl md:text-2xl mb-8">
            Premium Clothing Made in Egypt
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/men">
              <Button size="lg" variant="default">
                Shop Now
              </Button>
            </Link>
            <Link to="/customize">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-gray-900">
                Customize Your Design
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="group relative h-80 overflow-hidden rounded-lg shadow-lg"
              >
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white text-2xl font-bold p-6">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customize CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create Your Own Design
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Upload your design and customize your perfect t-shirt with your choice of color and size
          </p>
          <Link to="/customize">
            <Button size="lg" variant="outline" className="bg-white text-gray-900 hover:bg-gray-100">
              Start Customizing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
