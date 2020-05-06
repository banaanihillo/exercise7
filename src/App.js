import React, {useState} from "react"
import {Switch, Route, Link, useRouteMatch} from "react-router-dom"

const Menu = (props) => {
    const {anecdotes, addNewAnecdote, anecdote} = props
    const padding = {
        paddingRight: 5
    }

    return (
        <div>

            <Link to = "/" style = {padding}> Anecdotes </Link>
            <Link to = "/create" style = {padding}> Create new anecdote </Link>
            <Link to = "/about" style = {padding}> More information </Link>
            
            <Switch>
                <Route path = "/create">
                    <CreateNew addNewAnecdote = {addNewAnecdote} />
                </Route>
                <Route path = "/about">
                    <About />
                </Route>
                <Route path = "/anecdotes/:id">
                    <Anecdote anecdote = {anecdote} />
                </Route>
                <Route path = "/">
                    <AnecdoteList anecdotes = {anecdotes} />
                </Route>
            </Switch>

        </div>
    )
}

const Anecdote = (props) => {
    const {anecdote} = props
    return (
        <div>
            <h2> {anecdote.content} </h2>
            <p> Author: <strong> {anecdote.author} </strong> </p>
            <p> Votes given to this anecdote: {anecdote.votes} </p>
            <p> For more information, visit {anecdote.info} </p>
        </div>
    )
}

const AnecdoteList = ({anecdotes}) => (
    <div>
        <h2> Anecdotes </h2>
        <ul>
            {anecdotes.map(anecdote =>
                <li key = {anecdote.id}>
                    <Link to = {`/anecdotes/${anecdote.id}`}>
                        {anecdote.content}
                    </Link>
                </li>
            )}
        </ul>
    </div>
)

const About = () => (
    <div>
        <h2> About anecdote app </h2>
        <p> According to Wikipedia: </p>
        
        <em>
            An anecdote is a brief,
            revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter
            but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative.
            An anecdote is "a story with a point."
        </em>
        
        <p>
            Software engineering is full of excellent anecdotes,
            at this app you can find the best and add more.
        </p>
    </div>
)

const Footer = () => (
    <div>
        <br />
        Anecdote app for <a href="https://courses.helsinki.fi/fi/tkt21009">
            Full Stack -websovelluskehitys
        </a>.
        <br />
        See <a href="https://github.com/fullstack-hy2020/routed-anecdotes">
            https://github.com/fullstack-hy2019/routed-anecdotes
        </a> for the source code.
    </div>
)

const CreateNew = (props) => {
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const [info, setInfo] = useState("")
    const {addNewAnecdote} = props

    const handleSubmit = (event) => {
        event.preventDefault()
        addNewAnecdote({
            content,
            author,
            info,
            votes: 0
        })
    }

    return (
        <div>
            <h2> Create a new anecdote </h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    Content
                    <input
                        name = "content"
                        value = {content}
                        onChange = {(event) => setContent(event.target.value)}
                    />
                </div>
                <div>
                    Author
                    <input
                        name = "author"
                        value = {author}
                        onChange = {(event) => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    URL for more info
                    <input
                        name = "info"
                        value = {info}
                        onChange = {(event) => setInfo(event.target.value)}
                    />
                </div>
                <button> Create </button>
            </form>
        </div>
    )

}

const App = () => {
    //const [page, setPage] = useState("anecdoteList")
    
    const [anecdotes, setAnecdotes] = useState([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: 1
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: 2
        }
    ])
    
    //const [notification, setNotification] = useState("")

    const addNewAnecdote = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
    }
    /*
    const anecdoteById = (id) => (
        anecdotes.find(anecdote =>
            anecdote.id === id
        )
    )
    */
    /*
    const vote = (id) => {
        const anecdoteToVote = anecdoteById(id)
        const votedAnecdote = {
            ...anecdoteToVote,
            votes: anecdoteToVote.votes + 1
        }
        setAnecdotes(anecdotes.map(anecdote =>
            (anecdote.id === id)
                ? votedAnecdote
                : anecdote)
        )
    }
    */
    /*
    const goToPage = (page) => (event) => {
        event.preventDefault()
        setPage(page)
    }
    */
    /*
    const content = () => {
        if (page === "anecdoteList") {
            return <AnecdoteList anecdotes = {anecdotes} />
        } else if (page === "createNew") {
            return <CreateNew />
        } else {
            return <About />
        }
    }
    */
    
    const match = useRouteMatch("/anecdotes/:id")
    const anecdote = ((match)
        ? anecdotes.find(anecdote =>
            anecdote.id === Number(match.params.id)
        )
        : null
    )

    return (
        <div>
            <h1> Software anecdotes </h1>
            <Menu
                anecdotes = {anecdotes}
                addNewAnecdote = {addNewAnecdote}
                anecdote = {anecdote}
            />
            <Footer />
        </div>
    )
}

export default App
