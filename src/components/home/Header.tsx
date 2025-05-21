import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tootltip"
import NoteNDisc from "../NoteNDisc"


export default function Header() {
    return (
        <div className="w-full">
            <div className="flex gap-3 items-center">
                <p className={` font-semibold text-xl md:text-2xl`}>Tax Harvesting</p>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <span className="text-xs nd:text-sm text-[#0052FE] underline cursor-pointer">How it works?</span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-36 md:max-w-[20rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, voluptates enim soluta quas saepe recusandae temporibus necessitatibus doloribus, autem dolore, dolorum quo excepturi sint fugiat?</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <NoteNDisc />
        </div>
    )
}