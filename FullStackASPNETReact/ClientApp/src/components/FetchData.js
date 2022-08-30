import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }

  // async populateWeatherData() {
  //   // const response = await fetch('weatherforecast');
  //   // response.then((res) => {
  //   //   this.setState({ forecasts: res.json(), loading: false });
  //   // });
  //   let myPromise = new Promise(function (resolve) {
  //     let req = new XMLHttpRequest();
  //     req.open('GET', 'weatherforecast');
  //     req.onload = function () {
  //       if (req.status == 200) {
  //         resolve(req.response);
  //         // this.setState({ forecasts: req.response, loading: false });
  //       } else {
  //         resolve("File not found");
  //       }
  //     };
  //     req.send();
  //   });

  // }

}
