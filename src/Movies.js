import React from 'react'
import Card from 'react-bootstrap/Card'
function Movies(props) {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}/>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
        {props.overview}
        Released on:{props.release_date}
      </Card.Text>
    </Card.Body>
  </Card>
);
}
 

export default Movies
