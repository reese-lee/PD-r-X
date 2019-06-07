import { FindDoctor } from './api.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('#maladyType').click(function(){
    let name =  $('#name').val();
    $('#name').val("");

    let findDoctor = new FindDoctor;
    let promise = findDoctor.findDrByMalady(name);

    promise.then(function(response) {
      let body = JSON.parse(response);
      $('.showMalady').text(`The doctors: ${body.data.name}`);
      // $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  });
});
});
