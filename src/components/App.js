import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  onAdoptPet = (id) => {
    let petChanges = this.state.pets.map((pet) =>{
      if(pet.id === id){
        return {...pet, isAdopted: true}
      } else{
        return pet
      }
    });
    this.setState({
      pets: petChanges
    })
  }

  onChangeType = (newType) =>{
    this.setState({
      filters:{
        type: newType
      }
    })
  }

  setPetsState = (data) => {
    this.setState({
      pets: data
    }, e => console.log(this.state))
  }

  onFindPetsClick = () => {
      let url = '/api/pets';

      if (this.state.filters.type !== 'all') {
        url += `?type=${this.state.filters.type}`;
      }

      fetch(url)
        .then(res => res.json())
        .then(pets => this.setPetsState(pets));
     

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
