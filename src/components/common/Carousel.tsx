// import { Card, CardContent } from "@/components/shadcn-ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn-ui/carousel";
import AutoPlay from "embla-carousel-autoplay";

export function CarouselComponent() {
  return (
    <Carousel className="w-full sm:w-1/2" plugins={[AutoPlay({ delay: 5000 })]}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="backdrop-blur-md bg-white/30 text-black rounded-xl p-4 w-full shadow-sm  ">
              <h3 className="font-semibold text-sm mb-2">
                Get your right job and right place apply now
              </h3>
              <p className="text-xs mb-2">
                Be among the first founders to experience the easiest way to
                start run a business.
              </p>
              <div className="flex items-center space-x-[-10px]">
                <img
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold border-2 border-white">
                  +2
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
