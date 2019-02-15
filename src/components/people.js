import React, {Component} from 'react';
import axios from 'axios';
import qs from 'query-string';
import Search from './search';
import Character from './character';
import Results from './results';
import '../scss/people.scss';

const BASE_URL = 'https://swapi.co/api/people';

class People extends Component {
  static updateUrl(options) {
    const params = Object.keys(options).reduce((acc, key) => {
      if (options[key]) {
        acc[key] = options[key];
      }
      return acc;
    }, {});
    let url = window.location.pathname;
    if (params) {
      url = `${url}?${qs.stringify(params)}`;
    }
    window.history.pushState(null, null, url);
  }

  state = {
    search: '',
    data: {
      count: 0,
      results: [],
    },
    loading: false,
    page: 1,
  };

  getData = async () => {
    const {search, page} = this.state;
    const response = await axios.get(BASE_URL, {params: {search, page}});
    this.setState({data: response.data, loading: false});
  };

  getPage = page => {
    const {search} = this.state;
    People.updateUrl({search, page});
    this.setState({page, loading: true}, this.getData);
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    const {search, page} = this.state;
    People.updateUrl({search, page});
    this.setState({loading: true, page: 1}, this.getData);
  };

  handleSearchChange = e => {
    this.setState({search: e.target.value});
  };

  handlePopState = () => {
    this.loadData();
  };

  handleNextPage = () => {
    const {page} = this.state;
    const nextPage = page + 1;
    this.getPage(nextPage);
  };

  handlePrevPage = () => {
    const {page} = this.state;
    const prevPage = page - 1;
    this.getPage(prevPage);
  };

  componentDidMount() {
    this.subscribeToHistory();
    this.loadData();
  }

  componentWillUnmount() {
    this.unsubscribeToHistory();
  }

  loadData() {
    const obj = qs.parse(window.location.search);
    const search = obj.search || '';
    const page = parseInt(obj.page, 10) || 1;

    this.setState({search, page, loading: true}, this.getData);
  }

  subscribeToHistory() {
    window.addEventListener('popstate', this.handlePopState);
  }

  unsubscribeToHistory() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  render() {
    const {search, data, loading, page} = this.state;
    const items = data.results.map(item => (
      <Character item={item} key={item.url} />
    ));

    return (
      <div className="people">
        <h3 className="people__title">People</h3>
        <Search
          loading={loading}
          value={search}
          onChange={this.handleSearchChange}
          onSubmit={this.handleSearchSubmit}
        />
        <Results
          loading={loading}
          page={page}
          size={data.results.length}
          count={data.count}
          limit={10}
          onPrevPage={this.handlePrevPage}
          onNextPage={this.handleNextPage}
        >
          {items}
        </Results>
      </div>
    );
  }
}

export default People;
