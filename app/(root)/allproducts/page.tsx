import dynamicImport from "next/dynamic";
const ProductList = dynamicImport(() => import("@/components/ProductList"), {
  loading: () => <ProductListSkeleton />,
});
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton";// Import skeletons
export default function page() {
  return (
    <div>
       <ProductList />
    </div>
  )
}
