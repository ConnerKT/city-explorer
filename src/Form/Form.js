// Importing my main items I'm using in my Form
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { useState } from 'react';
import Weather from "../Weather";
import Error from "../Error";
import Movies from "../Movies";



// This is my function for the Form entirely
function CityForm() {
    // I'm making states for all of my data
    //This is my state for my input on my form
    const [search, setSearch] = useState('')
    // This is an object state that takes in the data I get from the html server
    const [state, setState] = useState({
        location:'',
        latitude:'',
        longitude:''
    });
    // This is an array state, so we can store our new data in it from our backend
    const [movieData, setMovieData] = useState([]);
    console.log(movieData)
    // This state sets the image state we get from the server for the map image
    const [image, setImage] = useState('');
    const [weather, setWeather] = useState([])
    
    // This is an async function that grabs from our key, with the search state, and formats it to json
    const getLocation = async () => {
        //I have a mechanism to handle errors in my code with 'try' and 'catch'
        //The try contains code that may have an exception that breaks
        try{
            //Grabs data from the server (We have the key in an .env which is accessed by the name and the process.env)
        let apiGet = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${search}&format=json`
            // stores that data in response
        let response = await axios.get(apiGet);

        //make a new request to my server 
        let apiServer = `http://localhost:3001/weather?searchQuery=${search}&format=json`
        let responseServer = await axios.get(apiServer)
        setWeather(responseServer.data)

        //we set the variable for the datas first obj, which is the first match for our query
        let searchLocation = response.data[0];
        // We set the states for all of our states, so the data can be contained
        setState({
            location: response.data[0].display_name,
            latitude: searchLocation.lat,
            longitude: searchLocation.lon,
        });
        // We are getting an image url from the server (We have the key in an .env which is accessed by the name and the process.env)
        let imageUrl =`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${searchLocation.lat},${searchLocation.lon}&format=jpg&zoom=15`
        //We are setting the image url into the sate
        setImage(imageUrl)
        // this is our exception for the errors, if there is any (404 etc)
    }catch(error){
        console.log("You ran into an error, try again later")
        // we set the state for location so we can have error to appear
        setState({
            location: "ERROR"
        })
        return( <Error/>
        )
    }
    }
    // This is my async function that grabs data from the URI to return the data to use
    const movieFunction = async () => {
        let movieApi = `https://city-explorer-api-vq9n.onrender.com/movies?movieQuery=${search}`
        let movieResponse = await axios.get(movieApi)
        setMovieData(movieResponse.data)
        
    }
    //This is our function to handle the submit , and run the function we have above, it also prevents the refresh
   function handleSubmit(event){
        event.preventDefault();
        getLocation();
        movieFunction();
        
   }
 // this is our return, which basically renders everything in our page
    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>City Name</Form.Label>
                {/* This is our onChange so we can set our state to the value we entered */}
                <Form.Control onChange={(event)=>{setSearch(event.target.value)}} type="text" placeholder="Type Here..."/>
                <Button variant="primary" type="submit">Explore!</Button>
            </Form.Group>
        </Form>
        {/* This is how we display all of our data with a card, which is a bootstrap comp. */}
        <Card id='card'>
            <Card.Body>
                <Card.Title>{state.location}</Card.Title>
                <Card.Text>{state.latitude}</Card.Text>
                <Card.Text>{state.longitude}</Card.Text>
                <Card.Img id='cardImg'src={image}></Card.Img>
            </Card.Body>
        </Card>
       {
        //This is my map function so I can render on my page my weather component
        weather.map(element => {
            return(
            <Weather
            cityname={element.cityname}
            day={element.day}
            lat={element.lat}
            lon={element.lon}
            lowtemp={element.lowtemp}
            hightemp={element.hightemp}
            description={element.description}
            date={element.date}
            ></Weather>
            )
        })
       }
       {
        // This is my map function so I can render my movie component 
        movieData.map(element => {
            return(
                <Movies
                title={element.title}
                overview={element.overview}
                poster_path={element.poster_path}
                release_date={element.release_date}
                >
                </Movies>
            )
        })
       }
        </>
       
    )
    
   
}

export default CityForm