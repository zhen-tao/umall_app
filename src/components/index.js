import Vue from 'vue'
import vHeader from './vHeader'
import vList from './vList'

let mycomponents = {
    vHeader,
    vList,
}
for(let key in mycomponents){
    Vue.component(key,mycomponents[key])
}