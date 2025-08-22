import SingleImageUploader from "@/components/comp-544"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"



interface DivisionFormData {
    name: string;
    description: string;
}

export function AddDivisionModel() {
    const [image, setImage] = useState<File | null>(null);
    const [addDivsiion] = useAddDivisionMutation();
    const [open, setOpen] = useState(false);

    const form = useForm<DivisionFormData>({
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit = async (data: DivisionFormData) => {
        const toastId = toast.loading("Uploading..");
        const formData = new FormData();

        formData.append("data", JSON.stringify(data));
        if (image) {
            formData.append("file", image);
        }
        try {
            const res = await addDivsiion(formData).unwrap();
            if (res.success) {
                toast.success("Division Added", { id: toastId });
            }
            setOpen(false);
        } catch (err) {
            console.log(err);
        }
    } 

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Division</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Division</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-5" id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tour Type Name"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <SingleImageUploader onChange={setImage} />
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={!image} form="add-tour-type" type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
