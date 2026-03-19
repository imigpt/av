import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Home as HomeIcon, Wrench } from "lucide-react";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { PriceCalculatorModal } from "@/components/PriceCalculatorModal";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);

  useEffect(() => {
    document.title = "AV Bathrooms & Kitchens | Expert Fitters in London";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Professional bathroom and kitchen fitters in Glasgow and Central Scotland. Expert installation, design, and supply services for modern and traditional styles."
      );
    }

    const handleOpenPriceCalculator = () => {
      setShowPriceCalculator(true);
    };
    
    window.addEventListener('openPriceCalculator', handleOpenPriceCalculator);
    
    return () => {
      window.removeEventListener('openPriceCalculator', handleOpenPriceCalculator);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/kiqaAGYPcUAtXApx.png" 
            alt="Modern kitchen interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full container flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AV Bathrooms & <span className="text-primary">Kitchens</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Specialized bathroom and kitchen fitters in Glasgow and Central Scotland, from sleek and modern to classic and traditional, (new or remodeling), our expert team can fit any style!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="default" onClick={() => setShowPriceCalculator(true)}>
                Get a Quote
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => setShowPriceCalculator(true)}>
                Price Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Why AV Bathrooms & <span className="text-primary">Kitchens</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="leading-relaxed text-gray-700">
              Looking for specialized bathroom and kitchen fitters in Glasgow and Central Scotland? Our company is here to help. We offer top-notch services to create the perfect kitchen and bathroom for your home. Our team of experts is passionate about providing you with the highest quality fittings and fixtures for these necessary spaces.
            </div>
            <div className="leading-relaxed text-gray-700">
              We take pride in our vast selection of high-quality bathroom fixtures and kitchen fixtures that will elevate the look and functionality of your home. From sleek and modern designs to classic and traditional ones, we offer it all. Our fittings and fixtures are built to last and will withstand the test of time, ensuring that they look beautiful for years to come.
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="leading-relaxed text-gray-700">
              Our team takes care of everything from supply to installation, ensuring that you have a stress-free experience. You only need to choose the material design, and we will take care of the rest. We take pride in providing the best customer service possible, ensuring that you are completely satisfied with the end result.
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-3">Unbeatable Pricing</h3>
              <p className="text-sm text-gray-600">We will beat any showroom price on supply and fit basis only</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-3">Built to Last</h3>
              <p className="text-sm text-gray-600">We provide high quality kitchen units, appliances, bathroom products</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-3">Design, Supply & Installation</h3>
              <p className="text-sm text-gray-600">With our full supply and install service you can sit back and relax, while we take care of everything else</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-3">Stunning Results</h3>
              <p className="text-sm text-gray-600">With our selection of materials, finishes and suites, you will think they are designed with you in mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bathroom Fixtures Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Bathroom Fixtures<br />
                <span className="text-primary">& Installation</span>
              </h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  AV Bathrooms & Kitchens specialize in providing the finest bathroom fixtures and expert fitters to help you create the bathroom of your dreams.
                </p>
                <p>
                  Our selection includes a wide range of fixtures, including sinks, faucets, toilets, showerheads, and more. We offer a variety of styles and finishes to fit any aesthetic preference and budget. Our staff is committed to offering any type of assistance you may need in selecting the ideal goods to fulfil your individual vision.
                </p>
                <p>
                  In addition to our wide selection of fixtures, we also offer expert installation services. Our team of skilled technicians has years of experience and will ensure that your fixtures are installed quickly and efficiently.
                </p>
              </div>
              <Button variant="default" className="mt-6">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shop Online
              </Button>
            </div>
            <div>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/ptwihbbQcVYYLPwE.png" 
                alt="Modern bathroom" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Fixtures Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/GdZkCfmDNHMohhfa.png" 
                alt="Modern kitchen" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Kitchen Fixtures<br />
                <span className="text-primary">& Installation</span>
              </h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  Our Kitchen Fixtures are not inferior to our Bathroom Fixtures either. The selection we offer includes a wide range of fixtures, including sinks, faucets, countertops, and more.
                </p>
                <p>
                  To accommodate every aesthetic desire and financial range, we provide a range of designs and finishes. And again our exceptional staff is committed to offering any type of assistance you may need in selecting the ideal goods to fulfil your individual vision.
                </p>
                <p>
                  Our expert kitchen fitter is also second to none.
                </p>
              </div>
              <Button variant="default" className="mt-6">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shop Online
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Installation & Transformation Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Installation &<br />
            <span className="text-primary">Transformation</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto leading-relaxed text-gray-700">
            <div className="space-y-4">
              <p>
                At AV Bathrooms & Kitchens, we don't just sell products – we also provide installation services to ensure that your new fittings are installed correctly and safely.
              </p>
              <p>
                For years, our business has offered homeowners high-quality remodeling and renovation services. We specialize in developing unique designs for bathrooms and kitchens that are both attractive and practical.
              </p>
              <p>
                Whether you're looking to upgrade your current kitchen or bathroom or start from scratch, we can help. We can help you with every step of the process, from layout design to material selection to fixture installation. We take pride in our attention to detail and strive to provide superior customer service.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Our team of experienced professionals can help you every step of the way when it comes to remodeling or renovating your kitchen or bathroom. We will work with you to create a plan that fits your budget, timeline, and aesthetic preferences.
              </p>
              <p>
                To guarantee the greatest outcomes for you, we always utilize the best components, and workmanship and strive to exceed our customers' expectations on every project.
              </p>
              <p className="font-semibold">
                To view our wide range of products and services at the best possible prices with unmatched services...
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="default" size="lg">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop Online
            </Button>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple Journey to your dream<br />
              <span className="text-primary">Bathroom & Kitchen</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="mb-6 flex justify-center">
                <HomeIcon className="w-16 h-16 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4">Visit Our Showroom</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You are welcome to pop down by our showroom, where we will be happy to show you around alternatively you can select and buy online.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="mb-6 flex justify-center">
                <ShoppingCart className="w-16 h-16 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4">Shop Online</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We are online and made it easy to view and choose the right product of your dreams, where ever you are. The products will be delivered to your doorstep.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="mb-6 flex justify-center">
                <Wrench className="w-16 h-16 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4">Relax and Enjoy</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                From sleek and modern to classic and traditional, our expert team can fit any style and leave with no sign of being there except a fabulous room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Disabled due to database schema issues */}
      {/* <TestimonialCarousel /> */}

      {/* Price Calculator Modal */}
      <PriceCalculatorModal open={showPriceCalculator} onOpenChange={setShowPriceCalculator} />

      <Footer />
    </div>
  );
}
