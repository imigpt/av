import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Warehouse, Truck, Package, Tag } from "lucide-react";

export default function Products() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/bathroom-design.jpg" 
            alt="Wholesale products" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative h-full container flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Wholesale Excellence<br />in the UK
            </h1>
            <p className="text-xl mb-8">
              Quality Products Delivered to Your Door.
            </p>
            <Button size="lg" variant="default">
              Book An Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-4 leading-relaxed text-gray-700">
            <p>
              At AV Property Design & Build, we don't just offer exceptional design and construction services—we also provide high-quality products at wholesale prices, directly to you. With two fully stocked UK-based warehouses, we ensure fast, reliable delivery and an extensive range of materials, tools, and fixtures for your next project.
            </p>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Why Shop With Us?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Warehouse className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Two UK-Based Warehouses</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our strategically located warehouses ensure we have the products you need, when you need them. With locations across the UK, delivery times are faster and more efficient than ever.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Truck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Free Delivery to Your Door</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enjoy the convenience of having everything delivered straight to your location, absolutely free. No hidden fees—just straightforward, hassle-free delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Package className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Wide Selection of Products</h3>
                  <p className="text-gray-600 leading-relaxed">
                    From plumbing fixtures to electrical components, tiles, and more, our warehouses are stocked with everything you need to complete your residential or commercial project.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Tag className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Exclusive Trade Discount</h3>
                  <p className="text-gray-600 leading-relaxed">
                    As a token of appreciation for tradespeople, we offer an exclusive 40% discount on all products. Whether you're a contractor, plumber, electrician, or builder, we've got you covered with the best prices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="default">
              Shop Online
            </Button>
          </div>
        </div>
      </section>

      {/* Product Partners */}
      <section className="py-20 bg-white">
        <div className="container space-y-20">
          {/* Scudo */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Transforming Your Bathroom with Scudo</h2>
            <div className="space-y-4 leading-relaxed text-gray-700">
              <p>
                We're proud to offer Scudo, a brand that is dedicated to transforming bathrooms into beautiful, functional spaces. Whether you're upgrading your family bathroom, designing a stylish ensuite, or creating a luxurious wetroom, Scudo's extensive range of products will bring your vision to life.
              </p>
              <p>
                From sleek ceramics and elegant sanitaryware to beautiful mirrors and cabinets, Scudo provides a comprehensive range of products that meet every bathroom need. Their stunning baths, shower enclosures, and taps elevate both the aesthetic and functionality of your space.
              </p>
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">View the Complete Product List</Button>
            </div>
          </div>

          {/* Nuie */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Partnership, Your Perfect Bathroom</h2>
            <div className="space-y-4 leading-relaxed text-gray-700">
              <p>
                We're proud to partner with Nuie, a brand that transforms bathrooms into personal sanctuaries. Whether you're designing a cosy ensuite, a busy family bathroom, or a spacious wetroom, Nuie's beautifully crafted products bring your vision to life.
              </p>
              <p>
                Whether you're planning a full renovation or a simple update, we offer a wide range of Nuie products that combine style and quality. From sleek ceramics like toilets and basins to beautifully crafted furniture, Nuie provides elegant solutions for every bathroom.
              </p>
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">View the Complete Product List</Button>
            </div>
          </div>

          {/* Greta Grove */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Elevate Your Space with Greta Grove</h2>
            <div className="space-y-4 leading-relaxed text-gray-700">
              <p>
                We're thrilled to partner with Greta Grove to bring you a wide range of high-quality solutions for transforming your home or commercial space. From sleek PVC wall panels and cladding to stylish trims, their products are designed to offer both aesthetic appeal and practical performance.
              </p>
              <p>
                Greta Grove's SPC flooring blends strength and elegance, providing long-lasting beauty for your space. For a unique touch, their Neowall panels offer a luxurious option for feature walls, adding character and sophistication to any room.
              </p>
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">View the Complete Product List</Button>
            </div>
          </div>

          {/* Wetwall Panels 2 Go */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Bring Your Vision to Life with Wetwall Panels 2 Go</h2>
            <div className="space-y-4 leading-relaxed text-gray-700">
              <p>
                We are delighted to partner with Wetwall Panels 2 Go to offer an extensive range of premium solutions for enhancing your home or commercial space. Their diverse selection of wall panels, cladding, and accessories are designed to deliver both aesthetic appeal and exceptional performance.
              </p>
              <p>
                Wetwall Panels 2 Go's advanced PVC wall panels are ideal for creating modern, low-maintenance interiors, offering a seamless, waterproof finish that's both stylish and practical.
              </p>
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">View the Complete Product List</Button>
            </div>
          </div>

          {/* Porcelain Tiles */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Choose 600x300mm and 1200x600mm Porcelain Tiles?</h2>
            <p className="text-gray-700 mb-6">
              Porcelain tiles in 600x300mm and 1200x600mm sizes are among the most versatile and stylish options for modern interiors.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Feature</th>
                    <th className="border border-gray-300 p-3 text-left">600x300mm</th>
                    <th className="border border-gray-300 p-3 text-left">1200x600mm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Best Use</td>
                    <td className="border border-gray-300 p-3">Small to medium spaces</td>
                    <td className="border border-gray-300 p-3">Large, open areas</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Grout Lines</td>
                    <td className="border border-gray-300 p-3">More visible</td>
                    <td className="border border-gray-300 p-3">Minimal for elegance</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Visual Impact</td>
                    <td className="border border-gray-300 p-3">Subtle and modern</td>
                    <td className="border border-gray-300 p-3">Bold and luxurious</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">View the Complete Product List</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
