import Card from 'react-bootstrap/Card'

function Weather(props){
return (
    <Card id='card'>
        <Card.Body>
            <Card.Title>{props.cityname} Day: {props.day}</Card.Title>
            <Card.Text>Latitude:{props.lat},Longitude:{props.lon}</Card.Text>
            <Card.Text>Low of {props.lowtemp}, and high of {props.hightemp} with {props.description}</Card.Text>
            <Card.Text>{props.date}</Card.Text>
        </Card.Body>
    </Card>
);
}
export default Weather