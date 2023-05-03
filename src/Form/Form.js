import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { useState } from 'react';




function CityForm() {
    const [search, setSearch] = useState('')
    const [state, setState] = useState({
        location:'',
        latitude:'',
        longitude:''
    });
    const getLocation = async () => {
        let apiGet = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${search}&format=json`
        let response = await axios.get(apiGet);
        let searchLocation = response.data[0];
        setState({
            location: response.data[0].display_name,
            latitude: searchLocation.lat,
            longitude: searchLocation.lon
        });
    }

   function handleSubmit(event){
        event.preventDefault();
        getLocation();
    

   }
    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>City Name</Form.Label>
                <Form.Control onChange={(event)=>{setSearch(event.target.value)}} type="text" placeholder="Type Here..."/>
                <Button variant="primary" type="submit">Explore!</Button>
            </Form.Group>
        </Form>
        <Card>
            <Card.Img src=''></Card.Img>
            <Card.Body>
                <Card.Title>{state.location}</Card.Title>
                <Card.Text>{state.latitude}</Card.Text>
                <Card.Text>{state.longitude}</Card.Text>
            </Card.Body>
        </Card>
        </>
       
    )
   
}

export default CityForm