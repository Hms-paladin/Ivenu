import React from "react";
import "./ProfileSearch.css";
import { MdSearch, MdClose} from "react-icons/md";

class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      conversation: []
    };
  }

  handleChange = e => {
    var searchString = e.target.value.trim().toLowerCase();
    this.setState({
      searchString:searchString
    });
      this.props.onSearch(searchString)
  };
  render() {
    return (
      <div className="web_conversation-search">
        <div className="web_profile-search-icon">
          <MdSearch className="web_search-icon" />
        </div>
        <input
          type="search"
          className="web_conversation-search-input"
          placeholder="Search"
          onChange={this.handleChange} 
          value={this.state.searchString}
        /> 

        <div className="web_profile-search-icon">
          <MdClose className="web_search-icon" onClick={()=>{
            this.setState({
              searchString:''
            })
            this.props.clear()
          }} />
        </div>
        
      </div>
    );
  }
}
export default ProfileSearch;
