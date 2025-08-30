import { useState } from "react";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const AddInvoice = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(true);
  const [lockPrices, setLockPrices] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Add Invoice</h2>
            <p className="text-sm text-muted-foreground">Create and send a new invoice</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">CWC</span>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-muted-foreground">Invoice content would go here...</p>
          </div>
        </main>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-modal-overlay flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Send Invoice</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInvoiceModal(false)}
                className="rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* To and From Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="to" className="text-sm font-medium text-foreground">
                    To
                  </Label>
                  <Input
                    id="to"
                    defaultValue="david@gmail.com"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from" className="text-sm font-medium text-foreground">
                    From
                  </Label>
                  <Input
                    id="from"
                    defaultValue='"My store" <cwc@gmail.com>'
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Invoice Name */}
              <div className="space-y-2">
                <Label htmlFor="invoice-name" className="text-sm font-medium text-foreground">
                  Invoice (name)
                </Label>
                <Input
                  id="invoice-name"
                  placeholder="Invoice (name)"
                  className="rounded-lg"
                />
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <Label htmlFor="custom-message" className="text-sm font-medium text-foreground">
                  Custom message (optional)
                </Label>
                <Textarea
                  id="custom-message"
                  className="rounded-lg min-h-[80px] resize-none"
                  placeholder="Enter your custom message here..."
                />
              </div>

              {/* Product Prices Toggle */}
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 text-foreground">🔒</div>
                    <span className="text-sm font-medium text-foreground">Product prices</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lock all product prices so they don't change.
                  </p>
                </div>
                <Switch
                  checked={lockPrices}
                  onCheckedChange={setLockPrices}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <Button
                variant="secondary"
                onClick={() => setShowInvoiceModal(false)}
              >
                Cancel
              </Button>
              <Button variant="default">
                Review Invoice
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInvoice;
