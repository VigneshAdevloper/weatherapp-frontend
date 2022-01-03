import axios from "axios";
import moment from "moment";
var health;
export default {
    data() {
        return {
            selectedcity: 6167865,
            citys: [
                {
                "id": 6167865,
                "name": "Toronto",
                "country": "CA"
                },
                {
                "id": 6094817,
                "name": "Ottawa",
                "country": "CA"
                },
                {
                "id": 1850147,
                "name": "Tokyo",
                "country": "JP"
                }
            ],
            currentdayweather_cloud: [],
            currentdayweather_wind: [],
            dayview: true,
            weekweatherdata: [],
            weekarr: [],
            weekfilter: []
        }
    },
    created() {
        health = this;
        this.currentweather();
    },
    filters: {
        dateformat(val) {
            return moment(val, "YYYY-MM-DD HH:mm:ss").format("D MMM hhA")
        }
    },
    methods: {
        currentweather() {
            this.dayview = true;
            try {
                axios.post('http://localhost:810/weather/currentday',{
                    city: this.selectedcity
                })
                .then((result)=> {
                    this.currentdayweather_cloud= result.data.weather[0];
                    this.currentdayweather_wind= result.data.wind;
                });
            }
            catch(err) {  // edhu ok
                console.log(err);
            }
        },
        weekweather() {
            this.dayview = false;
            try {
                axios.post('http://localhost:810/weather/week', {
                    city: this.selectedcity
                })
                .then((result)=> {
                    // this.currentdayweather_cloud= result.data.weather[0];
                    // this.currentdayweather_wind= result.data.wind;
                    
                    this.weekweatherdata = result.data;
                    this.weekarr = new Set();
                    this.weekweatherdata.list.forEach((arr) => {
                        health.weekarr.add(moment(arr.dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD MMM"));
                    });
                    this.selectedweekdate = this.weekarr.values().next().value;
                    this.displayweektbl();
                }).catch((err)=> {
                    console.log(err);
                });
            }
            catch(err) {
                console.log(err);
            }
        },
        displayweektbl() {
            this.weekfilter = this.weekweatherdata.list.filter((arr)=> {
                let date = moment(arr.dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD MMM");
                return moment(health.selectedweekdate).isSame(date);
            });
        },
        datechange(date_) {
            this.selectedweekdate=date_;
            this.displayweektbl();
        }
    }
    
}