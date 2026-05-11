import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SEARCH_PARAM = "search";
const SEARCH_DEBOUNCE_DELAY = 300;

export const useTreeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_PARAM) ?? "";
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Keep URL as the refresh-safe source for the committed search query.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextSearchQuery = searchInput.trim();

      if (nextSearchQuery === searchQuery) {
        return;
      }

      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        if (nextSearchQuery) {
          nextParams.set(SEARCH_PARAM, nextSearchQuery);
        } else {
          nextParams.delete(SEARCH_PARAM);
        }

        return nextParams;
      });
    }, SEARCH_DEBOUNCE_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchInput, searchQuery, setSearchParams]);

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.delete(SEARCH_PARAM);

      return nextParams;
    });
  };

  return {
    clearSearch,
    searchInput,
    searchQuery,
    setSearchInput,
  };
};
