"use client"

import { useState } from 'react'
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from './Input';
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState()
    const uploadModal = useUploadModal()

    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset()
            uploadModal.onClose()
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async ({values}) => {

    }
    return ( 
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <from 
                onSubmit={handleSubmit(onSubmit)}>
                   <Input id="title"
                        disabled={isLoading}
                        {...register('title', { required: true })}
                        placeholder="Song Title"
                    /> 
                    <Input id="author"
                        disabled={isLoading}
                        {...register('author', { required: true })}
                        placeholder="Song Title"
                    /> 
            </from>
        </Modal>
     );
}
 
export default UploadModal;