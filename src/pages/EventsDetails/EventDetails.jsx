import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar/Nabbar";
import FindEvents from "../../components/FindEvents/FindEvents";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";
import Footer from "../../components/Footer/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

const EventsDetails = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalRecords = 1259;

  const from = (currentPage - 1) * entriesPerPage + 1;
  const to = Math.min(currentPage * entriesPerPage, totalRecords);

  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        console.log("Token: ", jwtDecode(token));
        jwtDecode(token);
        setUserStatus(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <>
      <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white overflow-hidden w-full relative">
          <div className="p-[30px] pb-0 z-10 relative">
            <Navbar user={userStatus} />
          </div>
          <div className="max-w-[1368px] mx-auto relative z-10 my-10">
            <FindEvents />
          </div>
          <div>
            <FeaturedEvents entriesPerPage={entriesPerPage} />
          </div>
        </div>
      </div>

      {/* Dropdown + Pagination Controls */}
      <div className="max-w-[1368px] mx-auto mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Total and Range Info */}
        <div className="text-sm text-gray-700">
          Showing from {from} to {to} out of {totalRecords}
        </div>

        {/* Right: Dropdown + Pagination */}
        <div className="flex items-center gap-4 justify-end">
          {/* Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="entriesPerPage" className="text-sm text-gray-700">
              Show
            </label>
            <select
              id="entriesPerPage"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to page 1 when page size changes
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            >
              {[5, 10, 25, 50, 100].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              {[1, 2, 3].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev * entriesPerPage < totalRecords ? prev + 1 : prev
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default EventsDetails;
