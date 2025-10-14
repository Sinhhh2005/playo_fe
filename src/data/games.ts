export type GameStatus = "OPEN" | "BOOKED" | "CLOSED" | "LIMITED";

export interface Game {
  id: number;
  type: string;
  host: { name: string; karma: number; avatar: string };
  slots?: number;
  going?: { current: number; total: number };
  date: string;
  time: string;
  venue: string;
  distance: string;
  level: string;
  price?: string; 
  status: GameStatus;
}

export const games: Game[] = [
  {
    id: 1,
    type: "Regular",
    host: {
      name: "Laksh Bhandary",
      karma: 23150,
      avatar: "https://playov2.gumlet.io/profiles/1757334648311-avatar6293064503641734389.png?q=30",
    },
    going: { current: 3, total: 6 },
    date: "Mon, 29 Sep 2025",
    time: "07:30 PM - 08:30 PM",
    venue: "Citi Nest Sports",
    distance: "2.4 Km",
    level: "Amateur - Professional",
    price: "INR 115",
    status: "BOOKED",
  },
  {
    id: 2,
    type: "Regular",
    host: {
      name: "Laksh Bhandary",
      karma: 23150,
      avatar: "https://playov2.gumlet.io/profiles/1726056045625-file_17260560360259103728235126575000.png?q=30",
    },
    going: { current: 3, total: 6 },
    date: "Mon, 29 Sep 2025",
    time: "07:30 PM - 08:30 PM",
    venue: "Play Zone",
    distance: "3.2 Km",
    level: "Amateur - Professional",
    price: "INR 120",
    status: "OPEN",
  },
  {
    id: 3,
    type: "Doubles • Regular",
    host: {
      name: "Abhinash",
      karma: 75,
      avatar: "https://playov2.gumlet.io/profiles/1757047598778-file_17570475951385741812437238752114.png?q=30",
    },
    going: { current: 1, total: 4 },
    date: "Mon, 29 Sep 2025",
    time: "07:30 PM - 08:30 PM",
    venue: "Acs Badminton Arena",
    distance: "3.7 Km",
    level: "Intermediate",
    price: "INR 100",
    status: "LIMITED",
  },
  {
    id: 4,
    type: "Regular",
    host: {
      name: "Rahul Sharma",
      karma: 100,
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    going: { current: 2, total: 4 },
    date: "Tue, 30 Sep 2025",
    time: "06:00 PM - 07:00 PM",
    venue: "Mega Sports Hub",
    distance: "4.5 Km",
    level: "Beginner",
    price: "INR 90",
    status: "OPEN",
  },
  {
    id: 5,
    type: "Singles • Regular",
    host: {
      name: "Ankit Verma",
      karma: 150,
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    going: { current: 1, total: 2 },
    date: "Tue, 30 Sep 2025",
    time: "08:00 PM - 09:00 PM",
    venue: "Arena Court",
    distance: "5 Km",
    level: "Intermediate",
    price: "INR 110",
    status: "LIMITED",
  },
  {
    id: 6,
    type: "Regular",
    host: {
      name: "Chandra Kiran",
      karma: 156,
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    going: { current: 3, total: 6 },
    date: "Wed, 01 Oct 2025",
    time: "09:30 PM - 10:30 PM",
    venue: "Basecamp by Push Sports",
    distance: "~1.41 Kms",
    level: "Amateur - Professional",
    status: "OPEN",
  },
  {
    id: 7,
    type: "Regular",
    host: {
      name: "Chandra Kiran",
      karma: 156,
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    going: { current: 3, total: 6 },
    date: "Wed, 01 Oct 2025",
    time: "09:30 PM - 10:30 PM",
    venue: "Basecamp by Push Sports",
    distance: "~1.41 Kms",
    level: "Amateur - Professional",
    status: "OPEN",
  },
  {
    id: 8,
    type: "Regular",
    host: {
      name: "Chandra Kiran",
      karma: 156,
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    going: { current: 3, total: 6 },
    date: "Wed, 01 Oct 2025",
    time: "09:30 PM - 10:30 PM",
    venue: "Basecamp by Push Sports",
    distance: "~1.41 Kms",
    level: "Amateur - Professional",
    status: "OPEN",
  },
];
