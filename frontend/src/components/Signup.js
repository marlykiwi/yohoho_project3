import React, { Component } from 'react'
import { signup } from '../services/auth';
import { Form, Button, Alert } from 'react-bootstrap';

export default class Signup extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        message: ''
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const { username, email, password} = this.state;
        signup(username, email, password)
            .then(data => {
                if (data.message) {
                    this.setState({
                        message: data.message,
                        password: ''
                    })
                } else {
                    // now we need to put the user in the user key of the state of App.js
                    this.props.setUser(data);
                    // redirect to /projects
                    this.props.history.push('/dashboard');
                }

            })
    }

    render() {
        return (
            <>
                <h2>Signup</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="username">Username: </Form.Label>
                        <Form.Control
                            type='text'
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                            id='username'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email: </Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            id='input-email'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password: </Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            id='password'
                        />
                    </Form.Group>
                    {this.state.message && (
                        <Alert variant='danger'>{this.state.message}</Alert>
                    )}
                    <Button type='submit'>Signup</Button>
                </Form>
            </>
        )
    }
}