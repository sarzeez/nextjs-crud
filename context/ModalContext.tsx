import { createContext, useContext, useState } from "react";
import { PostProps } from "../types/general";

const ModalContext = createContext<any>({});

export const useModal = () => useContext(ModalContext);

export const ModalContextProvider = ({children} : {children: React.ReactNode}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [postData, setPostData] = useState<PostProps>({
        id: '',
        title: '',
        body: ''
    });
    const [createPost, setCreatePost] = useState(true);

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleSetPostData = (post: PostProps) => {
        setPostData(post)
    }

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal, postData, setPostData, handleSetPostData, createPost, setCreatePost}}>{children}</ModalContext.Provider>
    )
}