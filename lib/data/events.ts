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
    id: "girls-women-championship-2026",
    title: "Girls & Women Championship",
    date: "Saturday, 18th July 2026",
    time: "10:00 AM Onwards",
    location: "Amritsar Chess Club, 12 Race Course Road, Amritsar",
    entryFee: 400,
    brochureUrl: "/brochure.pdf", 
    description: "Categories: Under-11 Girls (10:00 AM - 2:00 PM), Under-17 Girls (10:00 AM - 2:00 PM), and Open Women (4:00 PM - 7:00 PM). Rapid 15+10 seconds format. 5 Rounds Swiss System. Total Cash Prize Pool: ₹9,000. Entry fee: ₹400 for 1 event, ₹700 for 2 events, ₹1,000 for 3 events.",
    status: "upcoming"
  },
  {
    id: "boys-championship-2026",
    title: "Boys Championship",
    date: "Sunday, 19th July 2026",
    time: "10:00 AM Onwards",
    location: "Amritsar Chess Club, 12 Race Course Road, Amritsar",
    entryFee: 400,
    brochureUrl: "/brochure.pdf",
    description: "Categories: Under-11 Boys (10:00 AM - 2:00 PM) and Under-17 Boys (3:00 PM - 7:00 PM). Rapid 15+10 seconds format. 5 Rounds Swiss System. Total Cash Prize Pool: ₹6,000. Entry fee: ₹400 for 1 event, ₹700 for 2 events, ₹1,000 for 3 events.",
    status: "upcoming"
  },
  {
    id: "open-championship-2026",
    title: "Open Championship",
    date: "Monday, 20th July 2026",
    time: "4:00 PM - 7:00 PM",
    location: "Amritsar Chess Club, 12 Race Course Road, Amritsar",
    entryFee: 400,
    brochureUrl: "/brochure.pdf",
    description: "Play. Compete. Win. Rapid 15+10 seconds format. 5 Rounds Swiss System. Total Cash Prize Pool: ₹5,000. Entry fee: ₹400 for 1 event, ₹700 for 2 events, ₹1,000 for 3 events.",
    status: "upcoming"
  }
];

export function getEventById(id: string): ChessEvent | undefined {
  return eventsData.find((event) => event.id === id);
}
