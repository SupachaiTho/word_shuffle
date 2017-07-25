import React,{ Component } from 'react'
import Character from './character'
import {Droppable } from 'react-drag-and-drop'
var keycode = require('keycode');


class Word extends Component {
    constructor(props){
        super(props);

        this.state = {
          word: props.word,
          word_correct: props.word.split(''),
          word_shuffle: shuffle(props.word.split('')),
          key: 'n/a',
          select_location: 0,
          history: [],
          result: []
        };

        document.addEventListener('keydown', (e)=>this.getInput(keycode(e)))
    }


    render() {
      const characters = this.state.word_shuffle.map((character,index)=>{
        var selected = ""
        var result = this.state.result;
        if(index == this.state.select_location){
          selected = "selected"
        }
          return (
            <Droppable
                    types={['word']} // <= allowed drop types
                    onDrop={this.onDrop.bind(this)}
                    key = {index}
                    >
              <Character
              key = {index}
              character={character}
              selected = {selected}
              corrected = {result[index]}
              index = {index}/>
            </Droppable>
          )
      })

        return(
        <div className="word">
            <div className="col-md-12 list-inline">
              {characters}
            </div>
        </div>
        )
    }


    onDrop(data, target){
      var tempLocation
      var character
      var newLocation
      data.word.split(" ").forEach((val,index)=>{
        if(index == 0){
          tempLocation = parseInt(val)
        }else{
          character = val
        }
      })

      target.target.className.split(" ").forEach((val,index) => {
        newLocation = parseInt(val)
      })

      this.changeShuffleListByDrag(character,tempLocation,newLocation)
    }

    getInput(key){
       this.setState({key:key})
       switch (key) {
         case 'enter':
          this.checkReslt()
          break;
         case 'backspace':
          this.backWard()
          break;
         default:
          this.checkLetter(key)
          break;
       }
    }

    checkLetter(key){
      if(this.state.word_correct.indexOf(key)>=0){
          this.changeShuffleList(key)
      }
    }

    changeShuffleListByDrag(key,templocation,newlocation){
      var tempWord = this.state.word_shuffle.slice()
      var tempLocation = templocation
      var history = this.state.history
      var tempkey = tempWord[newlocation]
      var result = []
      var newTempLocation

      history.push(tempWord)

      tempWord = this.state.word_shuffle
      this.switchLocationByDrag(tempkey,tempLocation)

      if(newLocation!= -1){
        tempWord[newlocation] = key
        var newLocation = newlocation+1
        this.setState({
          word_shuffle: tempWord,
          select_location:newLocation,
          history:history,
          result:result
        })

      }
    }

    switchLocationByDrag(tempkey,newlocation){
      var tempWord = this.state.word_shuffle
      var history = this.state.history

      if(newlocation == location){
        history.pop()
      }else{
        tempWord[newlocation] = tempkey;
      }
    }

    changeShuffleList(key){
      // temp by value
      var tempWord = this.state.word_shuffle.slice()
      var tempLocation = this.state.select_location
      var history = this.state.history
      var tempkey = tempWord[tempLocation]
      var result = []

      history.push(tempWord)

      // temp by ref
      tempWord = this.state.word_shuffle
      var newLocation = this.switchLocation(key,tempLocation,tempkey)

      if(newLocation!= -1){
        if(newLocation>tempLocation){
          tempWord[tempLocation] = key
        }

        tempLocation +=1

        if(tempLocation==tempWord.length){
          tempLocation=0
        }
        this.setState({
          word_shuffle: tempWord,
          select_location:tempLocation,
          history:history,
          result:result
        })
      }
    }

    switchLocation(key,location,tempkey){
      var tempWord = this.state.word_shuffle
      var history = this.state.history

      var newlocation = -1
      tempWord.forEach(function(e,i){
        if(e == key && i >= location){
          newlocation = i;
        }
      })
      if(newlocation > location){
        tempWord[newlocation] = tempkey;
      }else if(newlocation < location){
        history.pop()
      }

      return newlocation
    }

    backWard(){
      var history = this.state.history
      var result = []
      if(history.length>0){
        var tempWord = history.pop()
        var tempLocation = this.state.select_location

        if(tempLocation>0){
          tempLocation -=1
        }

        this.setState({
          word_shuffle: tempWord,
          select_location:tempLocation,
          history:history,
          result:result
        })
      }
    }

    checkReslt(){
      var result = []
      var tempWord = this.state.word_shuffle
      var correctWord = this.state.word_correct

      tempWord.forEach(function(e,i){
        if(e == correctWord[i]){
          result[i] = "corrected"
        }else{
          result[i] = "incorrected"
        }
      })
      this.setState({
        result: result,
        select_location:0
      })
    }

}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a
}
export default Word
