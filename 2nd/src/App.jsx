/* class HelloWorld extends React.Component{
    render(){
        const continents = ['Africa', 'America','Asia','Australia','Europe'];
        const helloContinents = Array.from(continents, c => `Hello ${c}!`);
        const message = helloContinents.join(" ");
        return (
            <div title="Outer div">
                <h1>{message}</h1>
            </div>
        );
    }
}

const element = <HelloWorld />;

ReactDOM.render(element, document.getElementById('contents')); */


const initialIssues = [
    {
        id: 1, status: 'New', owner: "Maven", effort: 5,
        created: new Date('03/04/2012'), due: undefined,
        title: "Error in console when clicking Add",
    },
    {
        id: 2, status: 'Assigned', owner: "Flash", effort: 15,
        created: new Date('03/12/2002'), due: new Date('05/04/2004'),
        title: "Missing bottom border on panel"
    }
];

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the IssueFilter.</div>
        );
    }
}

class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
        )
    }
}




class IssueTable extends React.Component {
    render() {
        const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handlesubmit = this.handlesubmit.bind(this);
    }

    handlesubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {owner:form.owner.value, title: form.title.value, status: "New"}
        this.props.createIssue(issue);
        form.owner.value = "";
        form.title.value = "";
    }

    render() {
        return (
            <form name="issueAdd" onSubmit={this.handlesubmit}>
                <input type="text" name='owner' placeholder="Owner"/>
                <input type="text" name='title' placeholder="Title"/>
                <button>Add</button>
            </form>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({ issues: initialIssues });
        }, 500);
    }

    createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({ issues: newIssueList });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues = {this.state.issues}/>
                <hr />
                <IssueAdd createIssue = {this.createIssue}/>
            </React.Fragment>
        );
    }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));