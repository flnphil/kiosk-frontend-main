import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CalendarIcon, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./../ui/select";

export function EventDateTimeInputs({
  date,
  startTime,
  endTime,
  onDateChange,
  onInputChange,
  categories,
  categoryId,
  setCategoryId,
}) {
  return (
    <>
      <div className="flex space-x-4">
        <div className="w-1/2 space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-black" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-md rounded-md">
              <Calendar
                mode="single"
                selected={date}
                onSelect={onDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-1/2 space-y-2">
          <Label htmlFor="time">Start Time</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={startTime}
            onChange={onInputChange}
            className="text-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 focus:border-purple-400"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="w-[100%]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Select Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {categories.length > 0 &&
              categories.map((cat) => (
                <SelectItem
                  key={cat.category_id}
                  value={String(cat.category_id)}
                >
                  {cat.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
