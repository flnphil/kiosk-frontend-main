import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../../components/ui/dialog";
import moment from "moment";

const ViewDetailsDialog = ({ open, setOpen, event, isQrCode = true }) => {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      if (!event) return;

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/generate-qr`,
          {
            link: "http://192.168.18.14:3000/guest-registration/",
            event_id: event.event_id,
            event_name: event.title,
            date: moment(event.time).format("YYYY-MM-DD"),
            seat_left: (event.capacity - event.registered).toString(),
            location: event.location,
            price: event.price,
          }
        );

        if (response.data.success) {
          setQrCode(response.data.qr_base64);
        }
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQrCode();
  }, [event]);

  if (!event) return null;

  const eventMoment = moment(event.time);
  const startTime = eventMoment.format("HH:mm");
  const endTime = eventMoment.clone().add(4, "hours").format("HH:mm");
  const formattedTime = `${startTime} - ${endTime}`;
  const percentage = (event.registered / event.capacity) * 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[450px]">
        <DialogHeader>
          <DialogTitle className="mb-6 text-[#262428]">
            {event.title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <img
            src={`http://localhost:5000${event.image_url}`}
            alt="Event"
            width="100%"
            height={230}
            className="rounded-lg object-cover"
          />
          <div className="my-5">
            <h3 className="text-base text-[#3A3D42] font-bold">Details</h3>
            <p className="my-4 text-sm text-[#736D78]">{event.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-[#736d78]" />
                <span className="text-xs text-[#736d78] font-normal">
                  {formattedTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-[#736d78]" />
                <span className="text-xs text-[#736d78] font-normal">
                  {event.location}
                </span>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-[#736d78]" />
                    <span className="text-xs text-[#736d78] font-normal">
                      {event.registered} / {event.capacity} registered
                    </span>
                  </div>
                  <span className="text-xs text-[#736d78] font-normal">
                    {event.capacity - event.registered} spots left
                  </span>
                </div>
                <div className="w-full bg-[#f5f4f6] h-1.5 rounded-full">
                  <div
                    className="bg-orange-500 h-1.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          {isQrCode && (
            <div>
              <h3 className="text-base text-[#3A3D42] font-bold mb-4">
                Scan to Register
              </h3>
              <div className="flex justify-center">
                {qrCode ? (
                  <img alt="QR Code" src={qrCode} width={150} height={150} />
                ) : (
                  <p className="text-sm text-[#736D78]">
                    Generating QR code...
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsDialog;
