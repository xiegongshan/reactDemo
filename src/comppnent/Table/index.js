import { Table, Checkbox,Row, Col } from 'antd';
import React, { Component } from 'react';
import  './style.css';
import {  Popover } from 'antd';
import setting from './ico/setting.png'
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: 'Action',
      key: 'action',
    },
];

const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
let checkBoxDatas= [];  
class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showColumns:[]
         }
    }
    componentDidMount() {
        this.setState({
            showColumns:columns
        })
    }
    render() { 

        return ( 
            <div className ="tableDiv"> 
                 <h1>基于antd的定制列</h1>
                 <p>可以通过自定义来展示和隐藏所要选的列</p>
                 <h1>代码演示</h1>
                <Popover placement="bottomLeft" content={this.CheckBoxContent(columns)} trigger="click">
                    <img src={setting} className="settings" /><span style={{marginLeft:'5px'}}>自定义列</span>
                </Popover>
               <Table columns={this.state.showColumns} dataSource={data} />
            </div>
         );
    }
    CheckBoxContent=(checkBoxColumns)=>{
        let defaultValue=[];
        for (let i=0; i<checkBoxColumns.length;i++){
          defaultValue.push(checkBoxColumns[i].dataIndex);
        }
        return (
          <div style={{width: '350px' }}>
            <Checkbox.Group style={{ width: '100%' }} onChange={this.checkBoxOnChange.bind(this)} defaultValue={defaultValue}>
              <Row>
                {checkBoxColumns.map((item,index)=>{
                  return (<Col span={8} key={index}  >  <Checkbox value={item.dataIndex}
                    disabled= {this.isDisabledCheckbox(item.dataIndex)} >{item.title}</Checkbox></Col> )
                  })
                }
              </Row>
            </Checkbox.Group>
          </div>
         )
    }
     checkBoxOnChange=(datas)=>{
        let assitColums =[];
        let width= 0;
        if(datas.length>=1&&datas.length<=8 ){
           width = parseInt(190* (8-datas.length))/(datas.length);
        }
        checkBoxDatas= datas;
        columns.forEach((column)=>{
          datas.forEach((item)=>{
            if(column.dataIndex == item){
              assitColums.push(column);
            }
          })
        })
        for(var i=0; i<assitColums.length;i++){
          assitColums[i].width+=width;
        }
        this.setState({
            showColumns:assitColums
        });
      }
    isDisabledCheckbox=(value)=>{
        // 最少需要展示一列
       return  checkBoxDatas.length <2 && checkBoxDatas.includes(value);
    }
}
 
export default TableComponent;