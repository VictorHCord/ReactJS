import React, { Component } from 'react';

import {
  FaGithub,
  FaPlus,
  FaSpinner,
  FaExclamationCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/container/index';
import { Form, SubmitButton, List, Error } from './styles';

// import { Container } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
    valid: true,
    errorMessage: '',
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') {
        throw new Error('Informe um repositorio');
      }
      const response = await api.get(`/repos/${newRepo}`);

      const verifyHepo = repositories.find(
        r => r.name.toLowerCase() === newRepo.toLowerCase()
      );

      if (verifyHepo) throw new Error('Repositório duplicado');
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        errorMessage: '',
        valid: true,
      });
    } catch (error) {
      this.setState({ error: true });

      let message = '';
      const { newRepo } = this.state;
      const { repositories } = this.state;

      if (newRepo !== '') message = 'Informe um repositorio';

      const verifyHepo = repositories.find(
        r => r.name.toLowerCase() === newRepo.toLowerCase()
      );

      if (verifyHepo) message = 'Repositorio duplicado';

      this.setState({ valid: false, newRepo: '', errorMessage: message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      newRepo,
      repositories,
      loading,
      error,
      valid,
      errorMessage,
    } = this.state;
    return (
      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            valid={!!valid}
            placeholder="Coloque o repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={15} />
            ) : (
              <FaPlus color="#fff" size={15} />
            )}
          </SubmitButton>
        </Form>
        {valid ? (
          <></>
        ) : (
          <Error>
            {' '}
            <FaExclamationCircle /> {errorMessage}
          </Error>
        )}
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
