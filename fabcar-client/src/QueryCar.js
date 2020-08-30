import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

export default class AllCars extends React.Component {
    constructor() {
        super();
        this.state = {
            adminno: '',
            cars: []
        }
    }
      onAdminnoChanged(e) { 
	this.setState({ adminno: e.target.value }) 
	}
	
	createAndDownloadPdf = () => {
	alert("done")
    	axios.post('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
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

	handleSubmit(event){
		event.preventDefault();
		this.setState({ adminno: event.target.value }) 
	}

    render() {
        const tbody = this.state.cars.map(car => {
	    if(this.state.adminno === car.Record.adminno)
	    {
            return <tr key={car.Key}>
                <td>{car.Record.subject}</td>
                <td>{car.Record.mark}</td>
               
            </tr>
	    }
        })
        return (
            <div>
                <h4>Mark List</h4>
		<form onSubmit={this.handleSubmit.bind(this)}>
		<div className="row">
                            <div className="input-field col s4">
                                <input id="key" type="text" className="validate" required value={this.state.adminno} onChange={this.onAdminnoChanged.bind(this)} />
                                <label htmlFor="key">Admission No.</label>
				
                            </div>
                </div>
		<div>
			<button onClick={this.createAndDownloadPdf}>Download PDF</button>
		</div>
 		
		</form>
                <table className='striped responsive-table centered'>
                    <thead>
                        <tr>
                            <th>Subject Code</th>
                            <th>Mark</th>
                            
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
