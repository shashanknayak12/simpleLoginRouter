import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Posts from './Posts';


class Navbar extends Component {


    componentDidMount() {
        if (!localStorage.getItem('user')) {
            this.props.history.push('/login')
        }

        if (!this.props.match.params.activetab) {
            this.props.history.push('/posts')
        }


    }


    onClick = () => {
        localStorage.removeItem('user')
        this.props.history.push('/login')

    }



    onChangeTab = (target) => {
        this.props.history.push(`/${target}`)

    }

    render() {
        console.log("dash params", this.props.match.params)
        return (
            <div>
                <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Router project</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">


                            <button
                                onClick={this.onClick}

                                className="btn btn-outline-success"
                                type="submit">
                                Logout
                            </button>

                        </div>
                    </div>
                </nav >
                <div className='d-flex'>
                    <div className={this.props.match.params.activetab === 'posts' ? 'is-active' : ''} onClick={() => this.onChangeTab('posts')}>
                        Posts

                    </div>
                    <div className={this.props.match.params.activetab === 'albums' ? 'is-active' : ''} onClick={() => this.onChangeTab('albums')}>
                        Albums

                    </div>
                </div>

                <Switch>
                    <Route path='/posts' component={() => <Posts />} />

                    <Route path='/albums' component={() => <div>albums</div>} />

                </Switch>

            </div >
        )
    }


}

export default Navbar;