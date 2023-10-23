"use client"

import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModalProvider = () => {
    const [isMouted, setIsMouted] = useState(false)

    useEffect(() => {
        setIsMouted(true)
    }, [])

    if (!isMouted) {
        return null
    }
    return ( 
        <>
            <AuthModal />
            <UploadModal />
        </>
     );
}
 
export default ModalProvider;