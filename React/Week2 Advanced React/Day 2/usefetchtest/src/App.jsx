import { useState } from 'react';
import useFetch from './useFetch';
import './App.css'

function App() {
 
  const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

  const [index, setIndex] = useState(0);

  const { loading, data: post, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  );

  const incrementIndex = () => {
    setIndex((i) => (i === postIds.length - 1 ? i : i + 1));
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </Fragment>
    );
  }
  return (
    <div className="App">
    <h1>{post.title}</h1>
    <p>{post.body}</p>
    {error && <p>{error}</p>}
    {index === postIds.length - 1 ? (
      <p>No more posts</p>
    ) : (
      <button onClick={incrementIndex}>Next Post</button>
    )}
  </div>
  )
}

export default App
