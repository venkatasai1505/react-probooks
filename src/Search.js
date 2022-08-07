import React from 'react';
import { Link } from 'react-router-dom'
import './App.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: JSON.parse(localStorage.getItem("totalbooks")) === null ? [] : JSON.parse(localStorage.getItem("totalbooks")),
            likebooks: JSON.parse(localStorage.getItem("likebooks")) === null ? [] : JSON.parse(localStorage.getItem("likebooks")),
            dislikebooks: JSON.parse(localStorage.getItem("dislikebooks")) === null ? [] : JSON.parse(localStorage.getItem("dislikebooks")),
            readingbooks: JSON.parse(localStorage.getItem("readingbooks")) === null ? [] : JSON.parse(localStorage.getItem("readingbooks")),
            searchTerm: ""
        }
    }


    modifyBook(to, element) {
        for (let i of this.state.likebooks) {
            if (i.title === element.title) {
                this.changeStatus(to, element, "like")
                break
            }
        }

        for (let i of this.state.dislikebooks) {
            if (i.title === element.title) {
                this.changeStatus(to, element, "dislike")
                break
            }
        }

        for (let i of this.state.readingbooks) {
            if (i.title === element.title) {
                this.changeStatus(to, element, "reading")
                break
            }
        }
    }


    changeStatus(to, ele, from) {        
        if (from === to)
        return;
        
        switch (from) {
            case ("like"): this.setState({ likebooks: this.state.likebooks.filter(e => e.title !== ele.title) })
            break;
            case ("dislike"): this.setState({ dislikebooks: this.state.dislikebooks.filter(e => e.title !== ele.title) })
            break;
            case ("reading"): this.setState({ readingbooks: this.state.readingbooks.filter(e => e.title !== ele.title) })
            break;
            default: break;
        }

        switch (to) {
            case ("like"): this.setState(prevState => ({ likebooks: [...prevState.likebooks, ele] }))
            break;
            case ("dislike"): this.setState(prevState => ({ dislikebooks: [...prevState.dislikebooks, ele] }))
            break;
            case ("reading"): this.setState(prevState => ({ readingbooks: [...prevState.readingbooks, ele] }))
            break;
            default: break;
        }

    }
    
    DynamicSearch = (str) => {
        return this.state.books.filter(ele => ele.title.toLowerCase().includes(str.toLowerCase()) || ele.authors[0].toLowerCase().includes(str.toLowerCase()))
    }
    
    render() {
        localStorage.setItem("likebooks", JSON.stringify(this.state.likebooks))
        localStorage.setItem("dislikebooks", JSON.stringify(this.state.dislikebooks))
        localStorage.setItem("readingbooks", JSON.stringify(this.state.readingbooks))
        
        let found = []
        found = this.DynamicSearch(this.state.searchTerm)
        
        return <div className='wholePage'>
            <input type="text" className="searchInput" placeholder="Search books" onChange={(e) => { this.setState({ searchTerm: e.target.value }) }} />
            <h2>Results</h2>
            <div className='parentResults'>
                {found.length===0 ? <div className='noResult'>No results found.</div> : found.map((e) => {
                    return <div className='bookCard'>
                        <div><img src={e.imageLinks.thumbnail} alt=""></img></div>
                        <div>{e.title}</div>
                        <div className='author'>{e.authors[0]}</div>

                        <div>
                            <select onChange={(event) => this.modifyBook(event.target.value, e)} value="none">
                                <option value="none" disabled={true}>▼</option>
                                <option value="like" className='hide'>👍</option>
                                <option value="dislike" className='hide'>👎</option>
                                <option value="reading" className='hide'>📖</option>
                            </select>
                        </div>
                    </div>

                })
                }
            </div >

            <Link to="/"><button className='button'>&#60;</button></Link>
        </div >
    }
}
export default Search;