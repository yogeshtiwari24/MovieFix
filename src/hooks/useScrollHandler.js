import { useEffect } from 'react';
import debounce from 'lodash.debounce';

const useScrollHandler = ({ isFetching, loading, setIsFetching, setYear, loadedYears }) => {
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (isFetching || loading) return;

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        const highestYear = Math.max(...Array.from(loadedYears));
        if (!loadedYears.has(highestYear + 1)) {
          setIsFetching(true);
          setYear(highestYear + 1);
        }
      } else if (scrollTop <= 100) {
        const lowestYear = Math.min(...Array.from(loadedYears));
        if (!loadedYears.has(lowestYear - 1)) {
          setIsFetching(true);
          setYear(lowestYear - 1);
        }
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, loading, setIsFetching, setYear, loadedYears]);
};

export default useScrollHandler;
