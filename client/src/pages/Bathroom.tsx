import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

export default function Bathroom() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/bathroom-hero.jpg" 
            alt="Bathroom fitting services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full container flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              No.1 Bathroom Fitting<br />Services In UK
            </h1>
            <p className="text-xl mb-8">
              Transform Your Vision into Reality with Expert Bathroom Design and Renovation.
            </p>
            <Button size="lg" variant="default">
              Book An Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Bathroom Installation Services */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Bathroom Installation Services
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 leading-relaxed text-gray-700">
            <p>
              As a provider of bathroom fitting services in Glasgow and Central Scotland, we acknowledge the significance of a bathroom that not only serves its function but also boasts aesthetic appeal. By entrusting us with your bathroom fitting project, you'll work alongside a team of affable and proficient professionals, who prioritize providing you with outstanding results. We value our customers' opinions and preferences and make sure to listen intently to their needs throughout the entire project, ensuring a seamless process.
            </p>
            <p>
              Our skilled bathroom fitters possess the necessary expertise to recommend the most suitable fixtures, fittings, and materials for each unique project, delivering quality workmanship to every client. With our bathroom fitting services, you can be assured that your bathroom will be revamped into a space that you'll relish for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* Bathroom Renovation */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/bathroom-design.jpg" 
                alt="Bathroom renovation" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Affordable Transformations</p>
              <h2 className="text-4xl font-bold mb-6">Bathroom Renovation</h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  Are you tired of your outdated and cramped bathroom? Our professional bathroom renovation services can transform your space into a functional and stylish oasis. Our team of experts will work with you to create a custom design that meets your unique needs and preferences.
                </p>
                <p>
                  We use quality materials and fixtures to ensure that your new bathroom not only looks great but also functions efficiently. From small updates to full-scale remodels, we offer a range of services to suit your needs and budget. Contact us today to schedule a consultation and begin your bathroom renovation journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bathroom Fitting Process */}
      <section className="py-20 bg-white">
        <div className="container">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2 text-center">Simplify Your Bathroom Transformation</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Bathroom Fitting – Design,<br />Supply & Installation
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-700">
            Our expert installation team will transform your ideal concept into a reality. Our clients receive the highest standard of customer care and attention, at all stages of process.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <p className="text-gray-700 leading-relaxed">
                We come to you for a free no obligation home survey. We have thousands of products to choose from so you can find the perfect look for your home
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <p className="text-gray-700 leading-relaxed">
                Your new bathroom suite will be delivered to you and taken into your house ready for our team to start work
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <p className="text-gray-700 leading-relaxed">
                Your bathroom fitters will arrive at install date and make sure your project is completed to highest standard, leaving you with your dream transformation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wet Wall Bathroom Design */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Wet Wall Bathroom Design</h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  A well-designed bathroom is a crucial element of any home. Whether you're looking to create a luxurious spa-like oasis or a practical and functional space, our team of expert designers can help bring your vision to life.
                </p>
                <p>
                  We offer a comprehensive bathroom design service that takes into account your unique needs and preferences. From initial consultation to final installation, our team will work closely with you every step of the way to ensure that your dream bathroom becomes a reality. We use the latest design software to create 3D renderings of your space, allowing you to visualize the finished product before any work is even started.
                </p>
                <p>
                  Our designers are up to date with the latest trends and styles and can recommend fixtures, fittings, and materials to ensure that your new bathroom not only looks great but also functions efficiently.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/ptwihbbQcVYYLPwE.png" 
                alt="Wet wall bathroom design" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bathroom Supplies */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/GdZkCfmDNHMohhfa.png" 
                alt="Bathroom supplies" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Bathroom Supplies</h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  Bathroom accessories are the finishing touches that can elevate your bathroom's style and functionality. At AV Bathroom & Kitchens, we offer a wide range of bathroom supplies and accessories to suit every taste and need. From towel racks and soap dispensers to mirrors and lighting, we have everything you need to create a well-designed and efficient bathroom.
                </p>
                <p>
                  We offer a variety of materials and finishes, from sleek and modern to classic and traditional. We assist you to choose the right supplies taking into account your unique style and budget and provide installation services to ensure that your accessories are fitted securely and properly.
                </p>
                <p>
                  Whether you're looking to update your existing bathroom or complete a full renovation, our accessories can add the perfect finishing touch to your space. We can deliver all materials to your doorstep ready for installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Start Your Bathroom<br />Transformation Today
            </h2>
            <p className="text-center text-xl mb-8 font-semibold">Ready to Transform Your Bathroom?</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
