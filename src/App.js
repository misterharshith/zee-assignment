import React, { useEffect, useState, createContext } from 'react'
import GridContainer from './Components/GridContainer';
import Header from './Components/Header';
import { debounce } from './helper';
import './App.css';

export const ContextState = createContext(null)

const App = () => {

  const [state, setState] = useState({
    albumData: [],
    filter: '',
    isFetching: false,
    page: 1,
  });

  useEffect(() => {
    fetchData()
    window.addEventListener('scroll', debounce(handleScroll, 500));
  }, [])

  useEffect(() => {
    if (!state.isFetching) return;
    fetchMoreListItems();
  }, [state.isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setState((prevState) => ({
      ...prevState,
      isFetching: false
    }))
  };

  const handleScroll = () => {
    if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight || state.isFetching)
      return;
    setState((prevState) => ({
      ...prevState,
      isFetching: true
    }))
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${state.page}/photos`);
      const json = await response.json();
      setState((prevState) => ({
        ...prevState,
        page: state.page + 1,
        albumData: [...state.albumData, ...json]
      }))
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChange = debounce((e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  })

  return (
    <div className="App">
      <ContextState.Provider value={state}>
        <Header handleInputChange={handleInputChange} />
        <GridContainer />
      </ContextState.Provider>
    </div>
  );
}

export default App;
