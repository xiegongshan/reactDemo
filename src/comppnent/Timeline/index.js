import React, { Component, } from 'react';
import {Icon,Button ,DatePicker, Modal} from 'antd';
import  './index.css';
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker } = DatePicker;
var  containerHeight=document.body.clientHeight;
var index = 0;
var height = 0;
var currentYear=0;
const yearHeight = 40;
const monthHeight = 70;
class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeData:[],
      showIndex:'',
      year:'',
      currentTodayYear:'',
      month:'',
      currentTodayMonth:'',
      recordScrollTime:{},
     }
  }
  componentDidMount() {
 
    this.formTimeData();
  }
  componentWillUnmount(){
    // 订阅右侧滑动的时间
   
  }

  formTimeData=()=>{
    let timeData=[];
    let currentToday =new Date();
    let currentTodayYear = currentToday.getFullYear();
    let currentTodayMonth=currentToday.getMonth()+1;
    var index = 0;
    //构造数据算法，算十年之内的数据
    for(let year=currentTodayYear;year>=currentTodayYear-10;year--){
      let data ={};
      data.year = currentTodayYear;
      data.label = 'year';
      data.value = year;
      data.index = index++;
      timeData.push(data);
      if(year==currentTodayYear){
          while(currentTodayMonth){
            let data={}
            data.label = 'month';
            data.value = currentTodayMonth;
            data.index = index++;
            data.year = year;
            currentTodayMonth-=1;
            timeData.push(data);
          }
          continue;
      }
      for(let month=12;month>=1;month--){
        let data={}
        data.year = currentTodayYear;
        data.label = 'month';
        data.value = month;
        data.index = index++;
        data.year = year;
        timeData.push(data);
      }
    }
    // this.transferYearToInfoDetail(currentTodayYear);
    this.setState({
      timeData,
       year:currentTodayYear,
       currentTodayYear:currentTodayYear,
       currentTodayMonth:currentToday.getMonth()+1,
       month:currentToday.getMonth()+1,
    })
  }
  actionHandle=(data)=>{
    if(data.label=='year'){
      return;
    }
    this.setState({
      showIndex:data.index,
      month:this.state.timeData[data.index].value,
      year:this.state.timeData[data.index].year,
    })
    this.transferYearToInfoDetail(data.year);
    this.transferYearToLifeType(data.year,data.value);
    let dataStr = {};
    dataStr.create_date = data.year+'-'+data.value;
   


  }
  // 点击的时候触发,生命图谱类型的
  transferYearToLifeType(year,month){
    let data = {};
    data.year = year;
    data.month = month;
   
  }

  handleOnScroll = () => {
    let flag = false
    if (this.dom) {
      const{timeData} =this.state;
      const contentScrollTop = this.dom.scrollTop
      if(contentScrollTop==0){
        height=0;
        index=0;
        currentYear =  this.state.currentTodayYear;
        this.setState({
          year: this.state.currentTodayYear,
          month: this.state.currentTodayMonth
        })

      }
      if(contentScrollTop>(height+this.getHeight(timeData[index]))){
        height+=this.getHeight(timeData[index]);
        index++;
        if(timeData[index].label=='year'){
          currentYear =  timeData[index].value;
          this.setState({
            year: timeData[index].value
          })

        }else{
          this.setState({
            month: timeData[index].value
          })
        }
      }
      if(contentScrollTop < (height-this.getHeight(timeData[index]))){
        height-=this.getHeight(timeData[index]);
        index--;
        if(timeData[index].label=='year'){
          currentYear =  timeData[index].value+1
          this.setState({
            year: timeData[index].value+1
          })

        }else{
          this.setState({
            month: timeData[index].value
          })
        }
      }
      // this.transferYearToInfoDetail(currentYear);
    }
  }
  // 年份改变的时候传时间到生命周期组件
  transferYearToInfoDetail=(year)=>{
    let data = {};
    data.year = year;
   
  }
  getHeight=(data)=>{
   return data.label=='year'?yearHeight:monthHeight;
  }
  transferDateToStr=()=>{
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
  }
  onTimeChange=(value)=>{
    if(value==''||value==null || value ==NaN){
      return;
    }
    let str = moment(value).format('YYYY-MM-DD');
    let data = {}
    data.create_date = str;
    let [year, month, day] = str.split('-');
    if(this.state.currentTodayYear - year >=10){
      Modal.error({
        content: '选择年份与当前年份间隔不能大于10',
      });
      return;
    }
    this.transferYearToInfoDetail(year);
    this.transferYearToLifeType(year, month);
  


  }
   disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current >= moment().endOf('day');
  }
  render() {
    const { timeData,showIndex,year,month} =this.state;
    return (
    <div>
    <Button style={{ width: '80%',marginLeft:'10%',height: '40px' ,fontSize: '20px',color: '#4790E4'}}>{year}年</Button>
      <div   className="scrollDiv" style={{height:containerHeight-100}} id="timeScroll"
      ref={dom => {this.dom = dom}}
      onScrollCapture={() => this.handleOnScroll()}
      >
         <ul >
           {
             timeData.map((data, index) =>{
               return (
                <li  key={index} className={data.label=='year'?"yearli":showIndex==data.index?"monthliChoice":"monthli"}
                onClick={this.actionHandle.bind(this, data)}>{data.value}{
                  data.label=='year'? <span style={{ fontSize: '16px'}}>年</span>:<span style={{ fontSize: '16px'}}>月</span>}
                </li>
               )
             })
           }
         </ul>
      </div>
      </div>
      );
  }
}

export default TimeLine;
