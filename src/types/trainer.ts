export type Trainer = {
  id: number;
  name: string;
  image: string;
  image2?: string;
  type: "trainer" | "academy";
  location: string;
  services: string[];
  ageGroups: string[];
  batch: string[];
  contacted: boolean;
  isNew?: boolean;
  interests: number;

  // thêm field mới
  about?: string;
  price?: string;
  fullBio?: string;
  availableDays?: string[];
  certifications?: string[];
};
