/**
 * Created by ranganathan on 11/4/16.
 */

$(document).ready(function() {

    $('#signupform').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            fields: {
                'newUser[FirstName]': {
                    validators: {
                        stringLength: {
                            min: 3,
                        },
                        notEmpty: {
                            message: 'Please supply your first name'
                        }
                    }
                },
                'newUser[LastName]': {
                    validators: {
                        stringLength: {
                            min: 3,
                        },
                        notEmpty: {
                            message: 'Please supply your last name'
                        }
                    }
                },
                'newUser[Email]': {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your email address'
                        },
                        emailAddress: {
                            message: 'Please supply a valid email address'
                        }
                    }
                },


                'signupInfo[Password]': {
                    validators: {

                        stringLength: {
                            min: 6,
                        },

                        notEmpty: {
                            message: 'The password is required and can\'t be empty'
                        },

                    }
                },

                confirmPassword: {
                    validators: {

                        notEmpty: {
                            message: 'The confirm password is required and can\'t be empty'
                        },


                        identical: {
                            field: 'signupInfo[Password]',
                            message: 'The password does not match'
                        }
                    }
                },

            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow")
            $('#signupform').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $('input[name!=confirmPassword]', "#signupform").serializeJSON(), function(result) {
                if(result['status'] == 'OK')
                    window.location.replace("/")
            }, 'json');
        });




});