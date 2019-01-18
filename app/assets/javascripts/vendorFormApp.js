var app = angular.module('myApp', ['mgo-angular-wizard', ]);

app.controller('vendorFormController', ['$scope', '$http', function ($scope, $http) {

  $scope.countries = countriesList;

  $scope.validationState = {
    name: {
      valid: null,
      message: ""
    },
    email: {
      valid: null,
      message: ""
    },
    phone: {
      valid: null,
      message: ""
    },
    password: {
      valid: null,
      message: ""
    },
    confirmPassword: {
      valid: null,
      message: ""
    },
    businessName: {
      valid: null,
      message: ""
    },
    businessAddress: {
      valid: null,
      message: ""
    },
    licenceFile: {
      valid: null,
      message: ""
    },
    confirmBankAccount: {
      valid: null,
      message: ""
    },
  };

  $scope.form = {
    name: "",
    email: "",
    phone: null,
    business_name: "",
    address: "",
    password: "",
    confirm_password: "",
    year_of_incorporation: "",
    recent_sales_volume: null,
    product_or_service_reference: "",
    copy_of_bussines_licence: "",
    card_number: "",
    card_holder_name: "",
    account_holder_name: "",
    country: "",
    bank_account_number: "",
    confirm_bank_account_no: ""

  };

  $scope.validateStep1 = function () {
    return $scope.isValidName() && $scope.isValidEmail() && $scope.isValidPhone() && $scope.isValidPassword() &&
      $scope.isValidConfirmPassword();
  };

  $scope.validateStep2 = function () {
    return $scope.isValidBusinessName() && $scope.isValidBusinessAddress() && $scope.isValidLicenceFile();
  };

  $scope.validateStep3 = function () {
    console.log("validateStep3");
    return true;
  };

  $scope.isValidName = function () {
    var regSpecialChars = /[^a-zA-Z0-9]/;

    if ($scope.form.name === null || $scope.form.name.trim() === "") {
      $scope.validationState.name.valid = false;
      $scope.validationState.name.message = "Name must not be empty";

    } else if (regSpecialChars.test($scope.form.name) == true) {
      $scope.validationState.name.valid = false;
      $scope.validationState.name.message = "Name must not contain special characters";

    } else {
      $scope.validationState.name.valid = true;
      $scope.validationState.name.message = "";
    }

    console.log("$scope.isValidName: " + $scope.validationState.name.valid);
    return $scope.validationState.name.valid;
  };

  $scope.isUniqueName = function () {
    if ($scope.isValidName()) {
      var nameExists = null;

      $http.post("/vendors/register/validate/vendor_name", {
          vendor_name: $scope.form.name
        })
        .then(function (response) {
          nameExists = response.data.exists;

          if (nameExists !== null && nameExists) {
            $scope.validationState.name.valid = false;
            $scope.validationState.name.message = "Name already exists, please choose another";
          } else {
            $scope.validationState.name.valid = true;
            $scope.validationState.name.message = "";
          }

          console.log("$scope.isUniqueName: " + $scope.validationState.name.valid);
          return $scope.validationState.name.valid;

        }).catch(function (error) {
          console.log("isUniqueName api call Error: " + error);
          return false;
        });

    } else {
      return false;
    }
  };

  $scope.isValidEmail = function () {
    var regEmailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if ($scope.form.email === null || $scope.form.email.trim() === "") {
      $scope.validationState.email.valid = false;
      $scope.validationState.email.message = "Email must not be empty";

    } else if (regEmailPattern.test($scope.form.email) == false) {
      $scope.validationState.email.valid = false;
      $scope.validationState.email.message = "Not a valid Email";

    } else {
      $scope.validationState.email.valid = true;
      $scope.validationState.email.message = "";
    }

    console.log(" $scope.isValidEmail: " + $scope.validationState.email.valid);
    return $scope.validationState.email.valid;

  };

  $scope.isUniqueEmail = function () {
    if ($scope.isValidEmail()) {
      var emailExists = null;

      $http.post("/vendors/register/validate/vendor_email", {
          email: $scope.form.email
        })
        .then(function (response) {
          emailExists = response.data.exists;

          if (emailExists) {
            $scope.validationState.email.valid = false;
            $scope.validationState.email.message = "Email already registered, please choose another";
          } else {
            $scope.validationState.email.valid = true;
            $scope.validationState.email.message = "";
          }

          console.log("$scope.isUniqueEmail: " + $scope.validationState.email.valid);
          return $scope.validationState.email.valid;
        }).catch(function (error) {
          console.log("isUniqueEmail api call Error: " + error);
          return false;
        });
    } else {
      return false;
    }
  };

  $scope.isValidPhone = function () {

    if ($scope.form.phone === null || $scope.form.phone == "") {
      $scope.validationState.phone.valid = false;
      $scope.validationState.phone.message = "Phone number must not be empty";

    } else if ($scope.form.phone <= 0 || $scope.form.phone < 9999) {
      $scope.validationState.phone.valid = false;
      $scope.validationState.phone.message = "Phone number not valid";

    } else {
      $scope.validationState.phone.valid = true;
      $scope.validationState.phone.message = "";
    }

    console.log("$scope.isValidName: " + $scope.validationState.phone.valid);
    return $scope.validationState.phone.valid;
  };

  $scope.isValidPassword = function () {
    if ($scope.form.password == null || $scope.form.password.trim() === "") {
      $scope.validationState.password.valid = false;
      $scope.validationState.password.message = "Password can't be empty";

    } else if ($scope.form.password.length < 6) {
      $scope.validationState.password.valid = false;
      $scope.validationState.password.message = "Password must be greater than 6 chars";

    } else {
      $scope.validationState.password.valid = true;
      $scope.validationState.password.message = "";
    }

    console.log("$scope.isValidPassword: " + $scope.validationState.password.valid);
    return $scope.validationState.password.valid;
  };

  $scope.isValidConfirmPassword = function () {
    if ($scope.form.password !== $scope.form.confirm_password) {
      $scope.validationState.confirmPassword.valid = false;
      $scope.validationState.confirmPassword.message = "Passwords doesn't match";

    } else {
      $scope.validationState.confirmPassword.valid = true;
      $scope.validationState.confirmPassword.message = "";
    }

    console.log("$scope.isValidConfirmPassword: " + $scope.validationState.confirmPassword.valid);
    return $scope.validationState.confirmPassword.valid;
  };

  $scope.isValidBusinessName = function () {

    if ($scope.form.business_name === null || $scope.form.business_name.trim() === "") {
      $scope.validationState.businessName.valid = false;
      $scope.validationState.businessName.message = "Business name must not be empty";

    } else {
      $scope.validationState.businessName.valid = true;
      $scope.validationState.businessName.message = "";
    }

    console.log("$scope.isValidBusinessName: " + $scope.validationState.businessName.valid);
    return $scope.validationState.businessName.valid;
  };

  $scope.isValidBusinessAddress = function () {

    if ($scope.form.address === null || $scope.form.address.trim() === "") {
      $scope.validationState.businessAddress.valid = false;
      $scope.validationState.businessAddress.message = "Business address must not be empty";

    } else if ($scope.form.address.length < 6) {
      console.log("InValid Length");
      $scope.validationState.businessAddress.valid = false;
      $scope.validationState.businessAddress.message =
        "Business address too short, must be greater than 6 chars";
      return false;

    } else {
      $scope.validationState.businessAddress.valid = true;
      $scope.validationState.businessAddress.message = "";
    }

    console.log("$scope.isValidBusinessAddress: " + $scope.validationState.businessAddress.valid);
    return $scope.validationState.businessAddress.valid;
  };

  $scope.isValidLicenceFile = function () {

    if (document.getElementById("licenceFile").value == "") {
      $scope.validationState.licenceFile.valid = false;
      $scope.validationState.licenceFile.message = "Please attach a valid licence document";

    } else {
      $scope.validationState.licenceFile.valid = true;
      $scope.validationState.licenceFile.message = "";
    }

    console.log("$scope.isValidLicenceFile: " + $scope.validationState.licenceFile.valid);
    console.log("$scope.form.copy_of_bussines_licence: " + $scope.form.copy_of_bussines_licence);
    return $scope.validationState.licenceFile.valid;
  };

  $scope.isValidConfirmBank = function () {
    if ($scope.form.bank_account_number !== $scope.form.confirm_bank_account_no) {
      $scope.validationState.confirmBankAccount.valid = false;
      $scope.validationState.confirmBankAccount.message = "Bank account number doesn't match";

    } else {
      $scope.validationState.confirmBankAccount.valid = true;
      $scope.validationState.confirmBankAccount.message = "";
    }

    console.log("$scope.isValidConfirmBank: " + $scope.validationState.confirmBankAccount.valid);
    return $scope.validationState.confirmBankAccount.valid;
  };

  $scope.submit = function () {
    console.log("form", $scope.form);
    $http.post("/vendors/create", {
        form: $scope.form
      })
      .then(function (response) {
        window.location.assign("/login");
      }).catch(function (error) {
        alert("error");
        console.log(error);
      }).then(function () {
        // $scope.state.inputsDisabled = false;
      });
  };

  $scope.finishedWizard = function () {
    console.log("finished");
    $scope.submit();
  };

  $scope.cancelledWizard = function () {
    console.log("cancelled");
  };

}]);
