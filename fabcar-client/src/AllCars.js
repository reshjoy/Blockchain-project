import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
var keylist = [];

export default class AllCars extends React.Component {
    constructor() {
        super();
        this.state = {
            cars: []
        }
    }
	
	handleClick(e,id)  {
		if(keylist.includes(id)){
		alert("No more edits")	
		e.preventDefault();
		//this.props.setLoading(true);
		}
		keylist.push(id);
		
	}
	  


    componentDidMount() {
        this.props.setLoading(true);
        axios.get('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/cars').then(res => {
            this.props.setLoading(false);
            if(res.data.status) {
                this.setState({cars: res.data.cars})
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            this.props.setLoading(false);
            alert('Something went wrong')
        })
    }

    render() {
        const tbody = this.state.cars.map(car => {
            return <tr key={car.Key}>
		
		
                <td>{car.Key}</td>
                <td>{car.Record.adminno}</td>
                <td>{car.Record.subject}</td>
                <td>{car.Record.mark}</td>
                <td>
                    <Link to={'/change-owner/' + car.Key} onClick={ e => this.handleClick(e,car.Key)}  className="waves-effect waves-light btn light-blue darken-3"><i className="material-icons">edit</i></Link>
                </td>

            </tr>


        })
        return (
            <div>
                <h4>All Students</h4>
                <table className='striped responsive-table centered'>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Admino</th>
                            <th>Subject Code</th>
                            <th>Mark</th>
                            <th style={{width: 100}}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </div>
        )
    }
}
