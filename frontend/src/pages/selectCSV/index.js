import React from 'react';
import './index.css';
import { Icon, Menu, Table, Button, Radio} from 'semantic-ui-react'
import Logo from '../../assets/Ml4dummies.png'
let target
const SelectCVS = (props) => {
  let rows = props.file.split('\n');
  let headers = rows[0].split(',');
  console.log(headers);
  let firstValues = rows[1].split(',');
  let secondValues = rows[2].split(',');
  let thirdValues = rows[3].split(',');
    return (
      <div className="SelectCVS">
        <img src={Logo} alt="AI4dummiesLogo" className="SelectCVSHeader"/>
        <Table celled className="SelectCVSTable">
          <Table.Header>
            <Table.Row>
            {headers.map((a,index) => {console.log(a);
            if(index<12){
              return(
                <Table.HeaderCell  className = {target === headers[index] ? "SelectCVSTableRowBlue" : "SelectCVSTableRowRed"}><div
                  onClick={() => {
                    console.log("click"+target);
                    target = headers[index];
                    props.handleHeaderClick(props.clicked);
                }}>{a}</div>
                </Table.HeaderCell>
              )}
              else{
                return('')
              }
            })}
            </Table.Row>
            <Table.Row>
            {headers.map((a,index) => {console.log(a);
            if(index<12){
              return(
                <Table.HeaderCell>
                <Radio
                  className="SelectCVSRadio"
                  label='Param'
                  toggle
                />
                {/* <Radio
                  className="SelectCVSRadio"
                  label='Target'
                  onClick={() => {
                    target = headers[index];
                  }}
                /> */}
                </Table.HeaderCell>
              )}
              else{
                return('')
              }
            })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              {firstValues.map((a,index) => {console.log(a);
              if(index<12){
                return(
                  <Table.Cell>
                    {a}
                  </Table.Cell>
              )}
              else{
                return('')
              }
            })}
            </Table.Row>
            <Table.Row>
              {secondValues.map((a,index) => {console.log(a);
              if(index<12){
                return(
                  <Table.Cell>
                    {a}
                  </Table.Cell>
              )}
              else{
                return('')
              }
              })}
            </Table.Row>
            <Table.Row>
              {thirdValues.map((a,index) => {console.log(a);
              if(index<12){
                return(
                  <Table.Cell>
                    {a}
                  </Table.Cell>
              )}
              else{
                return('')
              }
            })}
            </Table.Row>
            <Table.Row>
              {thirdValues.map((a,index) => {console.log(a);
              if(index<12){
                return(
                  <Table.Cell>
                    ...
                  </Table.Cell>
              )}
              else{
                return('')
              }
            })}
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={headers.length > 12 ? '12' : headers.length}>
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
        <Button color='red' className="SelectCVSButton" content='Next' icon='right arrow' labelPosition='right' onClick={() => {
          props.handleNext(props.file, target.split('\n')[0])
        }} />
      </div>
    );
}

export default SelectCVS;
