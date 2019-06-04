import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

//import uuid from 'uuid';
import axios from 'axios';



import './App.css';

class App extends Component {
/*
  state = {
    todos : [
      {
        id : uuid.v4(),
        title : 'Take out the trash',
        completed: false
      },
      {
        id : uuid.v4(),
        title : 'Dinner with Wife',
        completed: false
      },
      {
        id : uuid.v4(),
        title : 'Meeting with boss',
        completed: false
      }
    ]
  }
*/
  state = {
    todos : []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
      //.then(res => console.log(res.data))
      .then(res => this.setState({ todos: res.data }))
  }

  // Toggle Complete - Setting state change when checkbox is clicked
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  // Delete Todo
  delTodo = (id) => {
    //console.log(id);
    /*
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
    */
   axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>  this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  //Add todo
  addTodo = (title) => {
    //console.log(title);
    /*
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false
    }
    */
    axios.post('https://jsonplaceholder.typicode.com/todos?_limit=15', {
      title: title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
              <Header />

              <Route exact path="/" render={props => (
                <React.Fragment>
                  <AddTodo  addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markComplete={this.markComplete}  delTodo={this.delTodo}/>
                </React.Fragment>
              )} />   

              <Route path="/about" component={About} />   

          </div>        
        </div>
      </Router>
    );
  }
};

export default App;
