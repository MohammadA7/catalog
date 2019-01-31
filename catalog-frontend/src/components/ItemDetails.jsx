import React, { Component } from 'react'
import { InputGroup, FormGroup, Button } from '@blueprintjs/core'
import { AppToaster } from './'
import axios from 'axios'

class ItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMounted: false,
      item: {
        name: '',
        description: '',
        price: '',
        rating: '',
        image_path: '',
        category_name: ''
      }
    }
    this.submitItem = this.submitItem.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)

  }

  componentDidMount() {
    this.setState({ isMounted: true })
    if (this.props.editingMode) {
      this.getContent(this.props.selectedCategory, this.props.selectedItem)
        .then((response => {
          if (this.state.isMounted) {
            const { name,
              description,
              price,
              rating,
              image_path,
              category_name } = response.data
            this.setState({
              item: {
                name,
                description,
                price,
                rating,
                image_path,
                category_name
              }
            })
          }
        }
        ))
        .catch(error => {
          if (error.response.data)
            AppToaster.show({
              message: error.response.data,
              intent: 'danger',
              icon: 'error'
            })
        })
    } else {

    }
  }

  componentWillMount() {
    this.setState({ isMounted: false })
  }

  getContent(selectedCategory, selectedItem) {
    let URL = `http://${process.env.REACT_APP_BACK_END_IP}/catalog/${selectedCategory}/${selectedItem}/`
    return axios.get(URL)
  }

  onFieldChange(event) {
    const { name, value } = event.target
    this.setState(prevState => ({
      item: {
        ...prevState.item, [name]: value
      }
    }))
  }
  submitItem() {
    const { selectedCategory, selectedItem, editingMode, token } = this.props
    const { name,
      description,
      price,
      rating,
      image_path } = this.state.item
    const path = editingMode ? `/${selectedCategory}/${selectedItem}/` : `/${selectedCategory}/create/`
    const URL = `http://${process.env.REACT_APP_BACK_END_IP}/catalog${path}`
    const data = {
      name,
      description,
      price,
      rating,
      image_path
    }
     const config = {
      method: 'POST',
      data: JSON.stringify(data),
      auth: {
        username: token,
        password: ''
      },
    }
    
    axios.post(URL, data, config)
      .then(response => {
        console.log(response)
        AppToaster.show({
          message: response.data ? response.data.data : '',
          intent: response.data ? 'success' : 'danger',
          icon: response.data ? 'tick' : 'error'
        })
      })
      .catch(error => {
        console.log(error)
        AppToaster.show({
          message: error.response.data.data ? error.response.data.data : error.message,
          intent: 'danger',
          icon: 'error'
        })
      })
  }

  render() {
    const { name, description, rating, price, image_path, category_name } = this.state.item

    const { editingMode, selectedCategoryName } = this.props
    return (
      <div style={{
        flex: '100%', display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: '3%'
      }}>
        <div
          style={{ flex: '0.35' }}
        >
          <h2 style={{ justifySelf: 'flex-start' }}>{editingMode ? "Edit Item" : "Create Item"}</h2>
          <FormGroup
            label="Name"
            labelFor="name-input"
            inline
            large
            style={formGroupStyle}
          >
            <InputGroup name="name" id="name-input" large placeholder="Name"
              onChange={this.onFieldChange} value={name ? name : ''} />
          </FormGroup>

          <FormGroup
            style={formGroupStyle}
            label="Description"
            inline
            large
            labelFor="description-input"  >
            <InputGroup name="description" id="description-input" large placeholder="Description"
              onChange={this.onFieldChange} value={description ? description : ''} />
          </FormGroup>
          <FormGroup
            style={formGroupStyle}
            label="Rating"
            labelFor="rating-input"
            inline
            large
          >
            <InputGroup name="rating" id="rating-input" large placeholder="Rating"
              onChange={this.onFieldChange} value={rating ? rating : ''} leftIcon='star' />
          </FormGroup>
          <FormGroup
            style={formGroupStyle}
            label="Price"
            labelFor="rating-input"
            inline
            large
          >
            <InputGroup name="price" id="price-input" large
              placeholder="Price" onChange={this.onFieldChange} value={price ? price : ''} leftIcon='dollar' />
          </FormGroup>
          <FormGroup
            style={formGroupStyle}
            large
            label="Image"
            labelFor="image-input"
            inline
          >
            <InputGroup name="image_path" id="image-input" large placeholder="Image URL"
              onChange={this.onFieldChange} value={image_path ? image_path : ''} leftIcon='media' />
          </FormGroup>
          <FormGroup
            style={formGroupStyle}
            label="Category"
            labelFor="category-input"
            inline
            large
          >
            <InputGroup name="category_name" id="category-input" onChange={this.onFieldChange}
              large disabled={editingMode} value={editingMode ? category_name : selectedCategoryName } placeholder="Category" leftIcon='menu' />
          </FormGroup>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button large intent="primary" onClick={this.submitItem}>Submit</Button>
          </div>
        </div>

      </div>
    )
  }
}

let formGroupStyle = { display: 'flex', justifyContent: 'space-between' }

export { ItemDetails }
