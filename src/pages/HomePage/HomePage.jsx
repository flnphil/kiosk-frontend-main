import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Nabbar";
import FindEvents from "../../components/FindEvents/FindEvents";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";
import Footer from "../../components/Footer/Footer";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Add at the top
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

const Home = () => {
  const [userStatus, setUserStatus] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const from = (currentPage - 1) * entriesPerPage + 1;
  const to = Math.min(currentPage * entriesPerPage, totalRecords);

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = {
          search: searchQuery,
          category_name: category,
          start_date: dateRange.start,
          end_date: dateRange.end,
          skip: (currentPage - 1) * entriesPerPage,
          limit: entriesPerPage,
        };

        // Remove empty filters
        Object.keys(params).forEach(
          (key) => (params[key] === "" || !params[key]) && delete params[key]
        );

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/events`,
          {
            params,
          }
        );

        setEvents(response.data.results);
        setTotalRecords(response.data.total);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [searchQuery, category, dateRange, currentPage, entriesPerPage]);

  const totalPages = Math.ceil(totalRecords / entriesPerPage);

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white overflow-hidden w-full relative">
          <div className="relative w-full">
            <div className="absolute w-[350px] h-[300px] top-[-30px] right-[-70px] bg-[#51c0ff7a] rounded-[200px] blur-[20px]" />
            <div className="absolute w-[350px] h-[250px] top-[-40px] right-[230px] bg-[#be87ff63] rounded-[200px] blur-[20px]" />
          </div>
          <div className="absolute w-[250px] h-[354px] top-[270px] right-[-30px] bg-[#00d2659c] rounded-[116px/177px] blur-[30px] opacity-40" />
          <div className="p-[30px] pb-0 z-10 relative">
            <Navbar user={userStatus} />
          </div>
          <div className="text-center mt-[187px] z-10 relative mb-[52px]">
            <h1 className="font-bold text-[#12141d] text-6xl tracking-[-2.00px] leading-[69px]">
              Discover Events that move you
            </h1>
          </div>
          <div className="max-w-[1368px] mx-auto relative z-10 mb-[172px]">
            <FindEvents
              onSearch={({ searchQuery, category, start, end }) => {
                setSearchQuery(searchQuery);
                setCategory(category);
                setDateRange({ start, end });
                setCurrentPage(1); // Reset to first page on new search
              }}
            />
          </div>
          <div>
            <FeaturedEvents isViewAllButton={false} events={events} />
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-36 h-36 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
          <p className="text-[46px] font-semibold text-[#3a3d42]">
            No events found!
          </p>
        </div>
      ) : (
        <div className="max-w-[1368px] mx-auto mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing from {from} to {to} out of {totalRecords}
          </div>

          <div className="flex items-center gap-4 justify-end">
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
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      }
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {getVisiblePages().map((page, idx) =>
                  page === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage((prev) => prev + 1);
                      }
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default Home;
