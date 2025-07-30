
import React from 'react';
import { Button } from "../ui/button";
import { DownloadIcon } from 'lucide-react';

export function AttendeesHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">All Attendees</h1>
      <Button>
        <DownloadIcon className="mr-2 h-4 w-4" />
        Export Attendees
      </Button>
    </div>
  );
}
