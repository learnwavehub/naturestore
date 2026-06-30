
import BannerSlider from "@/components/BannerSlider";
import dynamicImport from "next/dynamic";
import Link from "next/link";
// Lazy-load components for suspense fallback
const Collections = dynamicImport(() => import("@/components/Collections"), {
  loading: () => <CollectionsSkeleton />,
});
import Image from "next/image";

// Import skeletons
import CollectionsSkeleton from "@/components/skeletons/CollectionsSkeleton";



export default function Home() {
 return (
    <>
      {/* Push down to avoid navbar overlap */}
      <div className=" w-full"> {/* adjust 64px to your navbar height */}
        
       <BannerSlider />

        {/* Content */}
        <Collections />
                {/*<ProductList />*/}
             <div className="flex justify-center my-8">
  <Link href="/therapies" className="relative group inline-block">
    <Image
      src="/therapy.png"
      alt="therapy"
      width={1200}
      height={400}
      className="rounded-2xl cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/30 rounded-2xl group-hover:bg-black/60 transition-colors duration-300" />

    {/* Learn More Button */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="px-6 py-3 bg-white text-green-700 font-semibold rounded-full shadow-lg transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
        Learn More
      </span>
    </div>
  </Link>
</div>
      </div>
    </>
  );
}
