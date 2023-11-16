import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import Prizes from './components/Prizes';
import Laureates from './components/Laureates';
import Pagination from './components/Pagination';
import { fetchPrizes } from './components/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [prizes, setPrizes] = useState([]);
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [laureates, setLaureates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPrizes();
      setPrizes(data.prizes);
      setFilteredPrizes(data.prizes);

      const uniqueCategories = [...new Set(data.prizes.map(prize => prize.category))];
      const uniqueYears = [...new Set(data.prizes.map(prize => prize.year))].sort((a, b) => b - a);
      setCategories(uniqueCategories);
      setYears(uniqueYears);

      const laureateCount = {};
      data?.prizes?.forEach(prize => {
        prize?.laureates?.forEach(laureate => {
          if (laureate) {
            laureateCount[laureate.id] = (laureateCount[laureate.id] || 0) + 1;
          }
        });
      });
      const laureates = data?.prizes?.flatMap(prize => prize.laureates)?.filter(laureate => laureate && laureateCount[laureate.id] > 1);
      setLaureates(laureates);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (category === 'All') {
      setFilteredPrizes(prizes);
    } else {
      setFilteredPrizes(prizes.filter(prize => prize.category === category));
    }
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    if (year === 'All') {
      setFilteredPrizes(prizes);
    } else {
      setFilteredPrizes(prizes.filter(prize => prize.year === year));
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrizes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex flex-column gap-3 p-4'>
      <Filters categories={categories} years={years} onCategoryChange={handleCategoryChange} onYearChange={handleYearChange} />
      <Prizes prizes={currentItems} />
      <Laureates laureates={laureates} />
      <Pagination itemsPerPage={itemsPerPage} totalItems={filteredPrizes.length} currentPage={currentPage} paginate={paginate} />
    </div>
  );
}

export default App;