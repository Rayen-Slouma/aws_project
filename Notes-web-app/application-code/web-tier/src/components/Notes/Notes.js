import React, {Component} from 'react';
import './Notes.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleButtonClickDel = this.handleButtonClickDel.bind(this);
        this.handleButtonClickDelId = this.handleButtonClickDelId.bind(this);
        this.state = {
            transactions: [],
            text_title: "",
            text_desc:"",
            id: "",
            owner: localStorage.getItem('UserId'),
        }
    }

    // Keep all your existing methods exactly as they are
    componentDidMount() {
        const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (isLoggedIn) {
            this.populateData();
        }
    }

    populateData(){
        const owner = this.state.owner;
        this.fetch_retry(`/api/transaction/user/${owner}`, 3)
            .then(res => res.json())
            .then((data) => {
                this.setState({ transactions : data.result });
                console.log("state set");
                console.log(this.state.transactions);
            })
            .catch(console.log);
    }

    async fetch_retry(url, n){
        try {
            return await fetch(url)
        } catch(err) {
            if (n === 1) throw err;
            await new Promise(resolve => setTimeout(resolve, 1000));
            return await this.fetch_retry(url, n - 1);
        }
    };

    renderTableData() {
        return this.state.transactions.map((transaction, index) => {
            const { id, title, description} = transaction;
            return (
                <tr key={id} className="note-row">
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{description}</td>
                </tr>
            )
        })
    }

    handleButtonClickDel(){
        const owner = this.state.owner;
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"owner": owner})
        };
        fetch('/api/transaction/user', requestOptions)
            .then(response => response.json())
            .then(data => this.populateData())

        this.setState({text_title : "", text_desc:"",transaction:[]});
    }

    handleButtonClickDelId(){
        const idExists = this.state.transactions.some(transaction => transaction.id === parseInt(this.state.id));
        if (!idExists) {
            toast.warning('Wrong task ID');
            return;
        }

        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"id" : this.state.id})
        };
        fetch('/api/transaction/id', requestOptions)
            .then(response => response.json())
            .then(data => this.populateData());

        this.setState({ text_title: "", text_desc: "", id: "" });
    }

    handleButtonClick(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"title": this.state.text_title, "desc": this.state.text_desc, "owner": this.state.owner })
        };

        fetch('/api/transaction', requestOptions)
            .then(response => response.json())
            .then(data => this.populateData());

        this.setState({ text_title: "", text_desc: "" });
    }

    handleTextChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render () {
        const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        return (
            <div className="notes-container">
                <div className="notes-header">
                    <h1 id='title'>Welcome to your Notes</h1>
                    <button
                        className="delete-all-btn"
                        onClick={this.handleButtonClickDel}
                    >
                        Delete All
                    </button>
                </div>

                <table id='transactions'>
                    <tbody>
                    <tr className="table-header">
                        <td>N°</td>
                        <td>Title</td>
                        <td>Description</td>
                    </tr>
                    <tr className="input-row">
                        <td>
                            <button
                                className="add-btn"
                                onClick={this.handleButtonClick}
                            >
                                ADD
                            </button>
                        </td>
                        <td>
                            <input
                                type="text"
                                name="text_title"
                                value={this.state.text_title}
                                onChange={this.handleTextChange}
                                className="title-input"
                                placeholder="Enter title..."
                            />
                        </td>
                        <td>
                                <textarea
                                    name="text_desc"
                                    value={this.state.text_desc}
                                    onChange={this.handleTextChange}
                                    className="desc-input"
                                    placeholder="Enter description..."
                                />
                            <button
                                className="clear-btn"
                                onClick={() => this.setState({ text_title: "", text_desc: "" })}
                            >
                                Clear
                            </button>
                        </td>
                    </tr>
                    {isLoggedIn && this.renderTableData()}
                    <tr className="delete-row">
                        <td>
                            <input
                                type="text"
                                name="id"
                                value={this.state.id}
                                onChange={this.handleTextChange}
                                className="id-input"
                                placeholder="Note number"
                            />
                        </td>
                        <td colSpan="2">
                            <button
                                className="remove-btn"
                                onClick={this.handleButtonClickDelId}
                            >
                                Remove Note
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <ToastContainer position="bottom-right" theme="dark" />
            </div>
        );
    }
}

export default withRouter(Notes);