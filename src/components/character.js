import React from  'react';
import { Draggable } from 'react-drag-and-drop'
const Character = ({character,selected,corrected,index})=>{
  var classname = "list-inline-item col-md-1 character "+selected+" "+corrected+" "+index
  var data = index+" "+character
    return(
      <Draggable type='word' data={data}><li className={classname}>{character}</li></Draggable>
    )
}

export default Character
