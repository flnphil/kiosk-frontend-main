import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import ViewDetailsDialog from "../ViewDetailsDialog/ViewDetailsDialog";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const FeaturedEvents = ({ heading, events, isViewAllButton = true }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    const fetchDiscountPercent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;
        const res = await axios.get(
          `http://localhost:5000/api/users/${userId}/redeem`
        );
        if (res.data.success) {
          setDiscountPercent(res.data.discount_percent ?? 0);
        }
      } catch (e) {
        setDiscountPercent(0);
      }
    };
    fetchDiscountPercent();
  }, []);

  const getDiscountedPrice = (price) => {
    if (!discountPercent || discountPercent === 0) return price;
    return (price - (price * discountPercent) / 100).toFixed(2);
  };

  return (
    <section className="w-full pb-12 px-12 md:px-16">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="font-['Epilogue',Helvetica] font-bold text-[#12141d] text-3xl md:text-4xl tracking-[-2.00px] leading-tight">
            {heading || "Featured Events"}
          </h2>
          <p className="font-['Poppins',Helvetica] font-normal text-[#736d78] text-base mt-2">
            Discover our top picks for you
          </p>
        </div>

        {isViewAllButton && (
          <Link to="/events-details">
            <Button
              variant="outline"
              className="rounded-full border-[#d7e1ea] bg-white text-[#3a3d42] text-sm font-['Poppins',Helvetica] font-normal"
            >
              View All
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events &&
          events.map((event) => {
            const eventMoment = moment(event.time);
            const formattedDate = eventMoment.format("ddd, MMM D, YYYY");

            const startTime = eventMoment.format("HH:mm");
            const endTime = eventMoment.clone().add(4, "hours").format("HH:mm");
            const formattedTime = `${startTime} - ${endTime}`;
            return (
              <Card
                key={event.event_id}
                className="rounded-[28px] border-[#7d39d033] shadow-[0px_1px_2px_#0000000d] overflow-hidden"
              >
                <div className="relative">
                  <div
                    className="h-60 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(http://localhost:5000${event.image_url})`,
                    }}
                  >
                    <Badge className="absolute top-4 left-4 bg-[#7d39d0] hover:bg-[#7d39d0] text-white font-['Poppins',Helvetica] font-normal text-xs px-[11px] py-[3px] rounded-full">
                      Featured
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col gap-4">
                  <h3 className="font-['Poppins',Helvetica] font-semibold text-[#262428] text-lg leading-7">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#736d78]" />
                    <span className="font-['Poppins',Helvetica] font-normal text-[#736d78] text-xs leading-5">
                      {formattedDate}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-[#736d78]" />
                      <span className="font-['Poppins',Helvetica] font-normal text-[#736d78] text-xs leading-5">
                        {formattedTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-[#736d78]" />
                      <span className="font-['Poppins',Helvetica] font-normal text-[#736d78] text-xs leading-5">
                        {event.location}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4 text-[#736d78]" />
                          <span className="font-['Poppins',Helvetica] font-normal text-[#736d78] text-xs leading-5">
                            {event.registered} / {event.capacity} registered
                          </span>
                        </div>
                        <span className="font-['Poppins',Helvetica] font-normal text-[#736d78] text-xs leading-5">
                          {event.capacity - event.registered} spots left
                        </span>
                      </div>

                      <div className="w-full bg-[#f5f4f6] h-1.5 rounded-full">
                        <div
                          className={`bg-orange-500 h-1.5 rounded-full`}
                          style={{
                            width: `${
                              (event.registered / event.capacity) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="
  flex flex-col sm:flex-row 
  sm:items-center sm:justify-between 
  w-full mt-2 gap-3 sm:gap-0
"
                  >
                    <div className="flex flex-col items-start sm:items-start gap-1">
                      {discountPercent > 0 ? (
                        <>
                          <span className="line-through text-[#b1afc5] font-normal text-base">
                            £{event.price}
                          </span>
                          <span className="text-[#10b981] font-bold text-lg">
                            £{getDiscountedPrice(event.price)}
                          </span>
                          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-semibold">
                            {discountPercent}% OFF
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-[#262428] text-lg">
                          £{event.price}
                        </span>
                      )}
                    </div>
                    <Button
                      className="h-10 px-10 py-4 rounded-full text-xs text-[#f7f8ff] [background:linear-gradient(90deg,rgba(105,65,198,1)_0%,rgba(14,165,233,1)_100%)] hover:opacity-90"
                      onClick={() => {
                        setSelectedEvent({
                          ...event,
                          discountedPrice: getDiscountedPrice(event.price),
                          discountPercent,
                        });
                        setOpenDialog(true);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
      <ViewDetailsDialog
        open={openDialog}
        setOpen={setOpenDialog}
        event={selectedEvent}
      />
    </section>
  );
};

export default FeaturedEvents;
