import React from 'react';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';
import { ButtonToolbar, Button, FormControl, Row, Col, Form, FormGroup } from 'react-bootstrap';

class IssueFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
    this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
    this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  onChangeEffortMin(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effortMin: e.target.value, changed: true });
    }
  }

  onChangeEffortMax(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effortMax: e.target.value, changed: true });
    }
  }

  showOriginalFilter() {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { status, effortMin, effortMax } = this.state;
    const { history, urlBase } = this.props;
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (effortMin) params.set('effortMin', effortMin);
    if (effortMax) params.set('effortMax', effortMax);
    const search = params.toString() ? `?${params.toString()}` : '';
    history.push({ pathname: urlBase, search });
  }

  render() {
    const { status, changed } = this.state;
    const { effortMin, effortMax } = this.state;
    return (
      <Form>
        <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <Form.Label>Status:</Form.Label>
              <Form.Control as="select" value={status} onChange={this.onChangeStatus}>
                <option value="">All</option>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Closed">Closed</option>
              </Form.Control>
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <Form.Label>Effort between:</Form.Label>
            <Row>
              <Col>
                <FormControl
                  value={effortMin}
                  onChange={this.onChangeEffortMin}
                  placeholder="Min Effort"
                />
              </Col>
              <Col>
                <FormControl
                  value={effortMax}
                  onChange={this.onChangeEffortMax}
                  placeholder="Max Effort"
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <Form.Label>&nbsp;</Form.Label>
              <ButtonToolbar>
                <Button variant="primary" onClick={this.applyFilter}>
                  Apply
                </Button>
                &nbsp;
                <Button onClick={this.showOriginalFilter} disabled={!changed}>
                  Reset
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withRouter(IssueFilter);
