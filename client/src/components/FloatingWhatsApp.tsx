import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export default function FloatingWhatsApp() {
  const [whatsappNumber, setWhatsappNumber] = useState<string>("447404023083");

  // Fetch WhatsApp number from backend
  const { data: settingsData } = trpc.settings.getWhatsApp.useQuery();

  useEffect(() => {
    if (settingsData?.whatsappNumber) {
      setWhatsappNumber(settingsData.whatsappNumber);
    }
  }, [settingsData]);

  const handleWhatsAppClick = () => {
    // Format number for WhatsApp (remove any non-digit characters)
    const cleanNumber = whatsappNumber.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hello%20AV%20Bathrooms%20%26%20Kitchens%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
      title="Chat with us on WhatsApp"
      aria-label="WhatsApp chat"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
