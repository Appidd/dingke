// pages/userSum/userSum.js
import model from '../../utils/mock'
import moment from 'moment';
import * as echarts from '../../components/ec-canvas/echarts';

  
Page({

    /**
     * 页面的初始数据
     */
    data: {
        taskList:[],
        show:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    initavHeightChart() {
        let ecComponent = this.selectComponent('#mychart-dom-bar');
        ecComponent.init((canvas, width, height, dpr) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr
            });
            this.setavOption(chart);
            return chart;
        });
    },
    setavOption(chart) {
        
       var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
            xAxis: {
              type: 'category',
              data: ['07.01', '07.02', '07.03', '07.04', '07.05', '07.06', '07.08']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          };

        chart.setOption(option);
    },
    showCalendar(){
        this.setData({
            show:true
        })
    },
    onClose(){
this.setData({
    show:false,
    startDate:'',
    endDate:''
})
    },
    onConfirm(e){
        const dateList=e.detail
        let startDate=moment(dateList[0]).format('YYYY-MM-DD')
        let endDate=moment(dateList[1]).format('YYYY-MM-DD')
       this.setData({
           startDate,endDate,
           show:false
       })
    },
    onSearch(e){
   console.log(e)
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
this.initavHeightChart()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if(typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: "userSum"
          })
        }
        this.getTaskList()
    },
    getTaskList(){
        const taskList=model.getTaskList()
        taskList.map(e=>{
            e.year='2023' //通过moment获取
            e.principals=e.principalList.join(',')
 
        })
        this.setData({
         taskList
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})