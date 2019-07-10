import React from 'react';
import ReactDOM from 'react-dom';
import navCats from '../../navCats.json'
import Departments from './components/Departments.jsx'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      allTitles: [],
      idDict: {}
    }
  }

  handleItems(items) {
    const titleArr = [];
    const titleDict = {};
    for(let element of items) {
      titleDict[element.title] = element.listing_id;
      titleArr.push(element.title);
    }
    // console.log(titleArr);
    // console.log(titleDict);
    this.setState({allTitles: titleArr, idDict: titleDict});
  }

  componentDidMount() {
    axios.get('http://localhost:3000/search')
      .then((result) => {
        console.log(result.data);
        this.handleItems(result.data);
      })
      .catch((err) => {
        console.log('Error loading items on mount')
      })
  }

  render() {
    console.log(navCats)
    return (
      <>
        <Navbar bg="light" expand="sm" className="align-items-center">
          <Navbar.Brand href="#home">RegrEtsy</Navbar.Brand>
          <Form inline>
            <InputGroup >
              {/* <Typeahead
                labelKey="name"
                options={["options", "Texxas"]}
                placeholder="Choose a state..."
              /> */}
              <Typeahead
                placeholder="Search for items or shops"
                aria-label="Search for items or shops"
                aria-describedby="basic-addon2"
                labelKey="name"
                options={this.state.allTitles}
              />
              <InputGroup.Append>
                {/* &#x1F50E; is another magnifying glass option*/}
                <Button variant="outline-secondary" className="searchBtn">&#8981;</Button>

              </InputGroup.Append>
            </InputGroup>
          </Form>
          <Nav className="justify-content-end" style={{ width: "50%" }}>
            <Nav.Link>Sell on Etsy</Nav.Link>
            <Nav.Link>Register</Nav.Link>
            <Button variant="outline-success">Sign In</Button>
          </Nav>
        </Navbar>
        <Navbar bg="light">
          <Departments departments={navCats.departments} />
        </Navbar>
      </>
      // <div>
      //   <Departments departments={navCats.departments} />
      // </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('header'));