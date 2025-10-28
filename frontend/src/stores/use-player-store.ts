import { create } from "zustand";
import type { PlayerState } from "~/types/player";

export const usePlayerStore = create<PlayerState>((set) => ({
  track: null,
  setTrack: (track) => set({ track }),
}));
