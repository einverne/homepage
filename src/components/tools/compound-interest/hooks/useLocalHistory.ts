import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { CalculatorInput, Summary } from '../types';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  name?: string;
  input: CalculatorInput;
  summary: Summary;
}

const STORAGE_KEY = 'compound-interest-history';
const MAX_ENTRIES = 10;

function getStoredHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as HistoryEntry[];
  } catch {
    return [];
  }
}

function setStoredHistory(history: HistoryEntry[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage might be full or disabled
  }
}

export function useLocalHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    setHistory(getStoredHistory());
    setIsLoaded(true);
  }, []);

  const saveEntry = useCallback((input: CalculatorInput, summary: Summary, name?: string) => {
    const newEntry: HistoryEntry = {
      id: uuidv4(),
      timestamp: Date.now(),
      name,
      input,
      summary,
    };

    setHistory((prev) => {
      const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES);
      setStoredHistory(updated);
      return updated;
    });

    return newEntry.id;
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((entry) => entry.id !== id);
      setStoredHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setStoredHistory([]);
  }, []);

  const getEntry = useCallback((id: string): HistoryEntry | undefined => {
    return history.find((entry) => entry.id === id);
  }, [history]);

  const renameEntry = useCallback((id: string, name: string) => {
    setHistory((prev) => {
      const updated = prev.map((entry) =>
        entry.id === id ? { ...entry, name } : entry
      );
      setStoredHistory(updated);
      return updated;
    });
  }, []);

  return {
    history,
    isLoaded,
    saveEntry,
    deleteEntry,
    clearHistory,
    getEntry,
    renameEntry,
  };
}
