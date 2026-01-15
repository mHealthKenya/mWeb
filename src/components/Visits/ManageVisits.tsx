import useUsersByRole from '@services/users/by-role';
import { Button } from '@ui/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/ui/card';
import { Label } from '@ui/ui/label';
import { MessageSquare, X, ChevronsUpDown, Check } from 'lucide-react';
import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@ui/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@ui/ui/command';
import useVisitCount from '@services/visits/visitCount';

export type ManageVisitsProps = {
  onCancel: () => void;
  onSuccess?: () => void;
};

const ManageVisits = ({ onCancel, onSuccess }: ManageVisitsProps) => {
  const { data: mothers = [], isLoading } = useUsersByRole('Mother', []);
  const [formData, setFormData] = React.useState({
    motherId: '',
    visitCount: 0,
  });

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Null-safe filtering for mothers
  const filteredMothers = mothers
    .filter(m => m && m.name)
    .filter(m =>
      (m.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { mutateAsync: submitVisit } = useVisitCount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.motherId || formData.visitCount <= 0) return;

    // Submit logic here
    console.log('Submitted:', formData);
    submitVisit({
      userId: formData.motherId,
      count: formData.visitCount,
    });
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto mt-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Manage non Updated Visits
            </CardTitle>
            <CardDescription>
              Update and edit visits that haven&apos;t been recorded
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Searchable Mother Select */}
            <div className="space-y-2">
              <Label>Mother Name</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {formData.motherId
                      ? mothers.find(m => m?.id === formData.motherId)?.name
                      : "Search mother..."}
                    <ChevronsUpDown className="w-4 h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0 max-h-80 overflow-y-auto">
                  <Command>
                    <CommandInput
                      placeholder="Search mother..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      autoFocus
                      disabled={isLoading} // disable input if loading
                    />
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Loading mothers...
                      </div>
                    ) : (
                      <>
                        <CommandEmpty>No mother found.</CommandEmpty>
                        <CommandGroup>
                          {filteredMothers.map(mother => (
                            <CommandItem
                              key={mother.id}
                              value={mother.id}
                              onSelect={() => {
                                setFormData({ ...formData, motherId: mother.id });
                                setOpen(false);
                                setSearchQuery('');
                              }}
                            >
                              {mother.name}
                              {formData.motherId === mother.id && (
                                <Check className="ml-auto w-4 h-4" />
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Visit Count */}
            <div className="space-y-2">
              <Label htmlFor="visitCount">Visit Count</Label>
              <input
                id="visitCount"
                type="number"
                className="border rounded p-2 w-full"
                value={formData.visitCount}
                onChange={e =>
                  setFormData({
                    ...formData,
                    visitCount: Number(e.target.value), // ensure number type
                  })
                }
                placeholder="Enter visit count"
                min={0}
              />
            </div>

            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageVisits;
