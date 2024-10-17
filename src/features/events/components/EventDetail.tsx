"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { EventType } from "@/features/events/types";
import { eventsService } from "@/services/events";
import { useFormatPrice } from "@/lib/utils";
import EventInfo from "./EventInfo";
import { Button } from "@/components/ui/button";
import BreadCrumbLink from "@/components/common/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { TitleBar } from "@/components/ui/title";

const EventDetail: FC<{ params: { id: string } }> = ({ params }) => {
  const t = useTranslations("EventsPage");
  const [event, setEvent] = useState<EventType>();

  useEffect(() => {
    const handleGetEvent = async () => {
      const res = await eventsService.getEvents(params.id);
      setEvent(res.data[0]);
    };

    handleGetEvent();
  }, [params.id]);

  return (
    <div className="container py-24 mx-auto space-y-6">
      <div className="grid items-center grid-cols-1 gap-2 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="w-full rounded-lg">
            {event ? (
              <Image
                src="/assets/images/events/pdd2024.webp"
                alt="Banner"
                width={1000}
                height={500}
                priority
                className="rounded-lg"
              />
            ) : (
              <Skeleton className="w-full h-24 rounded-lg sm:h-96" />
            )}
          </div>
          <BreadCrumbLink />
          <div className="space-y-6">
            <h1 className="text-xl font-bold sm:text-3xl md:mt-8">{event?.title}</h1>
            {event ? (
              <EventInfo event={event} className="lg:hidden" />
            ) : (
              <Skeleton className="w-full h-10 rounded-lg" />
            )}
            <div className="space-y-4">
              <TitleBar>
                <h2 className="font-semibold sm:text-xl">{t("EventDetail.desc-title")}</h2>
              </TitleBar>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{event?.description}</p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex items-center self-start justify-between w-full gap-4 rounded-lg bg-white dark:bg-slate-950 md:bg-transparent lg:flex-col lg:justify-start lg:sticky lg:top-24 lg:px-4">
          <div className="hidden w-full p-4 space-y-6 border rounded-lg lg:block border-slate-400 dark:border-slate-600">
            {event ? <EventInfo event={event} /> : <Skeleton className="w-full h-4 rounded-lg" />}
          </div>
          <div className="flex flex-col w-full gap-4 px-6 py-4 border-t rounded-lg sm:border border-slate-400 dark:border-slate-600">
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold text-xs sm:text-sm dark:text-slate-200">
                {t("EventDetail.price-title")}
              </span>
              <p className="text-sm font-bold dark:text-slate-200">{useFormatPrice(1000)}</p>
            </div>
            <Button className="w-full font-bold dark:bg-slate-200">{t("EventDetail.register-button")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
