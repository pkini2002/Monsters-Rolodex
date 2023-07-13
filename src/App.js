// 1st constructor() is called and then render() is called and then componentDidMount() is called

import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';


class App extends Component {
  constructor(){
      super();
      
      // State is used to maintain the fields which are common to the component
      this.state={
        monsters:[],
        searchField:''
      };
  }

  componentDidMount(){
     // 1st time React renders a component on to the page this will be loaded and then render() will be called again
     fetch('https://jsonplaceholder.typicode.com/users')
     .then(response=>response.json())
     .then(users=>this.setState({monsters:users}));
  }

  /* Arrow function is used to bind the context of this to the class (Every time the render() is called
 the arrow function is created again and again so it is not a good practice to use arrow function in
  render()) */

  onSearchChange=(event)=>{
     const searchField=event.target.value.toLowerCase();
     this.setState(()=>{
        return {searchField}
     });
  }

  render(){
      const {monsters,searchField}=this.state;
      const {onSearchChange}=this;

     // Filter the monsters based on the searchField
      const filteredMonsters=monsters.filter((monster)=>{
              return monster.name.toLocaleLowerCase().includes(searchField);
      });

    return(
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
          onChangeHandler={onSearchChange} 
          placeholder='Search Monsters'
          className='monsters-search-box'/>
      <CardList monsters={filteredMonsters}/>
    </div>
    )
  }
}

export default App;
