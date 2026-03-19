import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect as useEffectHook } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    source: "",
    enquiry: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactFormId, setContactFormId] = useState<number | null>(null);

  // Fetch contact-inquiry form ID
  const { data: contactForm } = trpc.forms.getBySlug.useQuery(
    { slug: "contact-inquiry" },
    { enabled: true }
  );

  useEffectHook(() => {
    if (contactForm?.form?.id) {
      setContactFormId(contactForm.form.id);
    }
  }, [contactForm]);

  useEffect(() => {
    document.title = "Contact AV Bathrooms & Kitchens | Get in Touch";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Contact AV Bathrooms & Kitchens in London. Call us, visit our showroom, or fill out our contact form for a quick quote on bathroom and kitchen installation."
      );
    }
  }, []);

  const submitSubmissionMutation = trpc.submissions.submit.useMutation({
    onSuccess: () => {
      toast.success("Your inquiry has been submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        source: "",
        enquiry: ""
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to submit inquiry");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!contactFormId) {
        toast.error("Contact form not found");
        return;
      }

      await submitSubmissionMutation.mutateAsync({
        formId: contactFormId,
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          source: formData.source,
          enquiry: formData.enquiry
        },
        email: formData.email,
        name: formData.name,
        phone: formData.phone
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-center">
            Contact Us Today
          </h1>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Fill in Our Form For A Quick Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Where did you hear about us?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="bing">Bing</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="word-of-mouth">Word of mouth</SelectItem>
                    <SelectItem value="radio">Radio</SelectItem>
                    <SelectItem value="newspaper">Newspaper</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Enquiry"
                  value={formData.enquiry}
                  onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                  rows={5}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  By filling in this form, I agree with the privacy policy and terms and conditions.
                </p>
                <Button type="submit" className="w-full" disabled={isSubmitting || submitSubmissionMutation.isPending}>
                  {isSubmitting || submitSubmissionMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Affordable Transformations</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-start gap-4 mb-6">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Phone</h3>
                    <a href="tel:+447404023083" className="block text-gray-700 hover:text-primary transition-colors mb-1">
                      +44 7404 023083
                    </a>
                    <a href="tel:02045724808" className="block text-gray-700 hover:text-primary transition-colors">
                      (020) 4572 4808
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Address</h3>
                    <p className="text-gray-700">AV Bathrooms Ltd.</p>
                    <p className="text-gray-700">12 Hanson Street,</p>
                    <p className="text-gray-700">Glasgow G31 2JW</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-start gap-4 mb-6">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <a href="mailto:info@avbathrooms.co.uk" className="text-gray-700 hover:text-primary transition-colors">
                      info@avbathrooms.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Visit Our Showroom</h2>
          <div className="max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="500"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8589882682906!2d-0.08274932346034!3d51.52327097149277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48860a5c5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2s86%20Paul%20St%2C%20London%20EC2A%204NE!5e0!3m2!1sen!2suk!4v1234567890"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
