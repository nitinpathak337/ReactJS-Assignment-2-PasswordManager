import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'

class App extends Component {
  state = {
    passwordsList: [],
    username: '',
    website: '',
    password: '',
    isChecked: false,
    searchInput: '',
  }

  inputWebsite = event => {
    this.setState({website: event.target.value})
  }

  inputUsername = event => {
    this.setState({username: event.target.value})
  }

  inputPassword = event => {
    this.setState({password: event.target.value})
  }

  checked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  search = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(eachItem => eachItem.id !== id),
    })
  }

  addPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const randomNumber = Math.ceil(Math.random() * 5)
      const newPassword = {
        id: v4(),
        website,
        username,
        password,
        randomNumber,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        username: '',
        website: '',
        password: '',
      }))
    }
  }

  render() {
    const {
      passwordsList,
      username,
      website,
      password,
      isChecked,
      searchInput,
    } = this.state

    const filterList = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="input-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="app-manager-pic"
          />
          <form className="add-new-password-card">
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-field">
              <div className="input-image-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </div>
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.inputWebsite}
                value={website}
              />
            </div>
            <div className="input-field">
              <div className="input-image-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </div>
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.inputUsername}
                value={username}
              />
            </div>
            <div className="input-field">
              <div className="input-image-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </div>
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.inputPassword}
                value={password}
              />
            </div>

            <button
              type="submit"
              className="add-button"
              onClick={this.addPassword}
            >
              Add
            </button>
          </form>
        </div>
        <div className="card-2">
          <div className="password-count-search-container">
            <h1 className="your-password">Your Passwords</h1>
            <p className="password-count">{filterList.length}</p>

            <div className="search-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                type="search"
                className="search-input"
                onChange={this.search}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onChange={this.checked}
            />
            <label htmlFor="checkbox" className="label">
              Show Passwords
            </label>
          </div>
          <ul className="list-container">
            {filterList.length === 0 ? (
              <>
                <img
                  className="no-password-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                  alt="no passwords"
                />
                <p className="no-password-text">No Passwords</p>
              </>
            ) : (
              filterList.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  details={eachItem}
                  isChecked={isChecked}
                  deleteItem={this.deleteItem}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

const PasswordItem = props => {
  const {details, isChecked, deleteItem} = props
  const {id, username, website, password, randomNumber} = details

  const onDelete = () => {
    deleteItem(id)
  }

  return (
    <li className="list-item">
      <p className={`initials background-color-${randomNumber}`}>
        {website.slice(0, 1)}
      </p>
      <div className="details-container">
        <p className="para">{website}</p>
        <p className="para">{username}</p>
        {isChecked ? (
          <p className="para">{password}</p>
        ) : (
          <img
            className="star-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="delete-button"
        testid="delete"
      >
        <img
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default App
