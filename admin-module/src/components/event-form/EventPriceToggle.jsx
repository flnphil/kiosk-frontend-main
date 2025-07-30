
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Info } from 'lucide-react';

// interface EventPriceToggleProps {
//   isFree: boolean;
//   price: number;
//   onSwitchChange: (checked: boolean) => void;
//   onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

export function EventPriceToggle({ 
  isFree, 
  price, 
  onSwitchChange, 
  onPriceChange 
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="free-event">Free Event</Label>
            <p className="text-sm text-muted-foreground">
              Toggle if this is a free event
            </p>
          </div>
          <Switch
            id="free-event"
            checked={isFree}
            onCheckedChange={onSwitchChange}
          />
        </div>
      </div>
      
      {!isFree && (
        <>
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={onPriceChange}
              placeholder="0.00"
              required={!isFree}
            />
          </div>

          <div className="rounded-md bg-blue-50 p-4 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Paid Event</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>This event will be marked as paid. Please specify the price above.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
