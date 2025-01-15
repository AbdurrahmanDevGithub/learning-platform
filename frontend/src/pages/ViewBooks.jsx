
import axios from 'axios'
import React, { useState } from 'react'

const ViewBooks = () => {

  const [data, setData] = useState('')
  const [responseData, setResponseData] = useState([])

  const handleChange = (e) => {
    try {
      setData(e.target.value)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios(`https://openlibrary.org/search.json?title=${encodeURIComponent(data)}`)
      console.log(response.data.docs);
      setResponseData(response.data.docs)
    } catch (error) {
      console.log(error);
    }
  }

  const handleViewMore = (bookKey) => {
    // Open the book detail page in a new tab using its Open Library key
    const url = `https://openlibrary.org${bookKey}`;
    window.open(url, '_blank');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input type='text' value={data} onChange={handleChange} />
        <button type='submit'>Search</button>
      </form>

      <br />

      {responseData.map((book) => (
        <div key={book.key}>
          <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
          <p>First Published: {book.first_publish_year || 'Unknown Year'}</p>
          <p>Language: {book.language ? book.language.join(', ') : 'Unknown Language'}</p>
          <button onClick={() => handleViewMore(book.key)}>View More About</button>
          <br />
        </div>
      ))}
    </div>
  )
}

export default ViewBooks;
