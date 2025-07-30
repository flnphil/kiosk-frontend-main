import React from "react";
import {
  Calendar,
  Users,
  MapPin,
  CreditCard,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

const ConnectiveEvents = () => {
  const cards = [
    {
      icon: <Calendar color="#6941C6" />,
      description:
        "From conferences to concerts, find events that match your interests.",
      dark: false,
    },
    {
      icon: <Users color="#6941C6" />,
      description:
        "From conferences to concerts, find events that match your interests.",
      dark: false,
    },
    {
      icon: <MapPin color="#6941C6" />,
      description:
        "From conferences to concerts, find events that match your interests.",
      dark: false,
    },
    {
      icon: <CreditCard color="#6941C6" />,
      description:
        "From conferences to concerts, find events that match your interests.",
      dark: false,
    },
    {
      icon: <CreditCard color="#6941C6" />,
      description:
        "From conferences to concerts, find events that match your interests.",
      dark: false,
    },
    {
      icon: <MapPin color="#6941C6" />,
      description: "Register with confidence using our secure payment system.",
      dark: false,
    },
    {
      icon: <Users color="#6941C6" />,
      description:
        "From conferences to concerts, find events that match your interests.",
      dark: false,
    },
    {
      icon: <BookOpen color="#C1A5FF" />,
      title: "Read our documentation",
      dark: true,
    },
  ];

  return (
    <section className="relative w-full py-12 pt-24 pb-[242px] overflow-hidden bg-gradient-to-b from-white to-[#F5F6F7] mb-16">
      <div className="container mx-auto max-w-[1080px]">
        <h2 className="mb-16 font-bold text-4xl tracking-[-2px] text-[#12141d]">
          Why choose Connective Events
        </h2>
        <div className="relative">
          <div className="absolute w-[150px] h-[457px] top-[620px] left-[588px] rotate-[-20deg] blur-[162px] bg-gradient-to-r from-[#DEFF34] to-[#8CF97C]" />
          <div className="absolute w-[150px] h-[457px] top-[483px] left-[839px] rotate-[-20deg] blur-[162px] bg-gradient-to-r from-[#45F4BC] to-[#33DFDF]" />
          <div className="absolute w-[150px] h-[457px] top-[346px] left-[1091px] rotate-[-20deg] blur-[162px] bg-gradient-to-r from-[#34C8F4] to-[#34BCFF]" />
          <div className="absolute w-[150px] h-[457px] top-[209px] left-[1342px] rotate-[-20deg] blur-[162px] bg-[#34bcff]" />
          <div className="grid grid-cols-4 overflow-hidden relative z-10 rounded-xl border border-[#eef0f1 shadow-[0px_50px_60px_#0c19271a,0px_16px_20px_#0c19270f,0px_6px_8px_#0c19270d]">
            {cards.map((card, index) => (
              <Card
                key={index}
                className={`h-[250px] rounded-none border border-[#eef0f1] border-t-0 border-l-0 ${
                  card.dark ? "bg-[#0d1726] border-none" : "bg-white"
                }`}
              >
                <CardContent className="p-5 h-full flex flex-col">
                  {!card.dark ? (
                    <div className="flex w-12 h-12 items-center justify-center p-3 bg-[#7d39d01a] rounded-full">
                      {card.icon}
                    </div>
                  ) : (
                    card.icon
                  )}

                  {card.dark ? (
                    <div className="mt-2 font-medium text-white text-2xl tracking-[-0.96px] leading-7">
                      Read our
                      <br />
                      documentation
                    </div>
                  ) : (
                    <div className="text-[#736d78] text-sm mt-5">
                      {card.description}
                    </div>
                  )}
                  {card.dark && (
                    <div className="mt-auto flex items-center gap-1 cursor-pointer">
                      <span className="font-medium text-white text-sm">
                        Learn more
                      </span>
                      <ChevronRight color="#fff" className="w-4 h-4" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectiveEvents;
