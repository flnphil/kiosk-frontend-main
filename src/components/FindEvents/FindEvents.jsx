import React, { useState, useRef, useEffect } from "react";
import { CalendarIcon, FilterIcon, SearchIcon, CirclePlus } from "lucide-react";
import { DateRange } from "react-date-range";
import moment from "moment";
import { capitalize } from "lodash";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import axios from "axios"; // Add this import at the top
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

const FindEvents = ({ onSearch }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const datePickerRef = useRef(null);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch({
        searchQuery: searchText,
        category: categoryValue,
        start: isDateSelected
          ? moment(range[0].startDate).format("YYYY-MM-DD")
          : "",
        end: isDateSelected
          ? moment(range[0].endDate).format("YYYY-MM-DD")
          : "",
      });
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchText, categoryValue, range, isDateSelected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/categories`
        );
        console.log("response: ", response);
        const categoryData = response.data.results;

        const formatted = categoryData.map((cat) => ({
          label: cat.name,
          value: cat.name, // ✅ keep original case (don't lowercase!)
        }));

        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const selectedDateRange = isDateSelected
    ? `${moment(range[0].startDate).format("MMM D")} - ${moment(
        range[0].endDate
      ).format("MMM D")}`
    : "Date";

  const handleClear = () => {
    setCategoryValue("");
    setIsDateSelected(false);
    setRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  console.log(selectedDateRange, "range");

  return (
    <Card className="w-full flex items-center gap-5 p-[25px] rounded-3xl border border-solid border-[#e6e3e8] bg-white shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] relative">
      <CardContent className="flex items-center gap-5 p-0 w-full">
        <div className="flex flex-col items-start gap-2.5 p-2.5 relative flex-1 grow bg-[#edf3f5] rounded-xl">
          <div className="flex items-center gap-3 relative self-stretch w-full">
            <SearchIcon className="w-6 h-6 text-[#3a3d42]" />
            <Input
              className="border-0 bg-transparent p-0 h-auto shadow-none font-normal text-[#3a3d42] text-sm tracking-[0] leading-4 focus-visible:ring-0"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <Popover
          open={isCategoryPopoverOpen}
          onOpenChange={setIsCategoryPopoverOpen}
        >
          <PopoverTrigger>
            <Button
              variant="outline"
              className="h-11 flex items-center justify-end gap-2.5 px-4 py-2 rounded-[48px] border border-solid border-[#d7e1ea] bg-transparent"
            >
              <FilterIcon className="w-4 h-4" />
              <span className="font-normal text-[#3a3d42] text-sm tracking-[0] leading-4">
                {categoryValue ? capitalize(categoryValue) : "Category"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[200px] space-y-3">
            {categories.map((category) => (
              <div
                className="cursor-pointer"
                key={category.value}
                onClick={() => {
                  setCategoryValue(category.value);
                  setIsCategoryPopoverOpen(false);
                }}
              >
                <p>{category.label}</p>
              </div>
            ))}
          </PopoverContent>
        </Popover>
        <div className="relative flex items-center" ref={datePickerRef}>
          <Button
            onClick={toggleDatePicker}
            variant="outline"
            className="h-11 flex items-center justify-end gap-2.5 px-4 py-2 rounded-[48px] border border-solid border-[#d7e1ea] bg-transparent whitespace-nowrap"
          >
            <CalendarIcon className="w-4 h-4" />
            <span className="font-normal text-[#3a3d42] text-sm tracking-[0] leading-4">
              {selectedDateRange}
            </span>
          </Button>
          {showDatePicker && (
            <div className="absolute z-50 mt-2 shadow-lg bg-white border rounded-xl">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setRange([item.selection]);
                  setIsDateSelected(true);
                }}
                moveRangeOnFirstSelection={false}
                ranges={range}
              />
            </div>
          )}
          {(selectedDateRange !== "Date" || categoryValue !== "") && (
            <Button
              variant="ghost"
              className="text-[#FF0000]"
              onClick={handleClear}
            >
              <CirclePlus />
              Clear
            </Button>
          )}
        </div>

        <Button
          // onClick={handleSearch}
          className="h-11 justify-center gap-2.5 px-10 py-4 rounded-[48px] [background:linear-gradient(90deg,rgba(105,65,198,1)_0%,rgba(14,165,233,1)_100%)]"
        >
          <span className="font-normal text-[#f7f8ff] text-sm text-center tracking-[0] leading-[normal]">
            Find Events
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FindEvents;
