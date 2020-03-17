import React from 'react';

class SearchBar extends React.Component {
    //Initialize state
    state={term:''};
    // Update state when input is onChange
    InputChange = (e)=>{
    // use event object's target propety which returns the element that triggered the event
    // to get the <input> element and set its value
    this.setState({term:e.target.value});
    }
    formSubmit =(e)=>{
        e.preventDefault(); // prevent default refresh when hit enter
        this.props.onFormSubmit(this.state.term); // tell parent App the search term through onFormSubmit prop call back function. 
    }

    render(){
        return (
        <div className="ui segment search-bar">
            <form onSubmit={this.formSubmit} className="ui form">
                <div className="field">
                    <label>Video Search</label>
                    {/* let state control the input value */}
                    <input type="text" onChange={this.InputChange} value={this.state.term}/>
                </div>
            </form>
        </div>);
    }
}

export default SearchBar;