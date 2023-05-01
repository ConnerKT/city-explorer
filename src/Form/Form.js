import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';

function CityForm() {
   function handleSubmit(event){
    event.preventDefault();
    
   }
    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>City Name</Form.Label>
                <Form.Control type="text" placeholder="Type Here..."/>
                <Button variant="primary" type="submit">Explore!</Button>
            </Form.Group>
        </Form>
        </>
    )
   
}

export default CityForm