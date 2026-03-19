import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663083795052/ptwihbbQcVYYLPwE.png" 
                alt="Modern bathroom" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  At AV Bathrooms & Kitchens we specialise in premium bathroom and kitchen renovation, supply and installation services, delivering quality, innovation, and customer satisfaction. Established in 2009 by a local plumber and wholesale director, we have built a reputation for excellence, offering bespoke designs tailored to each client's needs.
                </p>
                <p>
                  Based in Scotland and surrounding cities from Glasgow, with our showroom in Glasgow servicing cities 50 miles from Glasgow. Our commitment to quality is reflected in our partnerships with trusted, reputable brands, ensuring every project combines style, functionality, and durability.
                </p>
                <p>
                  Recognising the importance of bathrooms and kitchens as key spaces in any home, we place great emphasis on aftercare and long-term reliability, ensuring lasting satisfaction for our customers.
                </p>
                <p className="font-semibold">
                  Get in touch today to discuss your project and discover how we can help bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Keep Improving</p>
            <h2 className="text-4xl md:text-5xl font-bold">Our Goals</h2>
          </div>
          
          <p className="text-center max-w-3xl mx-auto mb-16 text-gray-700 leading-relaxed">
            As a highly respected kitchen and bathroom installation company, we are always looking to better ourselves so we can provide our clients with the best experience possible. We have many goals that will see us reach this aim, but we have 3 primary goals that we hold above all others.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">01</div>
              <h3 className="text-2xl font-bold mb-4">Household Name</h3>
              <p className="text-gray-600 leading-relaxed">
                We have been making local home owners happy for many years, as a result we have had a lot of feedback from our customers. Our main goal is to be so well-known and trusted throughout Central Scotland, that our name is known throughout.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">02</div>
              <h3 className="text-2xl font-bold mb-4">Satisfied Customers</h3>
              <p className="text-gray-600 leading-relaxed">
                We aim to give you everything you hope for – beautiful design, quality products and competitive prices, backed with friendly and helpful customer service. The experience we provide for our customers is the achievement we're most proud of.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">03</div>
              <h3 className="text-2xl font-bold mb-4">Continual Improvement</h3>
              <p className="text-gray-600 leading-relaxed">
                At AV Bathrooms & Kitchens we offer a full range of kitchens and bathrooms in classic, traditional or contemporary style with outstanding appliances, innovative storage solutions and perfect finishing touches. We aim to improve continually with our customers support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started</h2>
            <p className="text-gray-700">Please follow the simple steps below for your dream bathrooms or kitchen.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Ready to Transform Your Kitchen?</h3>
              <ContactForm />
            </div>
            <div className="space-y-6">
              <img 
                src="/images/kitchen-design.jpg" 
                alt="Kitchen design" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
