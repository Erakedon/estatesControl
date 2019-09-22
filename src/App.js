import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './style.css';
import MainPage from './Pages/MainPage/MainPage';
import AddNew from './Pages/AddNew/AddNew';
import Menu from './Shared/Menu/Menu';
import EstateView from './Pages/EstateView/EstateView';
import EditEstate from './Pages/EditEstate/EditEstate';
import FloatingToolbox from './Shared/FloatingToolbox/FloatingToolbox';
import RecentActivityBar from './Shared/RecentActivityBar/RecentActivityBar';

class App extends Component {
  state = {
    recentActivities: []
  }

  activitiesCounter = 0;

  removeActivity() {
    let updatedActivities = this.state.recentActivities;
    updatedActivities.shift();

    this.setState({recentActivities: updatedActivities});
  }

  addActivity(activity) {
    let updatedActivities = this.state.recentActivities;
    updatedActivities.push({type: activity, key: this.activitiesCounter++});
    
    this.setState({recentActivities: updatedActivities});

    setTimeout(() => {
      this.removeActivity();
    }, 5000);
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>

          <Route component={Menu} />
          <Route render={props => <RecentActivityBar {...props} activities={this.state.recentActivities} />} />
          <Route render={props => <FloatingToolbox {...props} reportActivity={activity => {this.addActivity(activity)}} />} />

          <Route path="/" exact render={props => <MainPage {...props} reportActivity={activity => {this.addActivity(activity)}} />} />
          <Route path="/add" render={props => <AddNew {...props} reportActivity={activity => {this.addActivity(activity)}} />} />
          <Route path="/edit" render={props => <EditEstate {...props} reportActivity={activity => {this.addActivity(activity)}} />} />
          <Route path="/view" render={props => <EstateView {...props} reportActivity={activity => {this.addActivity(activity)}} />} />

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
