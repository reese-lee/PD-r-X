import { FindDoctor } from './api.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('form#search').submit(function(event) {
    event.preventDefault();
    let name =  $('#name').val();
    $('#name').val("");
    let malady = $('#malady').val();
    $('#malady').val("");
    let findDoctor = new FindDoctor;
    let promise = findDoctor.findDoctor(name, malady);

    promise.then(function(response) {
      let body = JSON.parse(response);
      if(body.data.length === 0) {
        $('#showDoctors').text(`Time to move to Canada! There are no doctors in your area that match your search parameters.`)
      }

      body.data.forEach(function (data) {
        if (data.profile.website === undefined){
          data.profile.website = "No website"
        }

        $('#showDoctors').append(`${data.profile.first_name} ${data.profile.last_name}<br>

          ${data.specialties[0].description}<br>
          Address: ${data.practices[0].visit_address.street}<br>
          ${data.practices[0].visit_address.city}, ${data.practices[0].visit_address.state} ${data.practices[0].visit_address.zip}<br>
          Phone Number: ${data.practices[0].phones[0].number}<br>
          Website: ${data.profile.website}<br>
          Accepting new patients: ${data.practices[0].accepts_new_patients}<br><hr><br>`)
        }, function (error) {
          $('#error').text(`There was an error processing your request: ${error.message}`)
        });
      });

    });
  });
