import { useEffect, useState } from "react";
import ExitIntentPopup from "./ExitIntentPopup";
import StickyLeadBar from "./StickyLeadBar";
import LeadMagnetModal from "./LeadMagnetModal";
import { trpc } from "@/lib/trpc";

export default function LeadCaptureProvider() {
  const [selectedLeadMagnet, setSelectedLeadMagnet] = useState<any>(null);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);

  // Get active lead capture campaigns
  const { data: campaigns } = trpc.leadCaptureCampaigns.getActive.useQuery();

  // Get lead magnet campaigns
  const { data: leadMagnets } = trpc.leadMagnetCampaigns.list.useQuery(undefined, {
    enabled: false, // Don't fetch on mount, only when needed
  });

  // Find campaigns for current page
  const exitPopupCampaign = campaigns?.find((c) => c.type === "exit-popup");
  const stickyBarCampaign = campaigns?.find((c) => c.type === "sticky-bar");

  // Map campaigns to component props
  const exitPopupProps = exitPopupCampaign ? {
    id: exitPopupCampaign.id,
    headline: exitPopupCampaign.headline,
    subheadline: exitPopupCampaign.subheadline || undefined,
    ctaText: exitPopupCampaign.ctaText,
  } : undefined;

  const stickyBarProps = stickyBarCampaign ? {
    id: stickyBarCampaign.id,
    headline: stickyBarCampaign.headline,
    subheadline: stickyBarCampaign.subheadline || undefined,
    ctaText: stickyBarCampaign.ctaText,
  } : undefined;

  // Expose lead magnet trigger to window for use in components
  useEffect(() => {
    (window as any).showLeadMagnet = (slug: string) => {
      // In a real app, you'd fetch the specific lead magnet by slug
      // For now, we'll just set a placeholder
      setSelectedLeadMagnet({ id: 1, title: "Free Guide", slug });
      setIsLeadMagnetOpen(true);
    };
  }, []);

  return (
    <>
      {/* Exit-Intent Popup */}
      <ExitIntentPopup campaign={exitPopupProps} />

      {/* Sticky Lead Capture Bar */}
      <StickyLeadBar campaign={stickyBarProps} />

      {/* Lead Magnet Modal */}
      <LeadMagnetModal
        campaign={selectedLeadMagnet}
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
      />
    </>
  );
}
