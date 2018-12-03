import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default class FormDialog extends React.Component {
  state = {
    open: false,
    disco_nome: "",
    disco_autor: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirmar = () => {
    this.addDisco();
    this.handleClose();
    this.props.update();
  };

  handleDeletar = () => {
    this.deleteDisco();
    this.handleClose();
    this.props.update();
  };

  handleEditar = () => {
    this.editDisco();
    this.handleClose();
    this.props.update();
  };

  addDisco = () => {
    const { disco_nome, disco_autor } = this.state;
    fetch(`http://localhost:4000/discos/add?disco_nome=${disco_nome}&disco_autor=${disco_autor}&colecao_id=${this.props.colecaoID}`)
      .catch(err => console.error(err))
  }

  deleteDisco = () => {
    fetch(`http://localhost:4000/discos/delete?disco_id=${this.props.discoID}`)
      .catch(err => console.error(err))
  }

  editDisco = () => {
    const { disco_nome, disco_autor } = this.state;
    fetch(`http://localhost:4000/discos/edit?disco_id=${this.props.discoID}&disco_nome=${disco_nome}&disco_autor=${disco_autor}`)
      .catch(err => console.error(err))
  }

  render() {
    if(this.props.type==0){
      return (
        <div>
          <Button onClick={this.handleClickOpen}>Adicionar Disco</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Disco</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Preencha as informações sobre o disco :)
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome do disco"
                type="email"
                fullWidth
                onChange={e => this.setState({ disco_nome: e.target.value})}
              />
              <TextField
                autoFocus
                margin="dense"
                id="autor"
                label="Autor do disco"
                type="email"
                fullWidth
                onChange={e => this.setState({ disco_autor: e.target.value})}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.handleConfirmar} color="primary">
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }else if(this.props.type==1){
      return (
        <div>
          <IconButton aria-label="Edit" onClick={this.handleClickOpen}>
            <EditIcon />
          </IconButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Editar/Deletar Disco</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Preencha as informações sobre o disco :)
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome do disco"
                type="email"
                fullWidth
                onChange={e => this.setState({ disco_nome: e.target.value})}
              />
              <TextField
                autoFocus
                margin="dense"
                id="autor"
                label="Autor do disco"
                type="email"
                fullWidth
                onChange={e => this.setState({ disco_autor: e.target.value})}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.handleEditar} color="primary">
                Editar
              </Button>
              <Button onClick={this.handleDeletar} color="primary">
                Deletar Disco
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}