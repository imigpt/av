import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Eye, LogOut, Settings, Mail, Copy, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { toast } from "sonner";

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Dropdown (Select)" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio Button" },
];

export default function AdminDashboard() {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState<string>("447404023083");
  const [isUpdatingWhatsApp, setIsUpdatingWhatsApp] = useState(false);
  const [newCampaignTitle, setNewCampaignTitle] = useState("");
  const [newCampaignType, setNewCampaignType] = useState<"exit-popup" | "sticky-bar">("exit-popup");
  const [newCampaignHeadline, setNewCampaignHeadline] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("adminEmail");
    if (!email) {
      window.location.href = "/admin/login";
    } else {
      setAdminEmail(email);
    }
  }, []);

  // Get the quote-request form
  const { data: quoteFormData } = trpc.forms.getBySlug.useQuery(
    { slug: "quote-request" },
    { enabled: !!adminEmail }
  );

  // Get the contact-inquiry form
  const { data: contactFormData } = trpc.forms.getBySlug.useQuery(
    { slug: "contact-inquiry" },
    { enabled: !!adminEmail }
  );

  const quoteForm = quoteFormData?.form;
  const quoteFields = quoteFormData?.fields || [];
  const contactForm = contactFormData?.form;

  // Get quote submissions
  const { data: quoteSubmissions, refetch: refetchQuoteSubmissions } = trpc.submissions.list.useQuery(
    { formId: quoteForm?.id || 0 },
    { enabled: !!quoteForm?.id }
  );

  // Get contact submissions
  const { data: contactSubmissions, refetch: refetchContactSubmissions } = trpc.submissions.list.useQuery(
    { formId: contactForm?.id || 0 },
    { enabled: !!contactForm?.id }
  );

  // Get selected submission details
  const { data: selectedSubmission } = trpc.submissions.getById.useQuery(
    { id: selectedSubmissionId! },
    { enabled: !!selectedSubmissionId }
  );

  // Get WhatsApp number
  const { data: settingsData } = trpc.settings.getWhatsApp.useQuery();

  // Get lead captures
  const { data: allLeadCaptures, refetch: refetchLeadCaptures } = trpc.leadCaptures.list.useQuery(undefined, {
    enabled: !!adminEmail,
  });

  // Get lead capture campaigns
  const { data: campaigns, refetch: refetchCampaigns } = trpc.leadCaptureCampaigns.list.useQuery(undefined, {
    enabled: !!adminEmail,
  });

  useEffect(() => {
    if (settingsData?.whatsappNumber) {
      setWhatsappNumber(settingsData.whatsappNumber);
    }
  }, [settingsData]);

  // Mutations
  const addFieldMutation = trpc.fields.create.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const deleteFieldMutation = trpc.fields.delete.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const updateWhatsAppMutation = trpc.settings.setWhatsApp.useMutation({
    onSuccess: () => {
      toast.success("WhatsApp number updated successfully!");
      setIsUpdatingWhatsApp(false);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update WhatsApp number");
    }
  });

  const createCampaignMutation = trpc.leadCaptureCampaigns.create.useMutation({
    onSuccess: () => {
      toast.success("Campaign created successfully!");
      setNewCampaignTitle("");
      setNewCampaignHeadline("");
      refetchCampaigns();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create campaign");
    }
  });

  const deleteCampaignMutation = trpc.leadCaptureCampaigns.delete.useMutation({
    onSuccess: () => {
      toast.success("Campaign deleted successfully!");
      refetchCampaigns();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete campaign");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    window.location.href = "/";
  };

  const handleAddField = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const fieldName = (formElement.querySelector('[name="fieldName"]') as HTMLInputElement)?.value;
    const fieldType = (formElement.querySelector('[name="fieldType"]') as HTMLSelectElement)?.value;

    if (!fieldName || !fieldType || !quoteForm?.id) return;

    await addFieldMutation.mutateAsync({
      formId: quoteForm.id,
      fieldName: fieldName.toLowerCase().replace(/\s+/g, "_"),
      fieldLabel: fieldName,
      fieldType: fieldType as any,
      isRequired: true,
    });

    formElement.reset();
  };

  const handleUpdateWhatsApp = async () => {
    if (!whatsappNumber.trim()) {
      toast.error("Please enter a valid WhatsApp number");
      return;
    }
    await updateWhatsAppMutation.mutateAsync({ whatsappNumber });
  };

  const handleCreateCampaign = async () => {
    if (!newCampaignTitle.trim() || !newCampaignHeadline.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    await createCampaignMutation.mutateAsync({
      title: newCampaignTitle,
      type: newCampaignType,
      headline: newCampaignHeadline,
      isActive: true,
    });
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(Date.now());
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!adminEmail) {
    return <div>Redirecting...</div>;
  }

  const SubmissionsTable = ({ submissions }: { submissions: any[] | undefined }) => {
    if (!submissions || submissions.length === 0) {
      return <p className="text-gray-500 text-center py-8">No submissions yet</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Email</th>
              <th className="text-left py-3 px-4 font-semibold">Phone</th>
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission: any) => (
              <tr key={submission.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{submission.submitterName || "N/A"}</td>
                <td className="py-3 px-4">{submission.submitterEmail || "N/A"}</td>
                <td className="py-3 px-4">{submission.submitterPhone || "N/A"}</td>
                <td className="py-3 px-4">{format(new Date(submission.createdAt), "MMM dd, yyyy")}</td>
                <td className="py-3 px-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedSubmissionId(submission.id)}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Submission Details</DialogTitle>
                      </DialogHeader>
                      {selectedSubmission && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-500">Name</p>
                              <p>{selectedSubmission.submitterName || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-500">Email</p>
                              <p>{selectedSubmission.submitterEmail || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-500">Phone</p>
                              <p>{selectedSubmission.submitterPhone || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-500">Date</p>
                              <p>{format(new Date(selectedSubmission.createdAt), "MMM dd, yyyy HH:mm")}</p>
                            </div>
                          </div>
                          <div className="border-t pt-4">
                            <p className="text-sm font-semibold text-gray-500 mb-2">Form Data</p>
                            <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-64">
                              {JSON.stringify(
                                typeof selectedSubmission.submissionData === "string"
                                  ? JSON.parse(selectedSubmission.submissionData)
                                  : selectedSubmission.submissionData,
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const LeadCapturesTable = ({ leads }: { leads: any[] | undefined }) => {
    if (!leads || leads.length === 0) {
      return <p className="text-gray-500 text-center py-8">No leads captured yet</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold">Email</th>
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Source</th>
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead: any) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-mono text-sm">{lead.email}</td>
                <td className="py-3 px-4">{lead.name || "N/A"}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                    {lead.source}
                  </span>
                </td>
                <td className="py-3 px-4">{format(new Date(lead.createdAt), "MMM dd, yyyy")}</td>
                <td className="py-3 px-4">
                  <Button
                    onClick={() => handleCopyEmail(lead.email)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedId === lead.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedId === lead.id ? "Copied" : "Copy"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage forms, leads, campaigns, and settings</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="form-builder" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="form-builder">Forms</TabsTrigger>
            <TabsTrigger value="quote-requests">Quotes ({quoteSubmissions?.length || 0})</TabsTrigger>
            <TabsTrigger value="contact-inquiries">Contacts ({contactSubmissions?.length || 0})</TabsTrigger>
            <TabsTrigger value="lead-captures">Leads ({allLeadCaptures?.length || 0})</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns ({campaigns?.length || 0})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Form Builder Tab */}
          <TabsContent value="form-builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get a Quote Form</CardTitle>
                <CardDescription>Add, edit, or remove fields from your form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Field Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-semibold mb-4">Add New Field</h3>
                  <form onSubmit={handleAddField} className="space-y-4">
                    <Input
                      name="fieldName"
                      placeholder="e.g., Project Type, Budget, Timeline"
                      required
                    />
                    <Select name="fieldType" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FIELD_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 gap-2">
                      <Plus className="w-4 h-4" />
                      Add Field
                    </Button>
                  </form>
                </div>

                {/* Current Fields */}
                <div>
                  <h3 className="font-semibold mb-4">Current Fields ({quoteFields.length})</h3>
                  <div className="space-y-2">
                    {quoteFields.map((field: any) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{field.fieldLabel}</p>
                          <p className="text-sm text-gray-500">
                            Type: {field.fieldType}
                            {field.isRequired && " • Required"}
                          </p>
                        </div>
                        <Button
                          onClick={() => deleteFieldMutation.mutate({ id: field.id })}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quote Requests Tab */}
          <TabsContent value="quote-requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quote Request Submissions</CardTitle>
                <CardDescription>All leads from your Get a Quote form</CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionsTable submissions={quoteSubmissions} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Inquiries Tab */}
          <TabsContent value="contact-inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Inquiry Submissions</CardTitle>
                <CardDescription>All inquiries from your Contact Us form</CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionsTable submissions={contactSubmissions} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lead Captures Tab */}
          <TabsContent value="lead-captures" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Captures</CardTitle>
                <CardDescription>Emails captured from popups, sticky bars, and lead magnets</CardDescription>
              </CardHeader>
              <CardContent>
                <LeadCapturesTable leads={allLeadCaptures} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Capture Campaigns</CardTitle>
                <CardDescription>Create and manage exit popups and sticky bars</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Create New Campaign */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-semibold mb-4">Create New Campaign</h3>
                  <div className="space-y-4">
                    <Input
                      placeholder="Campaign title"
                      value={newCampaignTitle}
                      onChange={(e) => setNewCampaignTitle(e.target.value)}
                    />
                    <Select value={newCampaignType} onValueChange={(val: any) => setNewCampaignType(val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exit-popup">Exit-Intent Popup</SelectItem>
                        <SelectItem value="sticky-bar">Sticky Lead Bar</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Headline (e.g., Don't Leave Yet!)"
                      value={newCampaignHeadline}
                      onChange={(e) => setNewCampaignHeadline(e.target.value)}
                    />
                    <Button
                      onClick={handleCreateCampaign}
                      disabled={createCampaignMutation.isPending}
                      className="w-full bg-red-600 hover:bg-red-700 gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      {createCampaignMutation.isPending ? "Creating..." : "Create Campaign"}
                    </Button>
                  </div>
                </div>

                {/* Active Campaigns */}
                <div>
                  <h3 className="font-semibold mb-4">Active Campaigns ({campaigns?.length || 0})</h3>
                  <div className="space-y-2">
                    {campaigns?.map((campaign: any) => (
                      <div
                        key={campaign.id}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{campaign.title}</p>
                          <p className="text-sm text-gray-500">
                            {campaign.type} • {campaign.headline} • {campaign.captureCount} captures
                          </p>
                        </div>
                        <Button
                          onClick={() => deleteCampaignMutation.mutate({ id: campaign.id })}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Configuration</CardTitle>
                <CardDescription>Manage your WhatsApp number for the floating button</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                  <p className="text-xs text-gray-500 mb-2">Enter the phone number with country code (e.g., 447404023083 for UK)</p>
                  <Input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="e.g., 447404023083"
                    className="font-mono"
                  />
                </div>
                <Button
                  onClick={handleUpdateWhatsApp}
                  disabled={isUpdatingWhatsApp || updateWhatsAppMutation.isPending}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isUpdatingWhatsApp || updateWhatsAppMutation.isPending ? "Updating..." : "Update WhatsApp Number"}
                </Button>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> The WhatsApp button will appear on all pages of your website and use this number.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
