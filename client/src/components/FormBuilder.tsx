import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";

interface FormBuilderProps {
  formId: number;
  onBack: () => void;
}

export default function FormBuilder({ formId, onBack }: FormBuilderProps) {
  const [isAddFieldDialogOpen, setIsAddFieldDialogOpen] = useState(false);
  const [newField, setNewField] = useState({
    fieldName: "",
    fieldLabel: "",
    fieldType: "text" as const,
    isRequired: false,
    placeholder: "",
  });

  const { data: formData, isLoading: formLoading, refetch: refetchForm } = trpc.forms.getBySlug.useQuery(
    { slug: 'quote-request' },
    { enabled: true }
  );

  const addFieldMutation = trpc.fields.create.useMutation({
    onSuccess: () => {
      refetchForm();
      setIsAddFieldDialogOpen(false);
      setNewField({
        fieldName: "",
        fieldLabel: "",
        fieldType: "text",
        isRequired: false,
        placeholder: "",
      });
    },
  });

  const deleteFieldMutation = trpc.fields.delete.useMutation({
    onSuccess: () => {
      refetchForm();
    },
  });

  if (formLoading) {
    return <div className="text-center py-12">Loading form...</div>;
  }

  if (!formData) {
    return <div className="text-center py-12">Form not found</div>;
  }

  const { form, fields } = formData;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{form.title}</CardTitle>
          <CardDescription>{form.description}</CardDescription>
          <div className="mt-4 text-sm">
            <p className="text-gray-600">
              Form URL: <code className="bg-gray-100 px-2 py-1 rounded">/form/{form.slug}</code>
            </p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Form Fields</CardTitle>
            <CardDescription>Add and manage custom fields for this form</CardDescription>
          </div>
          <Dialog open={isAddFieldDialogOpen} onOpenChange={setIsAddFieldDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Field
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Form Field</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Field Name (internal)</label>
                  <Input
                    placeholder="e.g., customer_name"
                    value={newField.fieldName}
                    onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Field Label (display)</label>
                  <Input
                    placeholder="e.g., Your Name"
                    value={newField.fieldLabel}
                    onChange={(e) => setNewField({ ...newField, fieldLabel: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Field Type</label>
                  <Select value={newField.fieldType} onValueChange={(value: any) => setNewField({ ...newField, fieldType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="select">Dropdown</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="radio">Radio</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Placeholder (optional)</label>
                  <Input
                    placeholder="e.g., Enter your name"
                    value={newField.placeholder}
                    onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isRequired"
                    checked={newField.isRequired}
                    onChange={(e) => setNewField({ ...newField, isRequired: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isRequired" className="text-sm font-medium">
                    Required field
                  </label>
                </div>
                <Button
                  onClick={() => {
                    addFieldMutation.mutate({
                      formId,
                      fieldName: newField.fieldName,
                      fieldLabel: newField.fieldLabel,
                      fieldType: newField.fieldType,
                      isRequired: newField.isRequired,
                      placeholder: newField.placeholder,
                      order: fields.length,
                    });
                  }}
                  disabled={!newField.fieldName || !newField.fieldLabel}
                  className="w-full"
                >
                  Add Field
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {fields && fields.length > 0 ? (
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3 flex-1">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{field.fieldLabel}</p>
                      <p className="text-sm text-gray-600">
                        {field.fieldType} {field.isRequired && "• Required"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteFieldMutation.mutate({ id: field.id })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No fields added yet. Add your first field to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
