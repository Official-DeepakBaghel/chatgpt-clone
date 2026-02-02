import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogCloseButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>

                <div className="text-white text-xs m-0 p-0">Share</div>
            </DialogTrigger>
            <DialogContent className=" bg-[#181818] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white">Share link</DialogTitle>
                    <DialogDescription className="text-white">
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input className="text-white"
                            id="link"
                            defaultValue="localhost:3000/c/chatid"
                            readOnly
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}