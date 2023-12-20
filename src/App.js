// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Basic = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ firstName: "", email: "", password: "" }}
      validate={(values) => {
        const errors = {};
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
            "Length must be at least 6 characters and capitalized";
        } else if (!/[A-Z]/.test(values.password)) {
          errors.password = "At least one uppercase letter is required";
        } else if (values.password2 !== values.password) {
          errors.password = "Enter the correct identical password";
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
          <a>First Name</a>
          <p />
          <Field type="input" name="firstName" required></Field>
          <p />
          <a>Email</a>
          <p />
          <Field type="email" name="email" required />
          <p />
          <a>Password</a>
          <p />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <p />
          <a>Check password</a>
          <p />
          <Field type="password" name="password2" />
          <ErrorMessage name="password2" component="div" />
          <p />
          <button type="submit" disabled={isSubmitting} onclick="enterNum()">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Basic;
