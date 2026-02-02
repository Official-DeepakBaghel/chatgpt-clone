"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function DiscoverCarousel() {
    const items = [
        {
            id: 1,
            text: "Turn my apartment into a storybook",
            image: "https://persistent.oaistatic.com/images-app/camcorder.webp"
        },
        {
            id: 2,
            text: "Reimagine my pet as a human",
            image: "https://persistent.oaistatic.com/images-app/neon-fantasy.webp"
        },
        {
            id: 3,
            text: "What does my future partner look like?",
            image: "https://persistent.oaistatic.com/images-app/norman-rockwell.webp"
        },
        {
            id: 4,
            text: "Give them a bowl cut",
            image: "https://persistent.oaistatic.com/images-app/iconic.webp"
        },
        {
            id: 5,
            text: "Me as an emperor",
            image: "https://persistent.oaistatic.com/images-app/post-rain-sunset.webp"
        },
        {
            id: 6,
            text: "Redecorate my room",
            image: "https://persistent.oaistatic.com/images-app/flower-petals.webp"
        },
        {
            id: 7,
            text: "What would I look like?",
            image: "https://persistent.oaistatic.com/images-app/gold.webp"
        },
        {
            id: 8,
            text: "Me as The Girl with a Pearl Earring",
            image: "https://persistent.oaistatic.com/images-app/crayon_2.webp"
        },
        {
            id: 9,
            text: "Create a professional headshot",
            image: "https://persistent.oaistatic.com/images-app/paparazzi.webp"
        },
        {
            id: 10,
            text: "Transform into a cartoon",
            image: "https://persistent.oaistatic.com/images-app/department-photoshoot.webp"
        },
        {
            id: 11,
            text: "Me in a vintage photo",
            image: "https://persistent.oaistatic.com/images-app/camcorder.webp"
        },
        {
            id: 12,
            text: "Futuristic portrait",
            image: "https://persistent.oaistatic.com/images-app/neon-fantasy.webp"
        },
    ]

    // Group items into columns of 3 rows each
    const itemsPerColumn = 3
    const columns = []
    for (let i = 0; i < items.length; i += itemsPerColumn) {
        columns.push(items.slice(i, i + itemsPerColumn))
    }

    return (
        <Carousel opts={{ align: "start" }} className="w-full mt-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-white text-[17px] font-normal">
                    Discover something new
                </h1>

                <div className="flex items-center gap-2">
                    <CarouselPrevious className="static translate-y-0 bg-[#2a2a2a] border-none hover:bg-[#3a3a3a] text-white" />
                    <CarouselNext className="static translate-y-0 bg-[#2a2a2a] border-none hover:bg-[#3a3a3a] text-white" />
                </div>
            </div>

            <CarouselContent className="m-0 -ml-4">
                {columns.map((column, columnIndex) => (
                    <CarouselItem key={columnIndex} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="flex flex-col gap-2">
                            {column.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-transparent hover:bg-[#1a1a1a] rounded-lg p-3 cursor-pointer transition-colors flex items-center gap-3"
                                >
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.text}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-white text-[15px] font-normal leading-tight">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}