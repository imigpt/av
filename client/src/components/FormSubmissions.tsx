import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Trash2, Download } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface FormSubmissionsProps {
  formId: number;
}

export default function FormSubmissions({ formId }: FormSubmissionsProps) {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);

  const { data: submissions, isLoading, refetch } = trpc.submissions.list.useQuery(
    { formId },
    { enabled: !!formId }
  );

  const { data: selectedSubmission } = trpc.submissions.getById.useQuery(
    { id: selectedSubmissionId! },
    { enabled: !!selectedSubmissionId }
  );

  const deleteSubmissionMutation = trpc.submissions.delete.useMutation({
    onSuccess: () => {
      refetch();
      setSelectedSubmissionId(null);
    },
  });

  const markAsReadMutation = trpc.submissions.markAsRead.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const downloadCSV = () => {
    if (!submissions) return;

    const headers = ["ID", "Name", "Email", "Phone", "Submitted At", "Data"];
    const rows = submissions.map((sub) => [
      sub.id,
      sub.submitterName || "-",
      sub.submitterEmail || "-",
      sub.submitterPhone || "-",
      format(new Date(sub.createdAt), "yyyy-MM-dd HH:mm:ss"),
      JSON.stringify(JSON.parse(sub.submissionData as string)),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${formId}-${Date.now()}.csv`;
    a.click();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Form Submissions</CardTitle>
          <CardDescription>
            {submissions?.length || 0} submission{submissions?.length !== 1 ? "s" : ""}
          </CardDescription>
        </div>
        {submissions && submissions.length > 0 && (
          <Button variant="outline" onClick={downloadCSV} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading submissions...</div>
        ) : submissions && submissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 font-medium">Submitted</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{submission.submitterName || "-"}</td>
                    <td className="py-3 px-4">{submission.submitterEmail || "-"}</td>
                    <td className="py-3 px-4">{submission.submitterPhone || "-"}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {format(new Date(submission.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedSubmissionId(submission.id);
                                if (!submission.isRead) {
                                  markAsReadMutation.mutate({ id: submission.id });
                                }
                              }}
                            >
                              <Eye className="w-4 h-4" />
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
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-medium">{selectedSubmission.submitterName || "-"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium">{selectedSubmission.submitterEmail || "-"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium">{selectedSubmission.submitterPhone || "-"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Submitted</p>
                                    <p className="font-medium">
                                      {format(new Date(selectedSubmission.createdAt), "PPP p")}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600 mb-2">Form Data</p>
                                  <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                                    <pre className="text-xs whitespace-pre-wrap break-words">
                                      {JSON.stringify(
                                        JSON.parse(selectedSubmission.submissionData as string),
                                        null,
                                        2
                                      )}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteSubmissionMutation.mutate({ id: submission.id })}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            <p>No submissions yet. Share your form to start receiving submissions!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
