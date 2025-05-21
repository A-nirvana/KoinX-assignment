import AllHoldings from "@/components/Holdings/AllHodlings";
import Capital from "@/components/home/Capital";
import Harvest from "@/components/home/Harvest";
import Header from "@/components/home/Header";


export default function Home() {
  return (
    <main className="flex flex-col py-6 px-3 md:px-10 lg:px-20">
      <Header />
      <div className="flex items-center justify-between w-full gap-x-6 mt-6 flex-col lg:flex-row gap-y-6">
        <Capital />
        <Harvest/>
      </div>
      <AllHoldings/>
    </main>
  );
}
