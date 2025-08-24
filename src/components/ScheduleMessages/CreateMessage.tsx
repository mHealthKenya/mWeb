"use client";

import { useState } from "react";
import { X, MessageSquare, Calendar } from "lucide-react";
import { Label } from "@ui/ui/label";
import { Input } from "@ui/ui/input";
import { Button } from "@ui/ui/button";
import { Textarea } from "@ui/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/ui/card";
import { useToast } from "@ui/ui/use-toast";
import useAddScheduledMessage from "@services/scheduledMessages/scheduledMessages";

export type CreateMessageFormProps = {
  onCancel: () => void;
  onSuccess?: () => void;
};

enum MessageCategory {
  GENERAL = "GENERAL",
  GESTATION_PERIOD = "GESTATION_PERIOD",
  HIGH_RISK = "HIGH_RISK",
}

export function CreateMessageForm({ onCancel, onSuccess }: CreateMessageFormProps) {
  const [category, setCategory] = useState<MessageCategory>(MessageCategory.GENERAL);
  const [formData, setFormData] = useState({
    message: "",
    scheduledAt: "",
    gestationTarget: "",
    riskCondition: "",
  });

  const [errors, setErrors] = useState<{ message?: string; scheduledAt?: string; gestationTarget?: string; riskCondition?: string }>({});
  const { toast } = useToast();

  const { mutateAsync: createMessage, isLoading } = useAddScheduledMessage();

  const validateForm = () => {
    const e: typeof errors = {};
    if (!formData.message.trim()) e.message = "Message is required";
    if (category === MessageCategory.GENERAL && !formData.scheduledAt) e.scheduledAt = "Scheduled date/time is required";
    if (category === MessageCategory.GESTATION_PERIOD && !formData.gestationTarget) e.gestationTarget = "Gestation weeks target is required";
    if (category === MessageCategory.HIGH_RISK && !formData.riskCondition) e.riskCondition = "Select a risk condition";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload: any = { message: formData.message, category };
    if (category === MessageCategory.GENERAL) payload.scheduledAt = new Date(formData.scheduledAt).toISOString();
    if (category === MessageCategory.GESTATION_PERIOD) payload.gestationTarget = parseInt(formData.gestationTarget, 10);
    if (category === MessageCategory.HIGH_RISK) payload.riskCondition = formData.riskCondition;

    try {
      await createMessage(payload);
      onSuccess?.();
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Failed to schedule message.", variant: "destructive" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto mt-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Schedule New Message</CardTitle>
            <CardDescription>Send a targeted message based on category</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}><X className="w-4 h-4" /></Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <Label>Message Category</Label>
              <div className="flex flex-wrap gap-4">
                {Object.values(MessageCategory).map((cat) => (
                  <label key={cat} className="flex items-center gap-2">
                    <input type="radio" name="category" value={cat} checked={category === cat} onChange={() => setCategory(cat as MessageCategory)} />
                    {cat.replace(/_/g, " ")}
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional Inputs */}
            {category === MessageCategory.GENERAL && (
              <div className="space-y-2">
                <Label htmlFor="scheduledAt" className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Scheduled Date & Time</Label>
                <Input id="scheduledAt" type="datetime-local" value={formData.scheduledAt} onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })} min={new Date().toISOString().slice(0, 16)} />
                {errors.scheduledAt && <p className="text-sm text-red-600">{errors.scheduledAt}</p>}
              </div>
            )}

            {category === MessageCategory.GESTATION_PERIOD && (
              <div className="space-y-2">
                <Label htmlFor="gestationTarget">Target Gestation (Weeks)</Label>
                <Input id="gestationTarget" type="number" placeholder="e.g., 20" value={formData.gestationTarget} onChange={(e) => setFormData({ ...formData, gestationTarget: e.target.value })} />
                {errors.gestationTarget && <p className="text-sm text-red-600">{errors.gestationTarget}</p>}
              </div>
            )}

            {category === MessageCategory.HIGH_RISK && (
              <div className="space-y-2">
                <Label htmlFor="riskCondition">Risk Condition</Label>
                <select id="riskCondition" className="border rounded p-2 w-full" value={formData.riskCondition} onChange={(e) => setFormData({ ...formData, riskCondition: e.target.value })}>
                  <option value="">Select a risk condition</option>
                  <option value="AGE_35_PLUS">Age 35+</option>
                  <option value="MULTIPLE_PREGNANCY">Multiple Pregnancy</option>
                  <option value="UNDERWEIGHT">Underweight (Weight &lt; 45kg)</option>
                  <option value="HIGH_PARITY">High Parity</option>
                </select>
                {errors.riskCondition && <p className="text-sm text-red-600">{errors.riskCondition}</p>}
              </div>
            )}

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message Content</Label>
              <Textarea id="message" placeholder="Enter your message content..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="resize-none" />
              {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-primary" disabled={isLoading}>{isLoading ? "Scheduling..." : "Schedule Message"}</Button>
              <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
