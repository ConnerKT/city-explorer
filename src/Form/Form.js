import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';



function CityForm() {
    const [state, setState] = useState({
        searchQuery:'',
        location:{}
    });

    const getLocation = async () => {
    let apiGet = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${state.searchQuery}&format=json`
    let res = await axios.get(apiGet);
    console.log(res.data[0])
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
                <Form.Control value={setState.searchQuery} type="text" placeholder="Type Here..."/>
                <Button variant="primary" type="submit">Explore!</Button>
            </Form.Group>
        </Form>
        </>
    )
   
}

export default CityForm