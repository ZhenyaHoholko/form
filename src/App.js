// Render Prop
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Basic = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          password: "",
          phoneNumber: "",
        }}
        validate={(values) => {
          const errors = {};
          if (values.firstName.length == 0) {
            errors.firstName = "Write Firstname";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "required";
          } else if (values.password.length < 6) {
            errors.password =
              "Length must be at least 6 characters and capitalized!";
          } else if (!/[A-Z]/.test(values.password)) {
            errors.password = "At least one uppercase letter is required!";
          } else if (values.password2 !== values.password) {
            errors.password = "Enter the correct identical password!";
          }

          if (!values.date) {
            errors.date = "Сhange your date of birth";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <a>Full Name </a>
            <p />
            <Field type="input" name="firstName" required></Field>
            <ErrorMessage name="firstName" component="div" />
            <p />
            <a>Email </a>
            <p />
            <Field
              type="email"
              name="email"
              required
              placeholder="some@some.some"
            />
            <p />
            <a>Password </a>
            <p />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <p />
            <a>Check password </a>
            <p />
            <Field type="password" name="password2" />
            <ErrorMessage name="password2" component="div" />
            <p />
            <a>Date of birth</a>
            <p />
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="div" />
            <p />
            <a>Gender</a>
            <p />
            <Field as="select" name="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
            <p />
            <ErrorMessage name="gender" component="div" />
            <Field name="phoneNumber">
              {({ field }) => (
                <InputMask
                  mask="+375 (99) 999-99-99"
                  {...field}
                  placeholder="+375 (29) 777-65-65"
                />
              )}
            </Field>
            <ErrorMessage name="phoneNumber" component="div" />
            <p />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Basic;
