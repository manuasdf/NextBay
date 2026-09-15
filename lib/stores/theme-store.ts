import { create } from 'zustand';

interface ThemeState {
    resolvedTheme: "dark" | "light";
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    resolvedTheme: "light",
    toggleTheme: () => set((state) => ({
        resolvedTheme: state.resolvedTheme === "light" ? "dark" : "light"
    })),
}))
