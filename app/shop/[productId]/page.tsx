import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById, shopProducts } from "@/lib/data/shop";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// This allows Next.js to statically generate these routes at build time if desired.
export function generateStaticParams() {
  return shopProducts.map((product) => ({
    productId: product.id,
  }));
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  const product = getProductById(params.productId);

  if (!product) {
    notFound();
  }

  // Pre-fill the WhatsApp message
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919592004076"; // Default placeholder
  const message = `Hi, I'm interested in buying the "${product.name}" for ₹${product.price}. Please provide more details.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/shop" 
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-orange-500 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>

          <div className="bg-slate-50 rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            
            {/* Image Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-white rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none border-b md:border-b-0 md:border-r border-slate-100">
              <div className="relative w-full aspect-square max-w-md">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain object-center drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-[10px] font-black tracking-widest text-[#FF6B00] uppercase bg-orange-50 rounded-full border border-orange-100">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12123D] tracking-tight mb-4">
                {product.name}
              </h1>
              
              <p className="text-3xl font-black text-[#FF6B00] mb-8">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              
              <div className="prose prose-lg text-slate-500 mb-10 font-medium">
                <p className="leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-200">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-black text-white bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none uppercase tracking-widest"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Buy via WhatsApp
                </a>
                <p className="mt-4 text-xs font-medium text-slate-400 text-center sm:text-left">
                  Clicking this button will open a WhatsApp chat with our sales team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
