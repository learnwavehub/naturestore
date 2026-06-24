
import BannerSlider from "@/components/BannerSlider";
import dynamicImport from "next/dynamic";

// Lazy-load components for suspense fallback
const Collections = dynamicImport(() => import("@/components/Collections"), {
  loading: () => <CollectionsSkeleton />,
});
const ProductList = dynamicImport(() => import("@/components/ProductList"), {
  loading: () => <ProductListSkeleton />,
});

// Import skeletons
import CollectionsSkeleton from "@/components/skeletons/CollectionsSkeleton";
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton";// Import skeletons


export default function Home() {
 return (
    <>
      {/* Push down to avoid navbar overlap */}
      <div className=" w-full"> {/* adjust 64px to your navbar height */}
        
       <BannerSlider />

        {/* Content */}
        <Collections />
        {/*<ProductList />*/}
      </div>
    </>
  );
}
