import React, { Component } from 'react';
import './index.css';
import { Icon, Label, Menu, Table, Button, Radio} from 'semantic-ui-react'
import Logo from '../../assets/AI4dummies.png'
const SelectCVS = (props) => {
  let columns  = props.length;
    return (
      <div className="SelectCVS">
        <img src={Logo} className="SelectCVSHeader"/>
        <Table celled className="SelectCVSTable">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Header
                <Radio
                  className="SelectCVSRadio"
                  toggle
                  label="Important Parameter"
                />
                <Radio
                  className="SelectCVSRadio"
                  label='Target'
                />
          </Table.HeaderCell>
              <Table.HeaderCell>Header
                <Radio
                  className="SelectCVSRadio"
                  toggle
                  label="Important Parameter"
                />
                <Radio
                  className="SelectCVSRadio"
                  label='Target'
                /></Table.HeaderCell>
              <Table.HeaderCell>Header
                <Radio
                  className="SelectCVSRadio"
                  toggle
                  label="Important Parameter"
                />
                <Radio
                  className="SelectCVSRadio"
                  label='Target'
                /></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>First</Label>
              </Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='left chevron' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='right chevron' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Button className="SelectCVSButton" content='Next' icon='right arrow' labelPosition='right' />
      </div>
    );
}

export default SelectCVS;
