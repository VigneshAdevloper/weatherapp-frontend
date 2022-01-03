<template>
  <div>
    <div class="current_sec">
      <label for="city">City</label>
      <select v-model="selectedcity" @change="currentweather">
        <option v-for="city in citys" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
      <div class="_lbl">{{ currentdayweather_cloud.main }}</div>
      <div>{{ currentdayweather_cloud.description }}</div>
      <div class="_lbl">{{ currentdayweather_wind.deg}} &deg; C</div>
      <div>{{ currentdayweather_wind.speed }}</div>
      <button @click="weekweather" v-if="dayview">see forecast</button>
    </div>
    <div class="weekview_sec" v-if="!dayview">
      <button @click="currentweather">Close</button>
      <table >
        <tr>
          <td>date</td>
          <td>temp</td>
          <td>min temp</td>
          <td>max temp</td>
          <td>wind</td>
          <td>description</td>
        </tr>
        <tr v-for="week in weekfilter" :key="week.dt">
          <td>
            {{ week.dt_txt | dateformat }}
          </td>
          <td>
            {{ week.main.temp }} &deg; C
          </td>
          <td>
            {{ week.main.temp_min }} &deg; C
          </td>
          <td>
            {{ week.main.temp_max }} &deg; C
          </td>
          <td>
            {{ week.wind.speed }}
          </td>
          <td>
            {{ week.weather[0].description }}
          </td>
        </tr>
      </table>
      <button v-for="date_ in weekarr" :key="date_" @click="datechange(date_)">
        {{ date_ }}
      </button>
    </div>
  </div>
</template>
<script type="modeule" src="./weather.js"></script>
<style lang="scss">
@import "./weather.scss";
</style>