import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import Word from './components/word'

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
          word: "family"
        };

    }

    render(){
      var word = this.state.word
        return (
            <div>
              <Word word = {word}/>
            </div>
    );
    }

}

ReactDOM.render(<App />, document.querySelector('.container'));
