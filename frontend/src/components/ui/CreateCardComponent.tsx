import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "./Dialog"
import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "./Label"

const CreateCardComponent: React.FC = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleCreate = () => {
        // Handle the creation logic here
        console.log({ title, description })
    } 
    

    return (
        <div className="border-2 border-indigo-500 border-dashed rounded-lg p-6 flex items-center justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Create New Workspace</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Workspace</DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new roadmap/workspace.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className='bg-indigo-500 text-white' onClick={handleCreate}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateCardComponent 