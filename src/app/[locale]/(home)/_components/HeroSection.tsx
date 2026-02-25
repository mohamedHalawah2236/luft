'use client'
import MediaHero from "@/components/shared/CustomVideoPlay"
import CustomFilter from "./CustomFilter"
import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/shared/Icon";


function HeroSection() {
    const { locale } = useParams();
    const cities = [
        "Cairo",
        "Giza"
    ]
    return (
        <div className="flex items-center justify-center flex-col lg:flex-row-reverse gap-4 lg:gap-6 pb-20 md:pb-[120px] ">
            <div className="flex flex-col gap-4">
                <MediaHero src="https://filemanager-lucastay-a4gjbpdqekd0chfg.westeurope-01.azurewebsites.net//Uploads/luft/236de9c5-af61-4f9d-9ba3-019a1e0a1271.mp4" />
                {/* <MediaHero src="images/auth/video.mp4" /> */}
                <div className="flex flex-col">
                    <h3 className="text-neutral-900 text-[32px] md:text-5xl lg:text-6xl">Special stays, thoughtful care</h3>
                    <p className="text-neutral-400 md:text-lg">Book unique homes across Egypt and enjoy optional concierge services that make your stay smoother, easier, and more personal.</p>
                </div>
                <div className="pt-6 md:pt-[32px] lg:pt-[48px]  ">
                    <Tabs defaultValue="overview" className="w-[400px]  mb-4 md:mb-6 ">
                        <TabsList className="bg-transparent">
                            <TabsTrigger value="overview" className="px-6 py-2 rounded-[100px] border-neutral-50"><Icon name="home" /> <span className="ml-1">Stays</span></TabsTrigger>
                            <TabsTrigger value="analytics" className="px-6 py-2 rounded-[100px] border-neutral-50"><Icon name='handBell' /> <span className="ml-1">Services</span></TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <CustomFilter locale={locale as 'en' | 'it'} cities={cities} />
                </div>
            </div>
        </div>
    )
}

export default HeroSection