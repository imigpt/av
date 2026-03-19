import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { trpc } from "@/lib/trpc";

export function PriceCalculatorModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const isOpen = open;
  const onClose = () => onOpenChange(false);
  const [step, setStep] = useState(1);
  const [roomType, setRoomType] = useState<"bathroom" | "kitchen" | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [furnishingTier, setFurnishingTier] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createLeadCapture = trpc.leadCaptures.create.useMutation();

  const handleSubmit = async () => {
    if (!roomType || !width || !height || !furnishingTier || !name || !email || !phone) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await createLeadCapture.mutateAsync({
        email,
        phone,
        name,
        source: "price-calculator",
        pageUrl: window.location.href,
      });

      setSubmitted(true);
      setTimeout(() => {
        setStep(1);
        setRoomType(null);
        setWidth("");
        setHeight("");
        setFurnishingTier(null);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting price calculator:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const handleClose = () => {
    setStep(1);
    setRoomType(null);
    setWidth("");
    setHeight("");
    setFurnishingTier(null);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>Price Calculator</DialogTitle>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-lg font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600">Your quote request has been submitted. We'll contact you soon.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    s === step
                      ? "bg-primary text-white"
                      : s < step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
              ))}
            </div>

            {/* Step 1: Room Type */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">What type of room?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRoomType("bathroom")}
                    className={`p-4 border-2 rounded-lg text-center transition ${
                      roomType === "bathroom"
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary"
                    }`}
                  >
                    <div className="text-2xl mb-2">🚿</div>
                    <div className="font-semibold">Bathroom</div>
                  </button>
                  <button
                    onClick={() => setRoomType("kitchen")}
                    className={`p-4 border-2 rounded-lg text-center transition ${
                      roomType === "kitchen"
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary"
                    }`}
                  >
                    <div className="text-2xl mb-2">🍳</div>
                    <div className="font-semibold">Kitchen</div>
                  </button>
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!roomType}
                  className="w-full"
                >
                  Next
                </Button>
              </div>
            )}

            {/* Step 2: Dimensions */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Room Dimensions (meters)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Width (max 10m)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 3.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Height (max 10m)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 2.5"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!width || !height}
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Furnishing Tier */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Choose Furnishing Tier</h3>
                <div className="space-y-2">
                  {["Standard", "Premium", "Luxury"].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setFurnishingTier(tier)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition ${
                        furnishingTier === tier
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary"
                      }`}
                    >
                      <div className="font-semibold">{tier}</div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    disabled={!furnishingTier}
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Customer Details */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Your Details</h3>

                {/* Summary without pricing */}
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <div className="text-sm text-gray-600 mb-2">Quote Summary</div>
                  <div className="text-xs text-gray-600">
                    {roomType} • {width}m × {height}m • {furnishingTier} tier
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="07123 456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address (Optional)</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123 Main Street, London"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={createLeadCapture.isPending}
                    className="flex-1"
                  >
                    {createLeadCapture.isPending ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
