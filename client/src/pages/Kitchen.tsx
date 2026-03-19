import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

export default function Kitchen() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/kitchen-hero.jpg" 
            alt="Kitchen installation services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full container flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Kitchen Installation<br />Services
            </h1>
            <p className="text-xl mb-8">
              Ready to Transform Your Kitchen into Your Dream Space.
            </p>
            <Button size="lg" variant="default">
              Book An Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Kitchen Fitting Services */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Kitchen Fitting Services
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 leading-relaxed text-gray-700">
            <p>
              AV kitchen fitting services are aimed at providing a complete and seamless solution for customers who want to create a new, functional, and aesthetically pleasing kitchen space. When it comes to fitting your kitchen, you want to make sure that every detail is handled with care. Kitchen fitting services typically involve the installation and fitting of new kitchen units, appliances, worktops, and other fixtures and fittings in a kitchen.
            </p>
            <p>
              Our team of skilled installers has years of experience in kitchen fitting, ensuring that every detail is handled with precision and your kitchen is functional, stylish, and meets your needs. We use high-quality materials and equipment to ensure that your kitchen looks beautiful and functions perfectly. Contact us today to schedule a consultation and get started on your kitchen fitting project.
            </p>
          </div>
        </div>
      </section>

      {/* Kitchen Renovation */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Kitchen Renovation</h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  Renovating your kitchen can transform your home and add value to your property. Kitchen renovation is complex and requires the expertise of a professional kitchen renovation contractor. This may involve making functional or cosmetic changes, or a combination of both, to create a more modern, efficient, and visually appealing kitchen.
                </p>
                <p>
                  As kitchen renovation experts we are providing services for upgrading, improving, or completely transforming an existing kitchen space. Our kitchen renovation services cover everything from minor updates to full-scale remodels. We handle every aspect of your kitchen renovation, including demolition, plumbing, electrical work, and installation. Our team uses high-quality materials and equipment to ensure that your kitchen looks beautiful and functions perfectly.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="/images/kitchen-design.jpg" 
                alt="Kitchen renovation" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Fitting Process */}
      <section className="py-20 bg-white">
        <div className="container">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2 text-center">Simplify Your Kitchen Transformation</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Kitchen Fitting – Design,<br />Supply & Installation
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-700">
            Our expert installation team will transform your ideal concept into a reality. Our clients receive the highest standard of customer care and attention, at all stages of process.
          </p>
        </div>
      </section>

      {/* Kitchen Design */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/kiqaAGYPcUAtXApx.png" 
                alt="Kitchen design" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Kitchen Design</h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  Kitchen design is a crucial element of any home renovation or remodeling project. A well-designed kitchen can improve the functionality, aesthetics, and value of a home. It ensures that the space is optimized for cooking, preparing meals, and cleaning. By planning the layout and placement of appliances, cabinets, and countertops, a kitchen can be transformed into an efficient and easy-to-use space that complements the rest of the home.
                </p>
                <p>
                  We use the latest software and tools to create 3D renderings of your kitchen design and create a custom design that fits your preferences and needs, allowing maximum use of most of the available space and visualizing your space before installation. Our team will also provide you with recommendations for materials, appliances, and fixtures to ensure that your design is functional and stylish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Supplies */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Kitchen Supplies</h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  At AV Bathrooms and Kitchens, we understand that every kitchen is unique, which is why we offer a wide range of equipment for new kitchen construction and kitchen remodeling. From cabinets and countertops to lighting and flooring, we have everything you need to create the perfect space. Our selection includes all the latest styles and trends, so you can be sure your kitchen will look both beautiful and modern.
                </p>
                <p>
                  But we also know that a great kitchen isn't just about looks. That's why we also offer all the practical kitchen supplies you need, like plumbing and electrical equipment, as well as tools and materials to help you get the job done right.
                </p>
                <p>
                  We're committed to helping you create the kitchen of your dreams and can deliver all materials to your doorstep ready for installation.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/GdZkCfmDNHMohhfa.png" 
                alt="Kitchen supplies" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Installation */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Kitchen Installation
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 leading-relaxed text-gray-700 text-center">
            <p>
              We offer expert kitchen installation services to make your new kitchen project stress-free. From design and supply to installation, our team takes care of every aspect of your kitchen transformation. We provide complete renovation services, ensuring your kitchen meets your vision and exceeds your expectations.
            </p>
            <p>
              Whether you're updating an existing space or designing a brand-new kitchen, we're here to guide you every step of the way, delivering high-quality service and outstanding results.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Start Your Kitchen<br />Transformation Today
            </h2>
            <p className="text-center text-xl mb-8 font-semibold">Ready to Transform Your Kitchen?</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
