import { create } from "zustand";

interface PagesStoreProps {
    page: number;
    setPage: (page: number) => void;
}

const pagesStore = create<PagesStoreProps>((set) => ({
    page: 1,
    
    setPage: (page) => set(() => ({
        page: page
    }))
}));

export default pagesStore;