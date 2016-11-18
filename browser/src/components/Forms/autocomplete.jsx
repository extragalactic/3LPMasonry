import React from 'react';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';

const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

const fruit = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
  'Boysenberry', 'Blood Orange',
  'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
  'Coconut', 'Cranberry', 'Clementine',
  'Damson', 'Date', 'Dragonfruit', 'Durian',
  'Elderberry',
  'Feijoa', 'Fig',
  'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
  'Honeydew', 'Huckleberry',
  'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
  'Kiwi fruit', 'Kumquat',
  'Lemon', 'Lime', 'Loquat', 'Lychee',
  'Nectarine',
  'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
  'Olive', 'Orange',
  'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
  'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
  'Quince',
  'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
  'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
  'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
  'Ugli fruit',
  'Watermelon',
];

export default class AutoMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      autocompleteService: new google.maps.places.AutocompleteService()
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.searchText !== nextProps.searchText) {
      this.onUpdateInput(nextProps.searchText, this.state.dataSource);
      this.onInputChange(nextProps.searchText);
    }
  }

  updateDatasource(data) {
    if(!data || !data.length) {
      return false;
    }

    this.setState({
      dataSource: data.map(place => place.description),
      data
    });
  }

  onUpdateInput(searchText, dataSource) {
    if (!searchText.length || !this.state.autocompleteService) {
      return false;
    }
console.log(searchText)
    this.state.autocompleteService.getPlacePredictions({
      input: searchText,
      location: this.props.location || new google.maps.LatLng(0, 0),
      radius: this.props.radius || 0
    }, data => this.updateDatasource(data));
  }

  onNewRequest(searchText, index) {
    // The index in dataSource of the list item selected, or -1 if enter is pressed in the TextField
    if(index === -1) {
      return false;
    }

    this.props.onNewRequest(this.state.data[index], searchText, index);
  }

  onInputChange(searchText) {
      console.log(searchText)
    //this.props.onChange({target: {value: searchText}});
  }


   render(){
    return (
          <div>
          <Paper>
          <AutoComplete {...this.props}
                    ref={this.props.getRef}
                    filter={AutoComplete.noFilter}
                    onUpdateInput={this.onInputChange.bind(this)}
                    dataSource={this.state.dataSource}
                    onNewRequest={this.onNewRequest.bind(this)}/>
          </Paper>
          </div>
    )
  }
}

AutoMaps.propTypes = {
  location: React.PropTypes.object,
  radius: React.PropTypes.number,
  onNewRequest: React.PropTypes.func,
  getRef: React.PropTypes.func
};




