import { cn } from "@/lib/utils"
export function Typography({ className,
...props
}: React.HTMLAttributes<HTMLDivElement>) {
return (
<div
className={cn( "typography", className )} 
{...props}
/>
)
}