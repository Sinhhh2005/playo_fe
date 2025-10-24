export type Event = {
  id: number;
  title: string;
  org: string;
  time: string;
  details: string;
  image: string;
  type: 'trek' | 'sports' | 'badminton' | 'swimming';
}
export type Category = {
	id: number;
	name: string;
	district?: string;
	address?: string;
	pricePerHour?: number;
	imgUrl?: string | string[]; // Tên trùng backend
	description?: string;
	desShort?: string;
	sportId?: number;
	sport?: {
		id: number;
		name: string;
	};
	amenities?: string[] | string;
	createdAt?: string;
	updatedAt?: string;
};

export type Deal = {
  id: number;
  title: string;
  org: string;
  time: string;
  details: string;
  image: string;
}

export type ActiveTab = "venues" | "events" | "deals";