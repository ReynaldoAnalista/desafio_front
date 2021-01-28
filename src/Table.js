import axios from 'axios';
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Container,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import { Component } from "react";

class AppTable extends Component {
  constructor( props ) {
		super( props );
    this.state = {
      results: {},
    };		
  }
  
  handleOnInputChange = () => {
		this.fetchSearchResults(this.state.input);
	};

	handleChange = (e) => {
    	this.setState({ input: e.target.value });
  };
  
  fetchSearchResults = (query) => {		
		const searchUrl = `https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${query}&source=nanook`;
		axios.get(searchUrl)
			.then( res => {
				const total = res.data.products;
				this.setState( {
					results: res.data.products,
					totalResults: total,
					loading: false
				} )
			} )
			.catch( error => {
				if ( axios.isCancel(error) || error ) {
					this.setState({
						message: 'Erro ao pesquisar, tente novamente'
					})
				}
			} )
	};

  renderSearchResults = () => {
    const { results } = this.state;    
    if (Object.keys( results ).length && results.length) {
      return (        
          <Grid item xs={12} id="gridAppTable">
            <TableContainer component={Paper}>
            <Table>
              <TableHead id="tblHead">
                <TableRow>
                  <TableCell >Nome do Produto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>	
			)
		}
	};

  render() {
    return (
        <Container>
          <Grid item xs={12}>
            <TextField label="Digite o nome do produto" variant="outlined" onChange={this.handleChange}/>
            <Button
              id="btnBuscar"
              variant="contained"
              color="primary"
              onClick={this.handleOnInputChange}
            > 
              Buscar
            </Button>
        </Grid>
        { this.renderSearchResults()}
        </Container>      
      );
  }
}

export default AppTable;
