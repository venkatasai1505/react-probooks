import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      likebooks: JSON.parse(localStorage.getItem("likebooks")) === null ? [] : JSON.parse(localStorage.getItem("likebooks")),
      dislikebooks: JSON.parse(localStorage.getItem("dislikebooks")) === null ? [] : JSON.parse(localStorage.getItem("dislikebooks")),
      readingbooks: JSON.parse(localStorage.getItem("readingbooks")) === null ? [] : JSON.parse(localStorage.getItem("readingbooks"))
    }
    this.getAndSetData()
  }

  changeStatus(to, ele, from) {

    if (from === to)
      return;

    switch (from) {
      case ("like"): this.setState({
        likebooks: this.state.likebooks.filter(e => e.title !== ele.title)
      })
        break;
      case ("dislike"): this.setState({
        dislikebooks: this.state.dislikebooks.filter(e => e.title !== ele.title)
      })
        break;
      case ("reading"): this.setState({
        readingbooks: this.state.readingbooks.filter(e => e.title !== ele.title)
      })
      break;
      case ("delete"): this.setState({
        deletebooks: this.state.deletebooks.filter(e => e.title !== ele.title)
      })
        break;
      default: break;
    }

    switch (to) {
      case ("like"): this.setState(prevState => ({
        likebooks: [...prevState.likebooks, ele]
      }))
        break;
      case ("dislike"): this.setState(prevState => ({
        dislikebooks: [...prevState.dislikebooks, ele]
      }))
        break;
      case ("reading"): this.setState(prevState => ({
        readingbooks: [...prevState.readingbooks, ele]
      }))
        break;
      default: break;
    }
  }

  putDefaultData(res) {
    this.setState({
      books: res.data.books,
      readingbooks: JSON.parse(localStorage.getItem("readingbooks")).length === 0 ? res.data.books : JSON.parse(localStorage.getItem("readingbooks"))
    })
    localStorage.setItem("totalbooks", JSON.stringify(res.data.books))
  }

  getAndSetData() {
    Axios({
      method: 'get',
      url: "https://reactnd-books-api.udacity.com/books",
      // responseType: 'stream',
      headers: {
        'Accept': 'application/json',
        'Authorization': "testset"
      }
    })
      .then(result => this.putDefaultData(result))
      .catch(() => { document.querySelector(".wholePage").innerText = "Error. Could not fetch." })
  }




  render() {
    localStorage.setItem("likebooks", JSON.stringify(this.state.likebooks))
    localStorage.setItem("dislikebooks", JSON.stringify(this.state.dislikebooks))
    localStorage.setItem("readingbooks", JSON.stringify(this.state.readingbooks))
    return <div className='wholePage'>
      <h2>Reading</h2>
      <div className='parentReading'>
        {this.state.readingbooks.map((e) => {
          return <div className='bookCard'>
            <div><img src={e.imageLinks.thumbnail} alt=""></img></div>
            <div>{e.title}</div>
            <div className='author'>{e.authors[0]}</div>

            <div>
              <select onChange={(event) => this.changeStatus(event.target.value, e, "reading")} value="none">
                <option value="none" disabled={true}>▼</option>
                <option value="like" className='hide'>👍</option>
                <option value="dislike" className='hide'>👎</option>
              </select>
            </div>
          </div>

        })
        }
      </div >

      <h2>Like</h2>
      <div className='parentLike'>
        {this.state.likebooks.map((e) => {
          return <div className='bookCard'>
            <div><img src={e.imageLinks.thumbnail} alt=""></img></div>
            <div>{e.title}</div>
            <div className='author'>{e.authors[0]}</div>

            <div>
              <select onChange={(event) => this.changeStatus(event.target.value, e, "like")} value="none">
                <option value="none" disabled={true}>▼</option>
                <option value="dislike" className='hide'>👎</option>
                <option value="reading" className='hide'>📖</option>
              </select>
            </div>
          </div>

        })
        }
      </div >

      <h2>Dislike</h2>
      <div className='parentDislike'>
        {this.state.dislikebooks.map((e) => {
          return <div className='bookCard'>
            <div><img src={e.imageLinks.thumbnail} alt=""></img></div>
            <div>{e.title}</div>
            <div className='author'>{e.authors[0]}</div>

            <div>
              <select onChange={(event) => this.changeStatus(event.target.value, e, "dislike")} value="none">
                <option value="none" disabled={true}>▼</option>
                <option value="like" className='hide'>👍</option>
                <option value="reading" className='hide'>📖</option>
              </select>
            </div>
          </div>

        })
        }
      </div >
      <Link to="/search"><button className='button'>🔍</button></Link>
    </div >
  }
}
export default App;