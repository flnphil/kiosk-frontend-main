import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// interface AttendeesFiltersProps {
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   userTypeFilter: string | null;
//   setUserTypeFilter: (filter: string | null) => void;
//   paymentFilter: string | null;
//   setPaymentFilter: (filter: string | null) => void;
//   clearFilters: () => void;
//   hasActiveFilters: boolean;
// }

export function AttendeesFilters({
  searchTerm,
  setSearchTerm,
  userTypeFilter,
  setUserTypeFilter,
  paymentFilter,
  setPaymentFilter,
  clearFilters,
  hasActiveFilters,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search attendees..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              <span>User Type</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setUserTypeFilter(null)}>
                All Users
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserTypeFilter("guest")}>
                Guest Users
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserTypeFilter("user")}>
                Normal Users
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              <span>Payment</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setPaymentFilter(null)}>
                All Payments
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPaymentFilter("paid")}>
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPaymentFilter("free")}>
                Free
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
