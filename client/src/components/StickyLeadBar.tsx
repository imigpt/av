import { useState } from "react";
import { X, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface StickyLeadBarProps {
  campaign?: {
    id: number;
    headline: string;
    subheadline?: string;
    ctaText: string;
  };
}

export default function StickyLeadBar({ campaign }: StickyLeadBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const createLeadCaptureMutation = trpc.leadCaptures.create.useMutation({
    onSuccess: () => {
      toast.success("Thank you! Check your email for your free quote.");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setIsVisible(false), 2000);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to capture lead");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsSubmitting(true);
    await createLeadCaptureMutation.mutateAsync({
      email,
      phone,
      source: "sticky-bar",
      campaignId: campaign?.id.toString(),
      pageUrl: window.location.href,
    });
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "h-12" : "h-auto"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        {!isCollapsed ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg">
                {campaign?.headline || "Get a Free Quote in 2 Minutes"}
              </h3>
              {campaign?.subheadline && (
                <p className="text-sm text-red-100">{campaign.subheadline}</p>
              )}
              {!campaign?.subheadline && (
                <p className="text-sm text-red-100">No obligation • Takes just 2 minutes</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 sm:flex-none sm:w-48 bg-white text-gray-900 placeholder-gray-500 border-0"
              />
              <Input
                type="tel"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 sm:flex-none sm:w-48 bg-white text-gray-900 placeholder-gray-500 border-0"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-red-600 hover:bg-gray-100 font-semibold whitespace-nowrap"
              >
                {isSubmitting ? "Sending..." : campaign?.ctaText || "Get Quote"}
              </Button>
            </form>

            <div className="flex gap-2">
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-2 hover:bg-red-600/50 rounded transition-colors"
                title="Collapse"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-red-600/50 rounded transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsCollapsed(false)}
              className="text-sm font-semibold hover:underline"
            >
              {campaign?.headline || "Get a Free Quote"}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-1 hover:bg-red-600/50 rounded transition-colors"
                title="Expand"
              >
                <ChevronUp className="w-4 h-4 transform rotate-180" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-red-600/50 rounded transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
