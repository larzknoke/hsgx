import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list"; // Import the list plugin
import deLocale from "@fullcalendar/core/locales/de"; // Import German locale
import { Button } from "@/components/ui/button"; // Import shadcn Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonGroup } from "./ui/button-group";
import { Separator } from "./ui/separator";

export default function BillCalendar({ trainingSlots, setFinalEvents }) {
  const currentYear = new Date().getFullYear();

  // Define the quarters with their start and end dates
  const quarters = [
    {
      label: "Quartal 1",
      start: `${currentYear}-01-01`,
      end: `${currentYear}-03-31`,
    },
    {
      label: "Quartal 2",
      start: `${currentYear}-04-01`,
      end: `${currentYear}-06-30`,
    },
    {
      label: "Quartal 3",
      start: `${currentYear}-07-01`,
      end: `${currentYear}-09-30`,
    },
    {
      label: "Quartal 4",
      start: `${currentYear}-10-01`,
      end: `${currentYear}-12-31`,
    },
  ];

  // State to track the selected quarter
  const [selectedQuarter, setSelectedQuarter] = useState(quarters[0]);

  // State to store the dynamically calculated events
  const [events, setEvents] = useState([]);

  // State to store grouped events and total cost
  const [groupedEvents, setGroupedEvents] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  // Define colors for each location
  const locationColors = {
    bbs: "#ef4444",
    liebig: "#facc15",
    billerbeck: "#34d399",
  };

  // Helper to add one day to the end date
  const addOneDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  // Helper function to get all dates for a specific weekday in a date range
  const getDatesForWeekday = (weekdayNumber, startDate, endDate) => {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Convert weekdayNumber to an integer
    const weekday = parseInt(weekdayNumber, 10);

    // Find the first occurrence of the weekday in the range
    while (start.getDay() !== weekday) {
      start.setDate(start.getDate() + 1);
    }

    // Add all occurrences of the weekday in the range
    while (
      start.getFullYear() < end.getFullYear() || // Check year
      (start.getFullYear() === end.getFullYear() &&
        start.getMonth() <= end.getMonth()) // Check month
    ) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 7); // Move to the next week
    }

    return dates;
  };

  // Recalculate events whenever the selectedQuarter or trainingSlots change
  useEffect(() => {
    const newEvents = trainingSlots.flatMap((slot) => {
      const dates = getDatesForWeekday(
        slot.weekday,
        selectedQuarter.start,
        selectedQuarter.end
      );
      return dates.map((date) => ({
        id: crypto.randomUUID(), // Unique ID for each event
        location: `${slot.location.toUpperCase()}`,
        start: `${date.toISOString().split("T")[0]}T${slot.start}`, // Combine date with start time
        end: `${date.toISOString().split("T")[0]}T${slot.end}`, // Combine date with end time
        backgroundColor:
          locationColors[slot.location.toLowerCase()] || "#888888", // Default color if location not found
        borderColor: locationColors[slot.location.toLowerCase()] || "#888888", // Match border color
      }));
    });
    console.log("newEvents:", newEvents);

    setEvents(newEvents);
    setFinalEvents(newEvents); // Send the updated events to the parent component
  }, [selectedQuarter, trainingSlots, setFinalEvents]);

  // Recalculate grouped events and total cost whenever events change
  useEffect(() => {
    const grouped = events.reduce((acc, event) => {
      if (!acc[event.title]) {
        acc[event.title] = { count: 0, totalCost: 0 };
      }

      // Calculate the duration of the event in hours
      const start = new Date(event.start);
      const end = new Date(event.end);
      const durationInHours = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours

      acc[event.title].count += 1;
      acc[event.title].totalCost += durationInHours * 5; // 5€ per hour
      return acc;
    }, {});

    const total = Object.values(grouped).reduce(
      (sum, group) => sum + group.totalCost,
      0
    );

    setGroupedEvents(grouped);
    setTotalCost(total);
  }, [events]); // Dependencies: recalculate when events change

  // Handle event deletion
  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Möchten Sie das Event "${clickInfo.event.title}" wirklich löschen?`
      )
    ) {
      // Remove the event from the state
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className={"flex justify-between"}>
            Trainingsplan
            <ButtonGroup>
              {quarters.map((quarter) => (
                <Button
                  size={"sm"}
                  key={quarter.label}
                  variant={
                    selectedQuarter.label === quarter.label
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setSelectedQuarter(quarter)}
                  className="capitalize"
                >
                  {quarter.label}
                </Button>
              ))}
            </ButtonGroup>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              {Object.entries(groupedEvents).map(([location, data]) => (
                <div key={location} className="flex justify-between">
                  <span>
                    {data.count}x {location}
                  </span>
                  <span>{data.totalCost}€</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Gesamtkosten:</span>
                <span>{totalCost}€</span>
              </div>
            </div>
            <Separator className={"my-8"} />

            <FullCalendar
              plugins={[dayGridPlugin, listPlugin]} // Include the list plugin
              initialView="dayGridMonth"
              locale={deLocale} // Set the locale to German
              validRange={{
                start: selectedQuarter.start,
                end: addOneDay(selectedQuarter.end),
              }}
              events={events} // Use the dynamically generated events
              eventClick={handleEventClick} // Handle event click
              height={"auto"}
              headerToolbar={{
                left: "prev,next today", // Navigation buttons
                center: "title", // Calendar title
                right: "dayGridMonth,listMonth", // Add listMonth view
              }}
            />
            <small>Mit Klick auf das Event kann dieses gelöscht werden</small>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
