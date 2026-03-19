import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface LeadMagnetModalProps {
  campaign?: {
    id: number;
    title: string;
    description?: string;
    fileUrl?: string;
    fileName?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadMagnetModal({ campaign, isOpen, onClose }: LeadMagnetModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createLeadCaptureMutation = trpc.leadCaptures.create.useMutation({
    onSuccess: async () => {
      toast.success("Check your email for your download link!");
      if (campaign?.fileUrl) {
        window.open(campaign.fileUrl, "_blank");
      }
      setEmail("");
      setName("");
      setIsSubmitting(false);
      setTimeout(() => onClose(), 2000);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to process request");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setIsSubmitting(true);
    await createLeadCaptureMutation.mutateAsync({
      email,
      name: name || undefined,
      source: "lead-magnet",
      campaignId: campaign?.id.toString(),
      pageUrl: window.location.href,
    });
  };

  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
            <Download className="w-6 h-6 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">{campaign.title}</h2>
          {campaign.description && (
            <p className="text-gray-600 mb-6">{campaign.description}</p>
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isSubmitting ? "Processing..." : "Download Now"}
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
