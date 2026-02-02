import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export function AlertDialogDemo({ open, setOpen }) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogOverlay className="bg-black/10 backdrop-blur-[1px]" />

            <AlertDialogContent className="bg-[#212121] border border-[#313131] w-[430px] h-[160px] p-[calc(var(--spacing)*4)]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Start group chat from this conversation</AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                        Only this conversation will be shared. Your personal ChatGPT memory is always private.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex items-center justify-between " style={{ justifyContent: "space-between" }}>
                    <div>
                        <Link target="_blank" href="https://help.openai.com/en/articles/12703475-group-chats-in-chatgpt" className="text-white font-semibold text-xs cursor-pointer">Learn more</Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <AlertDialogCancel className="rounded-full text-white bg-[#313131] border border-[#404040] cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="rounded-full bg-white text-black hover:bg-white hover:text-black bg-white cursor-no-drop">Start group chat</AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
