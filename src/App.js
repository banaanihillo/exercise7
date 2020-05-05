import React, {useState} from "react"
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"

const Menu = (props) => {
    const {anecdotes, addNewAnecdote} = props
    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <BrowserRouter>
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
                    <Route path = "/">
                        <AnecdoteList anecdotes = {anecdotes} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

const AnecdoteList = ({anecdotes}) => (
    <div>
        <h2> Anecdotes </h2>
        <ul>
            {anecdotes.map(anecdote =>
                <li key = {anecdote.id}>
                    {anecdote.content}
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
        Anecdote app for <a href="https://courses.helsinki.fi/fi/tkt21009">
            Full Stack -websovelluskehitys
        </a>.
        <br />
        See <a
        href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
            https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
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
    const [page, setPage] = useState("anecdoteList")
    console.log(page)
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
    
    const [notification, setNotification] = useState("")
    console.log(notification, setNotification)
    
    const addNewAnecdote = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
    }
    
    const anecdoteById = (id) => (
        anecdotes.find(anecdote =>
            anecdote.id === id
        )
    )
    
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
    console.log(vote)

    const goToPage = (page) => (event) => {
        event.preventDefault()
        setPage(page)
    }
    console.log(goToPage)

    const content = () => {
        if (page === "anecdoteList") {
            return <AnecdoteList anecdotes = {anecdotes} />
        } else if (page === "createNew") {
            return <CreateNew />
        } else {
            return <About />
        }
    }
    console.log(content)

    return (
        <div>
            <h1> Software anecdotes </h1>
            <Menu anecdotes = {anecdotes} addNewAnecdote = {addNewAnecdote} />
            <Footer />
        </div>
    )
}

export default App
