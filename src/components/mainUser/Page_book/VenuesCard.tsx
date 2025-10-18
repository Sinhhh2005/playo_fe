// src/components/mainUser/VenuesCard.tsx
import React from "react";
import { Card, CardContent } from "../../ui/card";
import type { Venue } from "../../../types/book";
import { Link } from "react-router-dom";

interface VenuesCardProps {
  venue: Venue;
}

const fallbackImage = "https://via.placeholder.com/400x250?text=No+Image";

const VenuesCard: React.FC<VenuesCardProps> = ({ venue }) => {
  // Map backend → FE an toàn
  const mappedVenue = {
    id: venue.id,
    title: venue.title || "Unknown Venue",
    image: venue.image || fallbackImage,
    location: venue.location || "Unknown Location",
    distance: venue.distance || "",
    rating: venue.rating || 4.5,
    reviews: venue.reviews || 0,
    type: venue.type || "Sports",
    featured: venue.featured || false,
  };

  return (
    <Link to={`/experience-details/venue/${mappedVenue.id}`}>
      <Card className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-shadow">
        <div className="flex flex-col">
          {/* Image */}
          <div className="flex-shrink-0 overflow-hidden h-48">
            <img
              src={mappedVenue.image}
              alt={mappedVenue.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <CardContent className="p-4 flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                {mappedVenue.featured && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mb-2 inline-block">
                    Featured
                  </span>
                )}
                <h3 className="text-base font-semibold text-gray-800">
                  {mappedVenue.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {mappedVenue.location}
                  {mappedVenue.distance && ` (${mappedVenue.distance})`}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">{mappedVenue.rating}</span>
                </div>
                <span className="text-xs text-gray-500">
                  ({mappedVenue.reviews})
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-3">{mappedVenue.type}</p>

            <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg px-4 py-2 w-full cursor-pointer transition-colors">
              Bookable
            </button>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default VenuesCard;
