import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Modal, Button } from 'react-bootstrap';
import Config from 'config';

class Home extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
				harga: 0,
				dp: 0,
				pokok: 0,
				angsuran: [0, 0, 0],
				show: false,
				bunga1: Config.car_years[0].tenor[0].bunga,
				bunga2: Config.car_years[0].tenor[1].bunga,
				bunga3: Config.car_years[0].tenor[2].bunga,
				bunga4: Config.car_years[0].tenor[3].bunga,
	    };
			this.handleChange = this.handleChange.bind(this);
	}
	perubahan(harga) {
		const value = parseInt(harga),
		dp = parseInt(((value * 30) / 100)),
		pokok = value - dp,
		bunga = [
			this.state.bunga1 / 100,
			this.state.bunga2 / 100,
			this.state.bunga3 / 100,
			this.state.bunga4 / 100
		],
		angsuran = [
			((bunga[0] * pokok) * 1),
			((bunga[1] * pokok) * 2),
			((bunga[2] * pokok) * 3),
			((bunga[3] * pokok) * 4)
		];

		this.setState({
			dp: dp.toLocaleString('id'),
			pokok: pokok.toLocaleString('id'),
			angsuran: [
				angsuran[0].toLocaleString('id') + ' => ' + Math.round(parseInt(angsuran[0] + pokok) / 12).toLocaleString('id'),
				angsuran[1].toLocaleString('id') + ' => ' + Math.round(parseInt(angsuran[1] + pokok) / 24).toLocaleString('id'),
				angsuran[2].toLocaleString('id') + ' => ' + Math.round(parseInt(angsuran[2] + pokok) / 36).toLocaleString('id'),
				angsuran[3].toLocaleString('id') + ' => ' + Math.round(parseInt(angsuran[3] + pokok) / 48).toLocaleString('id'),
			]
		});
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		setTimeout(()=>{
			this.perubahan(this.state.harga)
		}, 200)
	}
	render() {
		const {harga, dp, pokok, angsuran, bunga1, bunga2, bunga3, bunga4} = this.state;
  	return (
    	<page>
    		<h1 className="red">Kalkulator KKB <Button bsStyle="primary" onClick={(e)=>{this.setState({show: true})}}>Ganti Bunga</Button></h1>
				<Row>
					<Col md={6} sm={12}>
						<TextField label="Harga Mobil" name="harga" type="number" onChange={this.handleChange} value={harga} onClick={(e)=>{e.target.select()}}/>
					</Col>
					<Col md={6} sm={12}>
						<TextField label="Minimum DP" value={dp} readOnly/>
					</Col>
					<Col md={6} sm={12}>
						<TextField label="Pokok Hutang" value={pokok} readOnly/>
					</Col>
					<Col md={6} sm={12}>
						<TextField value={angsuran[0]} label={"Angsuran 1 Tahun Bunga " + bunga1 + '%'} readOnly/>
					</Col>
					<Col md={6} sm={12}>
						<TextField value={angsuran[1]} label={"Angsuran 2 Tahun Bunga " + bunga2 + '%'} readOnly/>
					</Col>
					<Col md={6} sm={12}>
						<TextField value={angsuran[2]} label={"Angsuran 3 Tahun Bunga " + bunga3 + '%'} readOnly/>
					</Col>
					<Col md={6} sm={12}>
						<TextField value={angsuran[3]} label={"Angsuran 4 Tahun Bunga " + bunga4 + '%'} readOnly/>
					</Col>
				</Row>

				<Modal show={this.state.show} bsSize="small" aria-labelledby="contained-modal-title-sm">
	        <Modal.Header>
	          <Modal.Title id="contained-modal-title-sm">Ganti Bunga</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
						<Row>
							<Col md={12}>
								<TextField label="Bunga 1 Tahun" name="bunga1" type="number" onChange={this.handleChange} value={bunga1} onClick={(e)=>{e.target.select()}}/>
							</Col>
							<Col md={12}>
								<TextField label="Bunga 2 Tahun" name="bunga2" type="number" onChange={this.handleChange} value={bunga2} onClick={(e)=>{e.target.select()}}/>
							</Col>
							<Col md={12}>
								<TextField label="Bunga 3 Tahun" name="bunga3" type="number" onChange={this.handleChange} value={bunga3} onClick={(e)=>{e.target.select()}}/>
							</Col>
							<Col md={12}>
								<TextField label="Bunga 4 Tahun" name="bunga4" type="number" onChange={this.handleChange} value={bunga4} onClick={(e)=>{e.target.select()}}/>
							</Col>
						</Row>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button bsStyle="primary" onClick={(e)=>{this.setState({show: false})}}>Close</Button>
	        </Modal.Footer>
	      </Modal>
    	</page>
  	)
	}
}

class TextField extends React.Component {
	render() {
		let props = Object.assign({}, this.props);
		delete props.id;
		delete props.label;
		return (
			<FormGroup
        controlId={this.props.id}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          {...props}
        />
        <FormControl.Feedback />
      </FormGroup>
		)
	}
}

export default Home;
