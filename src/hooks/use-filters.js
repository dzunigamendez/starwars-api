import {useReducer, useEffect} from 'react';
import axios from 'axios';
import {parseParams, updateUrl} from '../utils/history';

const initialState = {
  loading: false,
  search: '',
  params: {
    search: '',
    page: 1,
  },
  data: {
    count: 0,
    results: [],
  },
};

const types = {
  setSearch: 'SET_SEARCH',
  fetchData: 'FETCH_DATA',
  setData: 'SET_DATA',
};

function initializeState(initialState) {
  const params = parseParams(initialState.params);
  return {
    ...initialState,
    search: params.search,
    params,
  };
}

function filtersReducer(state, action) {
  switch (action.type) {
    case types.setSearch:
      return {...state, search: action.payload};
    case types.fetchData:
      return {
        ...state,
        loading: true,
        params: action.payload,
        search: action.payload.search || '',
      };
    case types.setData:
      return {...state, loading: false, data: action.payload};
    default:
      return new Error(`Unhandled action: ${action.type}`);
  }
}

function useFilters(url) {
  const [state, dispatch] = useReducer(
    filtersReducer,
    initialState,
    initializeState,
  );

  const getData = async nextParams => {
    let params = state.params;
    if (nextParams) {
      params = nextParams;
      dispatch({type: types.fetchData, payload: nextParams});
    }
    const response = await axios.get(url, {params});
    dispatch({type: types.setData, payload: response.data});
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    const nextParams = {search: state.search, page: 1};
    dispatch({type: types.fetchData, payload: nextParams});
    updateUrl(nextParams);
  };

  const onSearchChange = e => {
    dispatch({type: types.setSearch, payload: e.target.value});
  };

  const handlePage = page => {
    const nextParams = {search: state.search, page};
    dispatch({type: types.fetchData, payload: nextParams});
    updateUrl(nextParams);
  };

  const onNextPage = () => {
    handlePage(state.params.page + 1);
  };

  const onPrevPage = () => {
    handlePage(state.params.page - 1);
  };

  useEffect(() => {
    getData();
  }, [state.params]);

  useEffect(() => {
    const handlePopState = () => {
      const nextParams = parseParams();
      dispatch({type: types.fetchData, payload: nextParams});
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return {
    state,
    onSearchChange,
    onSearchSubmit,
    onPrevPage,
    onNextPage,
  };
}

export default useFilters;
