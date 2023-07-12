import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(){
      super();

      this.state={
        monsters:[]
      };

      console.log('constructor');
  }

  componentDidMount(){
    console.log('componentDidMount');
     // 1st time React renders a component on to the page
     fetch('https://jsonplaceholder.typicode.com/users')
     .then(response=>response.json())
     .then(users=>this.setState({monsters:users}));
  }

  render(){
    console.log('render');
    return(
    <div className="App">
      <input className='search-box' type='search' placeholder='Search Monsters' onChange={(event)=>{
        const searchString=event.target.value.toLowerCase();
         const filteredMonsters=this.state.monsters.filter((monster)=>{
              return monster.name.toLocaleLowerCase().includes(searchString);
         });

          this.setState({monsters:filteredMonsters});
      }}/>
      <h1>{this.state.monsters.map((monster)=>{
        return <div key={monster.id}><h1>{monster.name}</h1></div>
      })}</h1>
    </div>
    )
  }
}

export default App;
