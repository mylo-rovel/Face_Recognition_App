import React, {Component} from 'react';
import Particles from 'react-particles-js';
import {Navigation, 
		Logo, 
		ImageLinkForm, 
		Rank, 
		FaceRecognition,
		SignIn,
		Register,
	} from './Imports';
import './App.css';

const particlesOptions = {
particles: {
	number: {
		value:40,
		density: {
			enable:true,
			value_area: 800
		}
	}
}
}

const initialState = {
			input:'',
			imageURL:'',
			boxes: [],
			route: 'signin',
			isSignedIn: false,
			user: {
				id:'',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}


class App extends Component {
	constructor(){
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
    	this.setState(
			Object.assign(this.state.user, 
				{
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
				}
			))		
	}

	calculateArrayOfFacesBox = (dataReceived) =>{
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);

		const arrayOfLocs = 
			dataReceived.outputs[0].data.regions.map(region =>{
				let currentRegion = region.region_info.bounding_box;
				return {
					leftCol: currentRegion.left_col * width,
					topRow: currentRegion.top_row *height,
					rightCol: width - (currentRegion.right_col * width),
					bottomRow: height - (currentRegion.bottom_row * height)
				}
			})
		return arrayOfLocs;
	}


	displayFaceBoxes = (faceBoxObjectArray) => {
		this.setState({boxes: faceBoxObjectArray});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value})
	}

	onButtonSubmit = (event) => {
		event.preventDefault();
		this.setState({imageURL: this.state.input})
		fetch('https://arcane-cliffs-73572.herokuapp.com/imageurl', {
	      method: 'post',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify({
	        imageurl: this.state.input
	      })
	    })
	    .then(res => res.json())
		.then(response => {
			// console.log(response, 'respuesta recibida')
			if(response){
			    // i want to increase the amount of entries
			    // by sending a request to the backend
			    // im telling that i entered an image
			    fetch('https://arcane-cliffs-73572.herokuapp.com/image', {
			      method: 'put',
			      headers: {'Content-Type': 'application/json'},
			      body: JSON.stringify({
			        id: this.state.user.id
			      })
			    })
			    // the response is transformed to json
			    .then(res => res.json())
			    // then i reassign the value of entries
			    .then(count => {
			    	// console.log(count)
			    	this.setState(
			    		Object.assign(this.state.user, {entries: count})
			    		)
			    	// console.log(this.state)
			    })
			}
			this.displayFaceBoxes(this.calculateArrayOfFacesBox(response))
		})
		.catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		if (route === 'signout'){
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({route: route});
	}

	render(){
	const staticParts = (
		<div>
			<Particles className='particles' params={particlesOptions}/>
	    	<Navigation onRouteChange={this.onRouteChange} 
	    		isSignedIn = {this.state.isSignedIn}/>
	    </div>
	)
	return (
	    <div className="App">
	    	{staticParts}

	    	{ this.state.route === 'home'
	    		? <div>
					<Logo />
					<Rank 
						userName={this.state.user.name}
						userEntries={this.state.user.entries}
						/>
			    	<ImageLinkForm 
			    		onInputChange = {this.onInputChange}
			    		onButtonSubmit = {this.onButtonSubmit}
			    	/> 
			    	<FaceRecognition 
			    		boxes={this.state.boxes} 
			    		imageURL={this.state.imageURL}
			    	/>
			      </div>
	    		: ( this.state.route === 'signin'
	    			? <SignIn 
	    						loadUser={this.loadUser}
	    						onRouteChange={this.onRouteChange}/>
	    			: <Register 
	    						loadUser={this.loadUser}
	    						onRouteChange={this.onRouteChange}/>
	    		  )
		    }

	    </div>
	  );
	 }
}

export default App;
