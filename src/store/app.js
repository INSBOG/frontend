import {create} from "zustand"


const useStore = create((set) => ({
    loading: false,
    user: null,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
}))

export default useStore