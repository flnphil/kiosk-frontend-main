
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { MapPin, Users } from 'lucide-react';

// interface EventBasicInfoProps {
//   title: string;
//   description: string;
//   location: string;
//   capacity: string;  // Changed from 'number | ""' to 'string' to match the form state
//   onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }

export function EventBasicInfo({ title, description, location, capacity, onInputChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={onInputChange}
          placeholder="Enter event title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={onInputChange}
          placeholder="Enter event description"
          rows={5}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            name="location"
            value={location}
            onChange={onInputChange}
            placeholder="Enter event location"
            className="pl-8"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="capacity">Attendee Capacity (Optional)</Label>
        <div className="relative">
          <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={capacity}
            onChange={onInputChange}
            placeholder="Maximum number of attendees"
            className="pl-8"
          />
        </div>
      </div>
    </div>
  );
}
