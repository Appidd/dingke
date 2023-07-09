// components/weekCalendar/weekCalendar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
  
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      weekList:['一','二','三','四','五','六','日'],
      newDateList:[]
    },
    lifetimes:{
      attached(){
        this.getWeekDataList(new Date())
      }
    },
    /**
     * 组件的方法列表
     */
    methods: {
      chooseDate(e){
        const item=e.currentTarget.dataset.item
        const newDateList=this.data.newDateList
        newDateList.map(e=>{
          e.checked=false
        })
        newDateList.map(e=>{
          if(e.day==item.day){
            e.checked=true
            return
          }
        })
        this.setData({
          newDateList
        })
        this.triggerEvent('getTimestamp',item.timestamp)
      },
      getWeekDataList(data) {
        //根据日期获取本周周一~周日的年-月-日
        var weekList = [];
        var date = new Date(data);
        //判断本日期是否为周日，获取本周一日期
        if(date.getDay()=="0"){
          date.setDate(date.getDate() -6);
        }else {
          date.setDate(date.getDate() - date.getDay() + 1);
        }
        var myDate=date.getDate();
        var myMonth=date.getMonth() + 1;
        if(date.getDate()<10){
          myDate= '0'+ myDate;
        }
        if(date.getMonth() + 1<10){
          myMonth='0'+myMonth;
        }
        weekList.push(date.getFullYear() + "/" + myMonth+ "/" + myDate);
        // 获取周二以后日期
        for(var i=0;i<6;i++) {
          date.setDate(date.getDate() + 1);
          myDate=date.getDate();
          myMonth=date.getMonth() + 1;
          if(date.getDate()<10){
            myDate= '0'+ myDate;
          }
          if(date.getMonth() + 1<10){
            myMonth='0'+myMonth;
          }
          weekList.push(date.getFullYear() + "/" + myMonth+ "/" +myDate);
        }
        let newDateList=[]
        weekList.forEach(e=>{
          var obj={
            day:e.split('/')[2],
            checked:false,
            timestamp:Date.parse(e)
          }
          newDateList.push(obj)
        })
        newDateList.forEach(item=>{
          if(item.day==(new Date).getDate()){
            item.checked=true
          }
        })
        this.setData({
          newDateList
        })
      },
    }
  })
  