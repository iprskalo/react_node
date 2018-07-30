class ContactsDashboard extends React.Component {
    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableContactList />
                    <ToggleableContactForm
                        isOpen={false}
                    />
                </div>
            </div>
        );
    }
}

class ToggleableContactForm extends React.Component {
    render() {
        if (this.props.isOpen) {
            return (
                <ContactForm />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button className='ui icon button'>
                        <i className='plus icon' />
                    </button>
                </div>
            );
        }
    }
}

class EditableContactList extends React.Component {
    render() {
        return (
            <div id='contacts'>
                <EditableContact
                    name='Learn React'
                    address='Web Domination'
                    date='2018-18-10'
                    mail='blablalba@gmail.com'
                    cellphone='123312123'
                    image='123312'
                    editFormOpen={false}
                />
                <EditableContact
                    name='Dont React'
                    address='Dont Domination'
                    date='8986300'
                    mail='1213'
                    cellphone='123312123'
                    image='123312'
                    editFormOpen={true}
                />
            </div>
        );
    }
}

class EditableContact extends React.Component {
    render() {
        if (this.props.editFormOpen) {
            return (
                <ContactForm
                    name={this.props.name}
                    address={this.props.address}
                    date={this.props.date}
                    mail={this.props.mail}
                    cellphone={this.props.cellphone}

                />
            );
        } else {
            return (
                <Contact
                    name={this.props.name}
                    address={this.props.address}
                    date={this.props.date}
                    mail={this.props.mail}
                    cellphone={this.props.cellphone}
                />
            );
        }
    }
}

class Contact extends React.Component {
    render() {
        const elapsedString = helpers.renderElapsedString(this.props.elapsed);
        return (

            <div className="ui items">
                <div className="item">
                    <div className="image">
                        <img src="/images/daniel.jpg" />
                    </div>
                    <div className="content">
                        <a className="header">{this.props.name}</a>
                        <div className="description">
                            <span>{this.props.address}</span>
                        </div>
                        <div className="description">
                            <span>{this.props.mail}</span>
                        </div>
                        <div className="description">
                            <span>{this.props.date}</span>
                        </div>
                        <div className="description">
                            <span>{this.props.cellphone}</span>
                        </div>
                        <div className="description">
                            <p></p>
                        </div>
                        <div className="extra">
                            B'day in:
      </div>
                    </div>
                    <div className='extra content'>
                        <span className='right floated edit icon'>
                            <i className='edit icon' />
                        </span>
                        <span className='right floated trash icon'>
                            <i className='trash icon' />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

class ContactForm extends React.Component {
    render() {
        const submitText = this.props.name ? 'Update' : 'Create';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Name</label>
                            <input type='text' defaultValue={this.props.name} />
                        </div>
                        <div className='field'>
                            <label>Address</label>
                            <input type='text' defaultValue={this.props.address} />
                        </div>
                        <div className='field'>
                            <label>Mail</label>
                            <input type='text' defaultValue={this.props.mail} />
                        </div>
                        <div className='field'>
                            <label>Date</label>
                            <input type='text' defaultValue={this.props.date} />
                        </div>
                        <div className='field'>
                            <label>Cellphone</label>
                            <input type='text' defaultValue={this.props.cellphone} />
                        </div>
                        <div className='field'>
                            <label>Image</label>
                            <input type='text' defaultValue={this.props.image} />
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button className='ui basic blue button'>
                                {submitText}
                            </button>
                            <button className='ui basic red button'>
                                Cancel
                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ContactsDashboard />,
    document.getElementById('content')
);
