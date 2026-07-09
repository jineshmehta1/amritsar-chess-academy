import Link from "next/link";
import Image from "next/image";
import { shopProducts } from "@/lib/data/shop";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShoppingBag } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#12123D]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-orange-500/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-blue-500/20 to-transparent blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 mb-6 md:mb-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <ShoppingBag className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/90">
              Official Equipment
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6">
            Amritsar Chess Club <span className="text-[#FF6B00]">Shop.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-slate-300 font-medium leading-relaxed">
            Gear up like a Grandmaster. From premium tournament boards to official FIDE approved clocks, we provide the best tools for your chess journey.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {shopProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="relative w-full h-64 bg-white flex items-center justify-center p-6">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-between items-start px-2">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg text-[#12123D] font-bold tracking-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">{product.category}</p>
                  </div>
                  <p className="text-lg font-black text-[#FF6B00] bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full whitespace-nowrap">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
