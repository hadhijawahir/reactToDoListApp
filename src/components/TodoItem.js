import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  getStyle = () => {
      return {
          background : '#f4f4f4',
          padding : '10px',
          borderBottom : '1px #CCC dotted',
          textDecoration : this.props.todo.completed ? 'line-through' : 'none'
      }
    //   if (this.props.todo.completed){
    //       return {
    //           textDecoration : 'line-through'
    //       }
    //   }
    //   else {
    //       return {
    //         textDecoration : 'none'
    //       }
    //   }
  }
  
  /*
  markComplete = (e) =>{
    console.log(this.props);
  }
  */

  render() {
    const { id, title } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <p>
            <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
            { title }
            <button onClick={this.props.delTodo.bind(this, id)} style = { btnStyle }>X</button>
        </p>
      </div>
    )
  }
}

//PropTypes
TodoItem.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}


//Button Style
const btnStyle = {
  background : '#FF0000',
  color: '#FFF',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}  
export default TodoItem
