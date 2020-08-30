import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
var someVarName = "E1";
localStorage.setItem("someVarKey", someVarName);



export default class AddCar extends React.Component {
    constructor() {
        super();
        this.state = {
            key: '',
            adminno: '',
            subject: '',
	    mark: '',
            redirect: false
        }
    }


    //onKeyChanged(e) { this.setState({ key: localStorage.getItem("someVarKey")  }) }
    onMakeChanged(e) { this.setState({ adminno: e.target.value }) }
    onModelChanged(e) { this.setState({ subject: e.target.value }) }
    onColorChanged(e) { this.setState({ mark: e.target.value }) }
   

    onFormSubmit(e) {
        e.preventDefault();
        this.props.setLoading(true);
        axios.post('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/cars', {
            key: localStorage.getItem("someVarKey"),
            adminno: this.state.adminno,
            subject: this.state.subject,
            mark: this.state.mark
        }).then(res => {
            this.props.setLoading(false);
            if (res.data.status) {
		var some = localStorage.getItem("someVarKey");
		alert("Mark entered successfully with Key: "+some)
		var res=some.slice(1,);
		var psome=parseInt(res,10);
		psome++;
		var res1=psome.toString();
		some = some.slice(0,1)+res1;
		localStorage.setItem("someVarKey", some);
                this.setState({redirect: true})
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            this.props.setLoading(false);
            alert('Something went wrong')
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <h4>Add Student</h4>
                <div className="row">
                    <form className="col s12" onSubmit={this.onFormSubmit.bind(this)}>

                        <div className="row">
                            <div className="input-field col s4">
                                <input id="make" type="text" className="validate" required value={this.state.adminno} onChange={this.onMakeChanged.bind(this)} />
                                <label htmlFor="make">False No</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="model" type="text" className="validate" required value={this.state.subject} onChange={this.onModelChanged.bind(this)} />
                                <label htmlFor="model">Subject Code</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="subject" type="text" className="validate" required value={this.state.mark} onChange={this.onColorChanged.bind(this)} />
                                <label htmlFor="subject">Subject Mark</label>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className="input-field col s12">
                                <button className="btn waves-effect waves-light light-blue darken-3" type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
