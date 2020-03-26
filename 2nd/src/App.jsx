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
                <td>{issue.due ? issue.due.toDateString():''}</td>
                <td>{issue.title}</td>
            </tr>
        )
    }
}




class IssueTable extends React.Component {
    constructor() {
        super();
        this.state = {issues: []};
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({ issues: initialIssues });
        }, 500);
    }


    render() {
        const issueRows = this.state.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>);
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
    render() {
        return (
            <div>This is a placeholder for the IssueAdd.</div>
        );
    }
}

class IssueList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </React.Fragment>
        );
    }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));