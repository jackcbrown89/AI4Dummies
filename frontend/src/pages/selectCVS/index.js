import React from 'react';
import './index.css';
import { Icon, Menu, Table, Button, Radio} from 'semantic-ui-react'
import Logo from '../../assets/AI4dummies.png'

const SelectCVS = (props) => {
  let columns = props.file.split('\n');
  let headers = columns[0].split(',');
  console.log(headers);
  let firstValues = columns[1].split(',');
  let secondValues = columns[2].split(',');
  let thirdValues = columns[3].split(',');
    return (
      <div className="SelectCVS">
        <img src={Logo} alt="AI4dummiesLogo" className="SelectCVSHeader"/>
        <Table celled className="SelectCVSTable">
          <Table.Header>
            <Table.Row>
            {headers.map((a,index) => {console.log(a);
            if(index<8){
              return(
                <Table.HeaderCell>{a}
                </Table.HeaderCell>
              )}
              else{
                return('')
              }
            })}
            </Table.Row>
            <Table.Row>
            {headers.map((a,index) => {console.log(a);
            if(index<8){
              return(
                <Table.HeaderCell>
                <Radio
                  className="SelectCVSRadio"
                  toggle
                  // name={"SelectCVSRadio" + index}
                />
                <Radio
                  className="SelectCVSRadio"
                  label='Target'
                />
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
              if(index<8){
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
              if(index<8){
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
              if(index<8){
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
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={headers.length > 8 ? '8' : headers.length}>
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
