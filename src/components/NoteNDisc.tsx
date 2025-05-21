import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Info } from "lucide-react"

export default function NoteNDisc() {
    return (
        <Accordion type="single" collapsible className="w-full rounded-[8px] bg-accord px-3 mt-6 border-2 border-[#0052FE]">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-[#0052FE]" />
                        <p className="font-semibold">Important Notes & Disclaimers</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <ul  className="list-disc pl-5">
                        <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
                        <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
                        <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
                        <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
                        <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
                    </ul>

                </AccordionContent>
            </AccordionItem>
        </Accordion>

    )
}