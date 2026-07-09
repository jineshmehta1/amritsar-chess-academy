export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'board' | 'clock' | 'accessories';
}

export const shopProducts: ShopProduct[] = [
  {
    id: "standard-vinyl-board",
    name: "Standard Vinyl Tournament Chess Board Set",
    description: "A durable, roll-up vinyl chess board with 2.25-inch squares. Comes with a full set of weighted plastic Staunton pieces (including extra queens). Ideal for clubs, schools, and standard tournament play.",
    price: 1500,
    imageUrl: "/images/shop/vinyl_board.png",
    category: "board"
  },
  {
    id: "premium-wooden-board",
    name: "Premium Wooden Tournament Chess Board Set",
    description: "An elegant, high-quality wooden chess board made from premium rosewood and maple. Features standard tournament square size and comes with triple-weighted, felt-bottomed wooden Staunton pieces. Perfect for professional matches and home display.",
    price: 4500,
    imageUrl: "/images/shop/wooden_board.png",
    category: "board"
  },
  {
    id: "dgt-2500-clock",
    name: "DGT 2500 Official FIDE Chess Clock",
    description: "The new standard in official FIDE chess clocks. Features a large, clear display, improved contrast, and 25 pre-set timing systems including all popular time controls for blitz, rapid, and classical chess.",
    price: 3800,
    imageUrl: "/images/shop/dgt_2500.png",
    category: "clock"
  },
  {
    id: "dgt-2010-clock",
    name: "DGT 2010 Official FIDE Chess Clock",
    description: "A highly reliable and widely used digital chess clock. Approved by FIDE, it supports various timing methods including increment, delay, and Byo-yomi. Known for its durability and ease of use.",
    price: 3500,
    imageUrl: "/images/shop/dgt_2010.png",
    category: "clock"
  }
];

export function getProductById(id: string): ShopProduct | undefined {
  return shopProducts.find(product => product.id === id);
}
