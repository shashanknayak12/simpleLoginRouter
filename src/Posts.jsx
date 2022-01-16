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


    deleteComment = (commentId) => {
        const newComments = [...this.state.comments]

        const newCommentarr = newComments.filter(comment => {
            return comment.id !== commentId
        })

        this.setState({ comments: newCommentarr })
    }


    deletePost = (postId) => {

        const newposts = [...this.state.userIdPost]

        const newPostarr = newposts.filter(post => {
            return post.id !== postId
        })
        this.setState({ userIdPost: newPostarr })

    }

    render() {



        return (
            <div>

                {this.state.userIdPost.map(eachPost => {
                    return (
                        <div className='card-post'>
                            <div className='post-title'>
                                <h3>{eachPost.title}</h3>
                            </div>

                            <p>{eachPost.body}</p>


                            {this.state.isCommentOpenFor === eachPost.id ?
                                <div className='comments-card'>
                                    <h1>comments section</h1>
                                    {this.state.comments.map(eachComment => {
                                        return (
                                            <div className='each-comments'>
                                                <div  >
                                                    <h3>{eachComment.name}</h3>
                                                </div>
                                                <div>
                                                    <p>{eachComment.body}</p>
                                                </div>

                                                <button
                                                    onClick={() => this.deleteComment(eachComment.id)}
                                                    className='btn btn-outline-danger'
                                                >
                                                    Delete Comment
                                                </button>

                                            </div>
                                        )
                                    })}
                                    <button
                                        className=' btn btn-outline-secondary'
                                        onClick={this.hideComments}
                                    >
                                        Hide
                                    </button>
                                </div>
                                :
                                <div>
                                    <button
                                        onClick={() => this.openComment(eachPost.id)}
                                        className='btn btn-outline-primary'
                                    >
                                        Open Comment
                                    </button>


                                    <button
                                        onClick={() => this.deletePost(eachPost.id)}
                                        className='btn btn-outline-danger ms-2 ps-4 pe-4'
                                    >
                                        Delete Post
                                    </button>
                                </div>


                            }



                        </div>
                    )
                })}

            </div>
        );
    }
}
export default Posts;