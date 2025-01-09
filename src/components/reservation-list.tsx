"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Filter {
  spaceType: string;
  date: string;
  timeFrom: string;
  timeUntil: string;
  numberOfPeople: string;
  location: string;
}

interface EventData {
  id: number;
  title: string;
  speaker: string;
  date: string;
  image: string;
  reserveUrl: string;
}

const initialEvents: EventData[] = [
  {
    id: 1,
    title: "Get Started with Prototyping",
    speaker: "Evans D",
    date: "Nov 17 2023",
    image: "/images/reservation-1.png",
    reserveUrl: "/reserve/1",
  },
  {
    id: 2,
    title: "Get Started with Prototyping",
    speaker: "Evans D",
    date: "Nov 17 2023",
    image: "/images/reservation-2.png",
    reserveUrl: "/reserve/2",
  },
  // Add more sample data here
];

const ReservationList: React.FC = () => {
  const [filters, setFilters] = useState<Filter>({
    spaceType: "Meeting Room",
    date: "",
    timeFrom: "",
    timeUntil: "",
    numberOfPeople: "2",
    location: "",
  });

  const [filteredEvents, setFilteredEvents] = useState(initialEvents);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    // Simple example filter logic
    setFilteredEvents(
      initialEvents.filter(
        (event) =>
          (!filters.date || event.date.includes(filters.date)) &&
          (!filters.location || filters.location === "Any") // Replace with endpoint logic
      )
    );
  };

  return (
    <div className="container p-6 mt-5 mb-24">
      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <select
          name="spaceType"
          value={filters.spaceType}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        >
          <option value="Meeting Room">Meeting Room</option>
          <option value="Conference Room">Conference Room</option>
        </select>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />
        <select
          name="timeFrom"
          value={filters.timeFrom}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        >
          <option value="9:00am">9:00am</option>
          <option value="10:00am">10:00am</option>
        </select>
        <select
          name="timeUntil"
          value={filters.timeUntil}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        >
          <option value="11:00am">11:00am</option>
          <option value="12:00pm">12:00pm</option>
        </select>
        <input
          type="number"
          name="numberOfPeople"
          value={filters.numberOfPeople}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          name="location"
          placeholder="Enter a city"
          value={filters.location}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={applyFilters}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      {/* Event List */}
      <div className="container lg:w-[1110px] grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg shadow-lg flex items-center p-4 "
            
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.speaker}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
            <Link
              href={event.reserveUrl}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Reserve Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;
