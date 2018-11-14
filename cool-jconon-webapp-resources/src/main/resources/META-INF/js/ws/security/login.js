define(['jquery', 'i18n', 'header', 'cnr/cnr.ui', 'cnr/cnr.validator', 'cnr/cnr.bulkinfo', 'cnr/cnr.url'], function ($, i18n, header, UI, Validator, BulkInfo, URL) {
  "use strict";
  Validator.validate($('.form-signin'), {
    rules: {
      username: {
        required: true,
        minlength: 2
      },
      password: {
        required: true
      }
    }
  });

  function peopleSearch(filter, callback) {
    URL.Data.proxy.peopleSearch({
      contentType: 'application/json',
      data: {
        filter: filter
      },
      success: function (data) {
        return callback(data.people);
      }
    });
  }

  function forgotPassword(userName) {
      //Mando la mail di verifica
      URL.Data.security.forgotPassword({
        type: 'POST',
        data: {
          userName: userName,
          guest: true
        },
        success: function (data) {
          UI.success(i18n['message.email.send']);
        },
        error: function (xhr) {
          var json = JSON.parse(xhr.responseText);
          UI.alert(i18n[json.error]);
        }
      });
  }

  $('#passwordRecovery').click(function () {
    var content = $('<div><div>'),
      bulkinfo = new BulkInfo({
        target: content,
        formclass: 'form-inline',
        path: 'accountBulkInfo',
        name: 'forgotPass'
      });
    bulkinfo.render();
    content.prepend("Inserire l'indirizzo e-mail con il quale ci si e' registrati per ricevere il link per modificare la password.");
    UI.modal(i18n['button.change.password'], content, function () {
      var emailtext = content.find('#emailForgotPass');
      if (!bulkinfo.validate()) {
        return false;
      }
      peopleSearch('email:' + emailtext.val(), function(people) {
        if (people.length === 0) {
            peopleSearch('emailcertificatoperpuk:' + emailtext.val(), function(peoplewithpuk) {
                if (peoplewithpuk.length === 0) {
                    UI.error(i18n['message.error.email.not.found']);
                } else {
                    forgotPassword(peoplewithpuk[0].userName);
                }
            });
        } else {
            forgotPassword(people[0].userName);
        }
      });
    });
  });
});