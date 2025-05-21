import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tootltip";
interface FormattedNumberProps {
    value: number;
}

export function FormattedNumber({ value }: FormattedNumberProps) {
    const abs = Math.abs(value);
    if(abs==0){
        return <>0.00</>;
    }
    if(abs>= 1e4){
        return <>{value.toFixed(2)}</>;
    }
    if (abs > 10) {
        return <>{value.toFixed(5)}</>;
    }

    if (abs >= 1e-5) {
        const formatted = value
            .toFixed(5)
            .replace(/\.?0+$/, "");
        return <>{formatted}</>;
    }

    const full = value
        .toFixed(17)
        .replace(/0+$/, "");
    const sign = value < 0 ? "-" : "";
    const [intPart, decPart = ""] = full.replace("-", "").split(".");
    const zeroCount = (decPart.match(/^0*/) ?? [""])[0].length;
    const rest = decPart.slice(zeroCount);
    const final = rest.slice(4, 8);

    return (
        <TooltipProvider >
            <Tooltip>
                <TooltipTrigger>
                    <span className="inline-block">
                    {sign}
                    {intPart}.00
                    <sub className="align-sub">{zeroCount-2}</sub>
                    {final}
                </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{Number(value.toFixed(17))==0?0:value.toFixed(17).replace(/0+$/, "")}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider >

    );
}