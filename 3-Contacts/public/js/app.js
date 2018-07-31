class ContactsDashboard extends React.Component {
    state = {
        contacts: [],
    };

    handleEditFormSubmit = (attrs) => {
        this.updateContact(attrs);
    };

    handleCreateFormSubmit = (contact) => {
        this.createContact(contact);
    };

    handleTrashClick = (contactId) => {
        this.deleteContact(contactId);
    };

    newContact = (attrs) => {
        const contact = {
            name: attrs.name || 'Name',
            address: attrs.address || 'Address',
            date: attrs.date || 'Date',
            mail: attrs.mail || 'Mail',
            cellphone: attrs.cellphone || 'Cellphone',
            image: attrs.image || 'Image',
            id: uuid.v4(),
        };

        return contact;
    }


    createContact = (contact) => {
        const c = this.newContact(contact);
        this.setState({
            contacts: this.state.contacts.concat(c),
        });
    };

    updateContact = (attrs) => {
        this.setState({
            contacts: this.state.contacts.map((contact) => {
                if (contact.id === attrs.id) {
                    return Object.assign({}, contact, {
                        name: attrs.name,
                        address: attrs.address,
                        mail: attrs.mail,
                        date: attrs.date,
                        cellphone: attrs.cellphone,
                        image: attrs.image,
                    });
                } else {
                    return contact;
                }
            }),
        });
    };

    deleteContact = (contactId) => {
        this.setState({
            contacts: this.state.contacts.filter(c => c.id !== contactId),
        });
    }

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableContactList
                        contacts={this.state.contacts}
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                    />
                    <ToggleableContactForm
                        onFormSubmit={this.handleCreateFormSubmit}
                    />
                </div>
            </div>
        );
    }
}

class ToggleableContactForm extends React.Component {
    state = {
        isOpen: false,
    };

    handleFormOpen = () => {
        this.setState({ isOpen: true });
    };

    handleFormClose = () => {
        this.setState({ isOpen: false });
    };

    handleFormSubmit = (contact) => {
        this.props.onFormSubmit(contact);
        this.setState({ isOpen: false });
    };

    render() {
        if (this.state.isOpen) {
            return (
                <ContactForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button
                        className='ui icon button'
                        onClick={this.handleFormOpen}
                    >
                        <i className='plus icon' />
                    </button>
                </div>
            );
        }
    }
}

class EditableContactList extends React.Component {
    render() {
        const contacts = this.props.contacts.map((contact) => (
            <EditableContact
                key={contact.id}
                id={contact.id}
                name={contact.name}
                address={contact.address}
                date={contact.date}
                mail={contact.mail}
                cellphone={contact.cellphone}
                image={contact.image}
                onFormSubmit={this.props.onFormSubmit}
                onTrashClick={this.props.onTrashClick}
            />
        ));
        return (
            <div id='contacts'>
                {contacts}
            </div>
        );
    }
}

class EditableContact extends React.Component {
    state = {
        editFormOpen: false,
    };

    handleEditClick = () => {
        this.openForm();
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleSubmit = (contact) => {
        this.props.onFormSubmit(contact);
        this.closeForm();
    };


    closeForm = () => {
        this.setState({ editFormOpen: false });
    };

    openForm = () => {
        this.setState({ editFormOpen: true });
    };

    render() {
        if (this.state.editFormOpen) {
            return (
                <ContactForm
                    id={this.props.id}
                    name={this.props.name}
                    address={this.props.address}
                    date={this.props.date}
                    mail={this.props.mail}
                    cellphone={this.props.cellphone}
                    image={this.props.image}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <Contact
                    id={this.props.id}
                    name={this.props.name}
                    address={this.props.address}
                    date={this.props.date}
                    mail={this.props.mail}
                    cellphone={this.props.cellphone}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.props.onTrashClick}
                />
            );
        }
    }
}

class Contact extends React.Component {
    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    render() {
        return (
            <div className="ui items">
                <div className="item">
                    <div className="image">
                        <img src={this.props.image} />
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
                            <span>{this.props.image}</span>
                        </div>
                        <div className="extra">
                            B'day in:
      </div>
                    </div>
                    <div className='extra content'>
                        <span
                            className='right floated edit icon'
                            onClick={this.props.onEditClick}>
                            <i className='edit icon' />
                        </span>
                        <span className='right floated trash icon'
                            onClick={this.handleTrashClick}>
                            <i className='trash icon' />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

class ContactForm extends React.Component {
    state = {
        name: this.props.name || '',
        address: this.props.address || '',
        mail: this.props.mail || '',
        date: this.props.date || '',
        cellphone: this.props.cellphone || '',
        image: this.props.image || '',
    };

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    };

    handleAddressChange = (e) => {
        this.setState({ address: e.target.value });
    };

    handleMailChange = (e) => {
        this.setState({ mail: e.target.value });
    };

    handleCellphoneChange = (e) => {
        this.setState({ cellphone: e.target.value });
    };

    handleDateChange = (e) => {
        this.setState({ date: e.target.value });
    };

    handleImageChange = (e) => {
        this.setState({ image: e.target.value });
    };


    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            name: this.state.name,
            address: this.state.address,
            mail: this.state.mail,
            date: this.state.date,
            cellphone: this.state.cellphone,
            image: this.state.image,

        });
    };

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Name</label>
                            <input
                                type='text'
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div className='field'>
                            <label>Address</label>
                            <input
                                type='text'
                                value={this.state.address}
                                onChange={this.handleAddressChange}
                            />
                        </div>
                        <div className='field'>
                            <label>Mail</label>
                            <input
                                type='text'
                                value={this.state.mail}
                                onChange={this.handleMailChange}
                            />
                        </div>
                        <div className='field'>
                            <label>Date</label>
                            <input
                                type='text'
                                value={this.state.date}
                                onChange={this.handleDateChange}
                            />
                        </div>
                        <div className='field'>
                            <label>Cellphone</label>
                            <input
                                type='text'
                                value={this.state.cellphone}
                                onChange={this.handleCellphoneChange}
                            />
                        </div>
                        <div className='field'>
                            <label>Image</label>
                            <input
                                type='text'
                                value={this.state.image}
                                onChange={this.handleImageChange}
                            />
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button
                                className='ui basic blue button'
                                onClick={this.handleSubmit}
                            >
                                {submitText}
                            </button>
                            <button
                                className='ui basic red button'
                                onClick={this.props.onFormClose}
                            >
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
