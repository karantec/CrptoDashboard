import  { Component } from 'react';
import CardSection from './components/CardSection';
import Header from './components/Header';
import ChartSection from './components/ChartSection';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: 'bitcoin',
      Data: {}
    };
  }

  fetchData = async () => {
    try {
      let response = await fetch('https://api.coingecko.com/api/v3/coins/' + this.state.Id);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      let jsonData = await response.json();
      this.setState({ Data: jsonData });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  handleSubmit=async(e)=>{
    console.log(e.target.value)
    await this.setState({Id:e.target.value,Data:this.state.Data})
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        {/* <h1>{this.state.Id}</h1>
        <h1>{this.state.Data.name}</h1>
        <h1>{this.state.Data.sentiment_votes_up_percentage}</h1>  */}
        <Header handle_Submit={this.handleSubmit}  />
        <CardSection coinName={this.state.Data.name} currentPrice={this.state.Data.market_data ? this.state.Data.market_data.current_price["usd"] : ""}
          mCap24={this.state.Data.market_data ? this.state.Data.market_data.market_cap_change_percentage_24h : ""}
          ath={this.state.Data.market_data ? this.state.Data.market_data.ath.usd : ""} atl={this.state.Data.market_data ? this.state.Data.market_data.ath.usd : ""}
          sentiment={this.state.Data.sentiment_votes_up_percentage} high24={this.state.Data.market_data ? this.state.Data.market_data.high_24h["usd"] : ""}
          low24={this.state.Data.market_data ? this.state.Data.market_data.low_24h["usd"] : ""} />
         
          
         <ChartSection Id={this.state.Id} priceChange24={this.state.Data.market_data ? this.state.Data.market_data.price_change_24h_in_currency.usd : ""} 
        MarketCap={this.state.Data.market_data ? this.state.Data.market_data.market_cap.usd  : ""}
        TotVol={this.state.Data.market_data ? this.state.Data.market_data.total_volume.usd  : ""}
        Circulating= {this.state.Data.market_data ? this.state.Data.market_data["circulating_supply"] : ""}
        twitterF = {this.state.Data.community_data ? this.state.Data.community_data.twitter_followers : ""}/>
      
 
      
        {/* Add more code here to display data as needed */}
      </div>
    );
  }
}
