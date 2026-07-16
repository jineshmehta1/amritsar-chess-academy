export interface ChessEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  entryFee: number;
  brochureUrl: string;
  description: string;
  status: "upcoming" | "ongoing" | "completed";
}

export const eventsData: ChessEvent[] = [
  {
    id: "acc-tournament-u11-2026",
    title: "Amritsar Chess Club Tournament - U-11",
    date: "Sunday, 19th July 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Amritsar Chess Club, 12 Race Course Road, Amritsar",
    entryFee: 200,
    brochureUrl: "/brochure.pdf",
    description: "Category: U-11. Time Control: 15+10 seconds. Prizes: 1st to 3rd Trophies for each category and medals to all players. Contacts: Shubham Trikha (9592004076), Yogesh Sharma (9465477290), Kunal Sharma (9988320542). Payment: GPay to 9592004076.",
    status: "upcoming"
  },
  {
    id: "acc-tournament-u17-2026",
    title: "Amritsar Chess Club Tournament - Under 17",
    date: "Sunday, 19th July 2026",
    time: "3:00 PM - 7:00 PM",
    location: "Amritsar Chess Club, 12 Race Course Road, Amritsar",
    entryFee: 200,
    brochureUrl: "/brochure.pdf",
    description: "Category: Under 17. Time Control: 15+10 seconds. Prizes: 1st to 3rd Trophies for each category and medals to all players. Contacts: Shubham Trikha (9592004076), Yogesh Sharma (9465477290), Kunal Sharma (9988320542). Payment: GPay to 9592004076.",
    status: "upcoming"
  }
];

export function getEventById(id: string): ChessEvent | undefined {
  return eventsData.find((event) => event.id === id);
}
