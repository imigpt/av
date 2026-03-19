import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Briefcase, Award } from "lucide-react";

export default function Construction() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/DWKYzxHQSmOgDSWL.png" 
            alt="Construction services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative h-full container flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              We Handle It All
            </h1>
            <p className="text-xl mb-8">
              Complete Residential and Commercial Solutions with AV Property Design and Build.
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
              At AV Property Design and Build, we specialize in transforming both residential and commercial spaces. From kitchen and bathroom renovations to new builds and complete commercial redesigns, we offer end-to-end services to bring your vision to life with precision and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Why Choose AV Property<br />Design and Build?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Complete Project Management</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We take care of every aspect of your project, from concept through to construction, ensuring smooth coordination and on-time delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Tailored Residential Solutions</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Whether upgrading your home or building from the ground up, we create personalized designs that fit your style and functionality needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Briefcase className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Innovative Commercial Design</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We understand the unique needs of businesses. Our designs combine functionality, style, and efficiency to create spaces that work as hard as you do.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Quality Craftsmanship</h3>
                  <p className="text-gray-600 leading-relaxed">
                    With over a decade of experience, we bring high-quality materials and expert craftsmanship to every project, ensuring lasting value and superior results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Our Comprehensive Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Consultation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We listen to your goals and help define a clear vision for your project.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Design & Planning</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Custom layouts tailored to residential and commercial needs.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Material Sourcing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer premium materials to match your aesthetic and functional requirements.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Construction & Renovation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Full-service construction, including plumbing, electrical, carpentry, and more.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Finishing Touches</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We ensure every detail is perfect before completion, delivering a polished final product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Let's Bring Your Vision to Life</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Are you ready to transform your space? Contact us today for a consultation, and let's discuss how we can create a space that works for you and your loved ones.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Ready to turn your dream<br />home into reality?
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
