import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RegistrationDetails = ({ open, setOpen }) => {
  const [nameValue, setNameValue] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-[800px] p-12">
        <DialogDescription>
          <div className="text-center mb-[56px]">
            <h2 className="text-[40px] font-bold text-[#12141D] mb-3 leading-[52px]">
              Regitration Details
            </h2>
            <p className="font-normal text-[18px] text-[#736D78]">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className="space-y-6 mt-12">
            <div>
              <label className="text-lg mb-1 block text-left">Name</label>
              <Input
                placeholder="Enter Your Name"
                className="h-12"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg mb-1 block text-left">
                Email Address
              </label>
              <Input
                placeholder="Enter Your Email Address"
                className="h-12"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            <Button className="px-10 py-6 rounded-xl font-medium w-full text-[#f7f8ff] text-lg bg-gradient-to-r from-[rgba(105,65,198,1)] to-[rgba(14,165,233,1)] hover:from-[rgba(95,55,188,1)] hover:to-[rgba(4,155,223,1)]">
              Subscribe
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDetails;
