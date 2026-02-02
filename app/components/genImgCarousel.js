"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function GenImgCarousel() {
    // We create a list of 10 "Smart" profile objects
    const items = [
        { id: 1, name: "Ava", url: "https://persistent.oaistatic.com/images-app/camcorder.webp" },
        { id: 2, name: "Ethan", url: "https://persistent.oaistatic.com/images-app/neon-fantasy.webp" },
        { id: 3, name: "Chloe", url: "https://persistent.oaistatic.com/images-app/norman-rockwell.webp" },
        { id: 4, name: "Leo", url: "https://persistent.oaistatic.com/images-app/iconic.webp" },
        { id: 5, name: "Sophia", url: "https://persistent.oaistatic.com/images-app/post-rain-sunset.webp" },
        { id: 6, name: "Noah", url: "https://persistent.oaistatic.com/images-app/flower-petals.webp" },
        { id: 7, name: "Mia", url: "https://persistent.oaistatic.com/images-app/gold.webp" },
        { id: 8, name: "Lucas", url: "https://persistent.oaistatic.com/images-app/crayon_2.webp" },
        { id: 9, name: "Zoe", url: "https://persistent.oaistatic.com/images-app/paparazzi.webp" },
        { id: 10, name: "Jack", url: "https://persistent.oaistatic.com/images-app/department-photoshoot.webp" },
    ]

    return (
        <Carousel opts={{ align: "start" }} className="w-full">
            <div className="flex items-center justify-between mt-8 p-2">
                <h1 className="text-white text-[17px] font-semibold">
                    Try a style on an image
                </h1>

                <div className="flex items-center gap-2">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                </div>
            </div>

            <CarouselContent className="m-0">
                {items.map((item) => (
                    <CarouselItem
                        key={item.id}
                        className="md:basis-1/2 lg:basis-1/5 m-0 p-0"
                    >
                        <Card className="m-2 p-0 bg-[#303030] border-none">
                            <CardContent className="aspect-[1/1] w-[100%] h-[170px] m-0 p-0 rounded-[12px] overflow-hidden">
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="w-[100%] h-[100%] object-cover"
                                />
                            </CardContent>
                        </Card>
                        <p className="text-gray-400 text-[14px] text-center mt-1">
                            {item.name}
                        </p>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}