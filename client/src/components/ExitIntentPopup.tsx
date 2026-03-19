import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface ExitIntentPopupProps {
  campaign?: {
    id: number;
    headline: string;
    subheadline?: string;
    ctaText: string;
  };
}

export default function ExitIntentPopup({ campaign }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShownOnce, setHasShownOnce] = useState(false);

  const createLeadCaptureMutation = trpc.leadCaptures.create.useMutation({
    onSuccess: () => {
      toast.success("Thank you! We'll be in touch soon.");
      setIsOpen(false);
      setEmail("");
      setPhone("");
      setName("");
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to capture lead");
      setIsSubmitting(false);
    },
  });

  useEffect(() => {
    if (hasShownOnce) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        setHasShownOnce(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownOnce]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setIsSubmitting(true);
    await createLeadCaptureMutation.mutateAsync({
      email,
      phone: phone || undefined,
      name: name || undefined,
      source: "exit-popup",
      campaignId: campaign?.id.toString(),
      pageUrl: window.location.href,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
        <div className="relative p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {campaign?.headline || "Wait! Don't Leave Yet"}
          </h2>
          {campaign?.subheadline && (
            <p className="text-gray-600 mb-6">{campaign.subheadline}</p>
          )}
          {!campaign?.subheadline && (
            <p className="text-gray-600 mb-6">
              Get a free bathroom or kitchen design consultation before you go.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <Input
              type="email"
              placeholder="Your email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Input
              type="tel"
              placeholder="Your phone (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {isSubmitting ? "Sending..." : campaign?.ctaText || "Get Free Quote"}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
