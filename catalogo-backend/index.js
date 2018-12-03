const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_COLECOES_QUERY = 'SELECT * FROM catalogo.colecao';
const SELECT_ALL_DISCOS_QUERY = 'SELECT * FROM catalogo.discos';
const SELECT_ALL_DISCOEMCOLECAO_QUERY = 'SELECT * FROM catalogo.discoPertence';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'desafio',
	password: 'password',
	database: 'catalogo'
});

connection.connect(err => {
	if(err){
		console.log(err);
		return err;
	}
});

app.use(cors());

app.get('/', (req, res) => {
	res.send('go to /products to see products')
});

app.get('/colecoes/add', (req, res) => {
	const {colecao_name, price} = req.query;
	const INSERT_COLECAO_QUERY = `INSERT INTO catalogo.colecao (colecao_name) VALUES('${colecao_name}')`;
	connection.query(INSERT_COLECAO_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send('Succesfully added coleção!!');
		}
	});
});

app.get('/discos/delete', (req, res) => {
	const {disco_id} = req.query;
	const DELETE_DISCO_QUERY = `DELETE FROM catalogo.discos WHERE disco_id=${disco_id}`;
	connection.query(DELETE_DISCO_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send('Succes!!');
		}
	});
});

app.get('/discos/edit', (req, res) => {
	const {disco_id, disco_nome, disco_autor} = req.query;
	const EDIT_DISCO_QUERY = `UPDATE catalogo.discos SET disco_nome='${disco_nome}', disco_autor='${disco_autor}' WHERE disco_id=${disco_id}`;
	connection.query(EDIT_DISCO_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send('Succes!!');
		}
	});
});

app.get('/discos/add', (req, res) => {
	const {disco_nome, disco_autor, colecao_id} = req.query;
	const INSERT_DISCO_QUERY1 = `INSERT INTO catalogo.discos (disco_nome ,disco_autor) VALUES('${disco_nome}', '${disco_autor}')`;
	const INSERT_DISCO_QUERY3 = `SELECT disco_id FROM catalogo.discos WHERE disco_nome='${disco_nome}'` ;
	connection.query(INSERT_DISCO_QUERY1, (err, results) => {
		if(err){
			return res.send(err);
		}
	});
	connection.query(INSERT_DISCO_QUERY3, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			res.json({
				data: results
			})
			var discoID = results[0].disco_id;
			const INSERT_DISCO_QUERY2 = `INSERT INTO catalogo.discoPertence (colecao_id ,disco_id) VALUES('${colecao_id}', '${discoID}')`;
			connection.query(INSERT_DISCO_QUERY2, (err, results2) => {
				if(err){
					return res.send(err);
				}
			});
		}
	});
});

app.get('/colecoes', (req, res) => {
	connection.query(SELECT_ALL_COLECOES_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			res.json({
				data: results
			})
		}
	});
});

app.get('/discos', (req, res) => {
	connection.query(SELECT_ALL_DISCOS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			res.json({
				data: results
			})
		}
	});
});

app.get('/discos/busca', (req, res) => {
	const {busca} = req.query;
	const BUSCA_DISCOS_QUERY = `SELECT * FROM catalogo.discos WHERE disco_nome LIKE '%${busca}%' OR disco_autor LIKE '%${busca}%'`;
	connection.query(BUSCA_DISCOS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			res.json({
				data: results
			})
		}
	});
});

app.get('/discopertence', (req, res) => {
	connection.query(SELECT_ALL_DISCOEMCOLECAO_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			res.json({
				data: results
			})
		}
	});
});

app.listen(4000, () => {
	console.log('Products server Listening on port 4000')
});













