import React, { Component } from 'react';

import { getData } from '../../service';

class App extends Component {
  constructor() {
    super()

    this.state = {

    }
  }

  componentDidMount = async () => {
    const data = await getData();
    debugger;
  }

  render() {
    return(
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              dsadsad
            </div>
            <div className="col-12 col-lg-6">
              dsadsa
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;