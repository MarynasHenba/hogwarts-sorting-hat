import { Character } from '../shared/types';
import { create } from 'zustand';

interface ISortingState {
  total: number,
  success: number,
  failed: number,
  characters: Character[] | [],
  interactedCharacters: Character[] | [],
  setTotal: (value: number) => void;
  setSuccess: (value: number) => void;
  setFailed: (value: number) => void;
  setCharacters: (value: Character[] | []) => void;
  setInteractedCharacters: (value: Character[] | []) => void;
  resetStore: () => void;
}

export const useSortingStore = create<ISortingState>(set => {
  return {
    total: 0,
    success: 0,
    failed: 0,
    characters: [],
    interactedCharacters: [],

    setTotal: (value: number): void => {
      set(() => {
        return { total: value };
      });
    },
    setSuccess: (value: number): void => {
      set(() => {
        return { success: value };
      });
    },
    setFailed: (value: number): void => {
      set(() => {
        return { failed: value };
      });
    },
    setCharacters: (value: Character[] | []): void => {
      set(() => {
        return { characters: value };
      });
    },
    setInteractedCharacters: (newList: Character[] | []): void => {
      set({ interactedCharacters: newList });
    },
    resetStore: (): void => {
      set(() => {
        return { total: 0, success: 0, failed: 0, interactedCharacters: [] };
      });
    },
  };
});
