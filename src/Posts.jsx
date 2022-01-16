import React, { Component } from 'react';




class Posts extends Component {


    state = {
        userIdPost: [],
        isCommentOpenFor: -1,
        comments: [],
    }

    myPostsData = async () => {
        const userId = JSON.parse(localStorage.getItem('user'))

        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId['id']}`)
        const userIdPost = await res.json()
        this.setState({ userIdPost })


    }

    componentDidMount() {

        this.myPostsData()
    }



    openComment = async (postId) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        const comments = await res.json()
        this.setState({ isCommentOpenFor: postId, comments })

    }

    hideComments = () => {
        this.setState({ isCommentOpenFor: -1, comments: [] })
    }

    render() {


        console.log(this.state.comments)
        return (
            <div>

                {this.state.userIdPost.map(eachPost => {
                    return (
                        <div className='card-post'>

                            <h3>{eachPost.title}</h3>
                            <p>{eachPost.body}</p>

                            {this.state.isCommentOpenFor === eachPost.id ?
                                <div><h1>comments section</h1>
                                    {this.state.comments.map(eachComment => {
                                        return (
                                            <div>
                                                <h3>{eachComment.name}</h3>
                                                <p>{eachComment.body}</p>
                                            </div>)
                                    })}
                                    <button onClick={this.hideComments}>Hide</button>
                                </div>
                                :
                                <button
                                    onClick={() => this.openComment(eachPost.id)}
                                    className='btn btn-outline-primary'
                                >Open Comment</button>

                            }


                        </div>
                    )
                })}

            </div>
        );
    }
}
export default Posts;