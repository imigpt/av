import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useLocation } from "wouter";
import { Star, Award, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DynamicForm() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const { data: formData, isLoading, error } = trpc.forms.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  const submitFormMutation = trpc.submissions.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormValues({});
      setTimeout(() => {
        setLocation("/");
      }, 3000);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-gray-600 mb-4">Form not found</p>
            <Button onClick={() => setLocation("/")}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { form, fields } = formData;

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Card className="max-w-md border-2 border-green-200 shadow-lg">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-green-700">Thank You!</h2>
            <p className="text-gray-700 mb-2 font-medium">Your quote request has been received</p>
            <p className="text-gray-600 mb-4">Our team will contact you within 24 hours with your personalized estimate.</p>
            <p className="text-sm text-gray-500">Redirecting to home...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFormMutation.mutate({
      formId: form.id,
      data: formValues,
      email: formValues.email,
      name: formValues.name,
      phone: formValues.phone,
    });
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const renderField = (field: any) => {
    const value = formValues[field.fieldName] || "";
    const commonProps = {
      id: field.fieldName,
      required: field.isRequired,
      placeholder: field.placeholder,
    };

    switch (field.fieldType) {
      case "email":
        return (
          <Input
            {...commonProps}
            type="email"
            value={value}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        );
      case "phone":
        return (
          <Input
            {...commonProps}
            type="tel"
            value={value}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        );
      case "textarea":
        return (
          <Textarea
            {...commonProps}
            value={value}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            rows={5}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        );
      case "select":
        let options: string[] = [];
        if (field.options) {
          try {
            if (Array.isArray(field.options)) {
              options = field.options;
            } else if (typeof field.options === 'string') {
              options = JSON.parse(field.options);
            }
          } catch (e) {
            options = typeof field.options === 'string' ? field.options.split(',').map((s: string) => s.trim()) : [];
          }
        }
        return (
          <Select value={value} onValueChange={(val) => handleInputChange(field.fieldName, val)}>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder={field.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt: string) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "date":
        return (
          <Input
            {...commonProps}
            type="date"
            value={value}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        );
      case "number":
        return (
          <Input
            {...commonProps}
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={field.fieldName}
              checked={value}
              onChange={(e) => handleInputChange(field.fieldName, e.target.checked)}
              className="w-4 h-4 text-primary rounded"
            />
            <label htmlFor={field.fieldName} className="text-sm font-medium">
              {field.fieldLabel}
            </label>
          </div>
        );
      case "radio":
        let radioOptions: string[] = [];
        if (field.options) {
          try {
            if (Array.isArray(field.options)) {
              radioOptions = field.options;
            } else if (typeof field.options === 'string') {
              radioOptions = JSON.parse(field.options);
            }
          } catch (e) {
            radioOptions = typeof field.options === 'string' ? field.options.split(',').map((s: string) => s.trim()) : [];
          }
        }
        return (
          <div className="space-y-2">
            {radioOptions.map((opt: string) => (
              <div key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`${field.fieldName}-${opt}`}
                  name={field.fieldName}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor={`${field.fieldName}-${opt}`} className="text-sm font-medium">
                  {opt}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <Input
            {...commonProps}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary via-red-600 to-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Free Quote</h1>
            <p className="text-lg text-white/90">Professional bathroom and kitchen fitting services. Fill out the form below and our expert team will provide you with a detailed, no-obligation quote within 24 hours.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <CardTitle className="text-2xl text-gray-800">{form.title}</CardTitle>
                {form.description && <CardDescription className="text-base mt-2 text-gray-600">{form.description}</CardDescription>}
              </CardHeader>
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {fields.map((field) => (
                    <div key={field.id}>
                      {field.fieldType !== "checkbox" && field.fieldType !== "radio" && (
                        <label htmlFor={field.fieldName} className="block text-sm font-semibold mb-3 text-gray-700">
                          {field.fieldLabel}
                          {field.isRequired && <span className="text-primary ml-1">*</span>}
                        </label>
                      )}
                      <div className="relative">
                        {renderField(field)}
                      </div>
                    </div>
                  ))}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary hover:to-red-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    disabled={submitFormMutation.isPending}
                  >
                    {submitFormMutation.isPending ? "Submitting..." : "Get My Free Quote"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Trust Signals */}
          <div className="space-y-8">
            {/* Awards Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-bold text-gray-800">Awards & Recognition</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border-l-4 border-amber-500">
                  <p className="font-semibold text-sm text-gray-800">Best Bathroom Fitters 2023</p>
                  <p className="text-xs text-gray-600">London Home Improvement Awards</p>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-amber-500">
                  <p className="font-semibold text-sm text-gray-800">5-Star Service Excellence</p>
                  <p className="text-xs text-gray-600">Trustpilot Certified</p>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-amber-500">
                  <p className="font-semibold text-sm text-gray-800">Top Rated Kitchen Installers</p>
                  <p className="text-xs text-gray-600">Google Reviews 2024</p>
                </div>
              </div>
            </div>

            {/* Google Reviews */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-gray-800">200+ Reviews</span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-2xl font-bold text-gray-800">4.9/5.0</p>
                <p className="text-sm text-gray-600">Based on Google Customer Reviews</p>
              </div>
              <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                <p className="text-sm font-medium text-gray-800 mb-1">"Absolutely brilliant service!"</p>
                <p className="text-xs text-gray-600">⭐⭐⭐⭐⭐ Sarah M., London</p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Why Choose Us?</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Expert installation by certified professionals</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">10-year warranty on all work</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Free consultation & design</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Competitive pricing guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "James Thompson",
                location: "Manchester",
                text: "Outstanding work! The team was professional, punctual, and the quality is exceptional. Highly recommend!",
                rating: 5
              },
              {
                name: "Emma Wilson",
                location: "Birmingham",
                text: "Transformed our bathroom completely. The attention to detail was incredible and they finished on time.",
                rating: 5
              },
              {
                name: "David Chen",
                location: "Leeds",
                text: "Best decision we made. From design to installation, everything was perfect. Worth every penny!",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
