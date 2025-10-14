export type Event = {
  id: number;
  title: string;
  org: string;
  time: string;
  details: string;
  image: string;
  type: 'trek' | 'sports' | 'badminton' | 'swimming';
}

export type Venue = {
  id: number;
  title: string;
  location: string;
  distance: string;
  type: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  image: string;
  // ✅ Thêm mới các field
  sportsAvailable?: {
    name: string;
    icon: string; // icon dạng emoji hoặc URL đều được
  }[];

  amenities?: string[];

  aboutVenue?: string[];

  relatedVenues?: string[];

}

export type Deal = {
  id: number;
  title: string;
  org: string;
  time: string;
  details: string;
  image: string;
}

export type ActiveTab = "venues" | "events" | "deals";