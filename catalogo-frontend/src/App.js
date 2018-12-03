import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ExpansionPanel from './ExpansionPanel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {

  state = {
    colecoes: [],
    colecao: {
      colecao_id: 0,
      colecao_name: ''
    },
    discos: [],
    disco: {
      disco_id: 0,
      disco_nome: '',
      disco_autor: ''
    },
    discoPertence :[],
    colecoesComDiscos :[],
    busca: ""
  }

  componentDidMount(){
    this.getColecoes();
  }

  getColecoes = _ => {
    fetch('http://localhost:4000/colecoes')
      .then(response => response.json())
      .then(response => this.setState({ colecoes: response.data }, () => {
        this.getDiscos();
      }))
      .catch(err => console.error(err))
  }

  getDiscos = _ => {

    fetch('http://localhost:4000/discos')
      .then(response => response.json())
      .then(response => this.setState({ discos: response.data }, () => {
        this.getDiscoPertence();
      }))
      .catch(err => console.error(err))
  }

  getDiscoPertence = _ => {

    fetch('http://localhost:4000/discopertence')
      .then(response => response.json())
      .then(response => this.setState({ discoPertence: response.data }, () => {
        this.createColecoesComDiscos();
      }))
      .catch(err => console.error(err))
  }

  createColecoesComDiscos = _ => {
    var temp = [];
    for(var i=0; i<this.state.colecoes.length; i++){
      temp.push(this.state.colecoes[i]);
      temp[i].discos = [];
      for(var k=0; k<this.state.discos.length; k++){
        for(var j=0; j<this.state.discoPertence.length; j++){
          if(this.state.discoPertence[j].colecao_id == this.state.colecoes[i].colecao_id && 
            this.state.discoPertence[j].disco_id == this.state.discos[k].disco_id){
            temp[i].discos.push(this.state.discos[k]);
          }
        }
      }
    }
    this.setState({ colecoesComDiscos: temp })
  }

  addColecao = _ => {
    const { colecao } = this.state;
    fetch(`http://localhost:4000/colecoes/add?colecao_name=${colecao.colecao_name}`)
      .then(this.getColecoes)
      .catch(err => console.error(err))
  }

  buscarDiscos = _ => {
    const { busca } = this.state;
    fetch(`http://localhost:4000/discos/busca?busca=${busca}`)
      .then(response => response.json())
      .then(response => this.setState({ discos: response.data }, () => {
        this.getDiscoPertence();
      }))
      .catch(err => console.error(err))
  }

  render() {
    const { colecoes, colecao, busca } = this.state;
    return (
      <div className="App">

        <div>
          <div>
            <TextField
              id="standard-name"
              label="Nome da coleção"
              value={colecao.colecao_name} 
              onChange={e => this.setState({ colecao: {...colecao, colecao_name: e.target.value }})}
              margin="normal"
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.addColecao}>
              Adicionar Coleção
            </Button>
          </div>
          <div>
            <TextField
              id="standard-name"
              label="Busca"
              value={busca} 
              onChange={e => this.setState({ busca: e.target.value})}
              margin="normal"
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.buscarDiscos}>
              Filtrar discos
            </Button>
          </div>

          
          <ExpansionPanel testdata={this.state.colecoesComDiscos} update={this.getColecoes}/>
        </div>
      </div>
    );
  }
}

export default App;
