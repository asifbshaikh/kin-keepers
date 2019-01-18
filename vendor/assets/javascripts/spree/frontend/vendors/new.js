var vendorRegistration = {
  el: "#vendor-registration",

  data: {

    form: {
      name: "",
      email: "",
      address: "",
      password: "",
      confirm_password: "",
    },

    state: {
      nameExists: "INITIAL",
      emailExists: "INITIAL",
      inputsDisabled: false,
      passwordMatched: false,
    }
  },

  methods: {
    vendorNameExists: function () {
      console.log('Checking vendor name exists');
      var state = this.state;
      state.nameExists = "CHECKING";
      state.inputsDisabled = true;

      axios.post("/vendors/register/validate/vendor_name", {
        vendor_name: this.form.name
      }).then(function (response) {
        console.log(response);
        state.nameExists = response.data.exists ? "YES" : "NO";
      }).catch(function (error) {
        state.nameExists = "YES";
      }).then(function () {
        state.inputsDisabled = false;
      });
    },

    emailExists: function () {
      console.log('Checking vendor email exists');
      var state = this.state;
      state.emailExists = "CHECKING";
      state.inputsDisabled = true;

      axios.post("/vendors/register/validate/vendor_email", {
        email: this.form.email
      }).then(function (response) {
        console.log(response);
        state.emailExists = response.data.exists ? "YES" : "NO";
      }).catch(function (error) {
        state.emailExists = "YES";
      }).then(function () {
        state.inputsDisabled = false;
      });
    },

    validatePasswords: function () {
      console.log('Validating Password');
      var state = this.state;
      state.passwordMatched = false;

      if ((this.form.password) !== null && (this.form.password) !== '' && this.form.password === this.form.confirm_password) {
        state.passwordMatched = true;
      }
    }

  }
};
