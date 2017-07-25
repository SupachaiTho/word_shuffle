import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
          word_correct: [],
          word_shuffle: []
        };
    }

    render(){
        return (
            <div>
              Initial!!
            </div>
    );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
