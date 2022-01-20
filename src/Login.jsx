import React, { Component } from 'react';



class Login extends Component {

    state = {
        userId: ''
    }


    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.props.history.push('/')
        }
    }


    onChange = (e) => {
        this.setState({ userId: e.target.value })
    }
    onClick = async () => {

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${this.state.userId}`)
            const particularUser = await res.json();
            if (res.status === 404) {
                throw new Error('Not Found');
            }
            localStorage.setItem(`user`, JSON.stringify(particularUser))
            this.props.setMessage({
                message: 'Login Successfull',
                type: 'success'
            })
            this.props.history.push('/')
        } catch (e) {
            this.props.setMessage({
                message: 'Oops!!! User not found',
                type: 'error'
            })
        }
        this.setState({ userId: '' })

    }

    render() {
        return (
            <div className='card' >

                <div className="mb-3 text-center">
                    <h1 className=''>Login</h1>

                    <input
                        onChange={this.onChange}
                        value={this.state.userId}
                        type="text"
                        className="form-control"
                        placeholder='1-10'
                    />

                </div >

                <button
                    onClick={this.onClick}
                    type="submit"
                    className="btn btn-primary"

                >
                    Submit
                </button>


            </div >
        );
    }
}
export default Login;