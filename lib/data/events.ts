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
    id: "amritsar-open-2026",
    title: "Amritsar Junior Open 2026",
    date: "August 15, 2026 - August 16, 2026",
    time: "09:00 AM - 05:00 PM",
    location: "Amritsar Chess Club Academy, Ranjit Avenue",
    entryFee: 500,
    brochureUrl: "/brochure.pdf", // User needs to place a brochure.pdf in the public folder
    description: "The biggest junior open tournament in Amritsar. Rated players and unrated players welcome. Exciting cash prizes and trophies to be won!",
    status: "upcoming"
  },
  {
    id: "weekend-blitz-bash",
    title: "Weekend Blitz Bash",
    date: "July 25, 2026",
    time: "10:00 AM - 02:00 PM",
    location: "Amritsar Chess Club Academy, Ranjit Avenue",
    entryFee: 300,
    brochureUrl: "/brochure.pdf",
    description: "A fast-paced 3+2 blitz tournament to sharpen your instincts. Open to all age groups.",
    status: "upcoming"
  }
];

export function getEventById(id: string): ChessEvent | undefined {
  return eventsData.find((event) => event.id === id);
}
