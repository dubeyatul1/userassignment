import React, { Component } from 'react';
class FilterTableData extends Component {
    constructor(props){
        super(props);
        this.state = { 
            text: ''
         }
    }    
    getContent = (e) =>{
       this.setState({ text: e.target.value });
       this.props.callback(this.state.text);
    }
    render() { 
        return (  
            <div className="md-form">
                <input 
                    className="form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={this.state.text}
                    onChange={this.getContent.bind(this)}
                />
            </div>
         );
    }
}
 
export default FilterTableData; 