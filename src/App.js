// Render Prop
import React from "react";
import InputMask from "react-input-mask";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Basic = () => {
  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          password: "",
          password2: "",
          date: "",
          gender: "",
          phoneNumber: "",
        }}
        validate={(values) => {
          const errors = {};
          const today = new Date();
          const year18 = today.getFullYear() - 18;
          const date18 = new Date(year18, today.getMonth(), today.getDate());
          const birthDate = new Date(values.date);

          if (!/^[а-яёА-ЯЁA-Z0-9._%+-]{2,25}$/i.test(values.firstName)) {
            errors.firstName =
              "Enter the name in Cyrillic or Latin from 2 to 25 characters";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password =
              "Length must be at least 6 characters and capitalized!";
          } else if (!/[A-Z]/.test(values.password)) {
            errors.password = "At least one uppercase letter is required!";
          }

          if (!values.password2) {
            errors.password2 = "Required";
          } else if (values.password2.length < 6) {
            errors.password2 =
              "Length must be at least 6 characters and capitalized!";
          } else if (!/[A-Z]/.test(values.password)) {
            errors.password2 =
              "The password must contain at least one capital Latin letter!";
          } else if (values.password2 !== values.password) {
            errors.password2 = "Enter the correct identical password!";
          }

          if (!values.date) {
            errors.date = "Сhoose your date of birth";
          } else if (birthDate > today) {
            errors.date = "Сhoose correct date";
          } else if (birthDate > date18) {
            errors.date = "You are under 18 years old";
          }

          if (!values.gender) {
            errors.gender = "Сhoose your gender";
          }

          if (!values.phoneNumber) {
            errors.phoneNumber = "Write phone number";
          } else if (
            !/^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(values.phoneNumber)
          ) {
            errors.phoneNumber = "Write phone number correct";
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
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <label htmlFor="firstName">Full Name</label>
            <Field type="input" name="firstName" id="firstName" required />
            <ErrorMessage name="firstName" component="div" />
            <p />
            <label htmlFor="email">Email</label>
            <Field name="email" id="email" placeholder="some@some.some" />
            <ErrorMessage name="email" component="div" />
            <p />
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" />
            <p />
            <label htmlFor="password2">Check password</label>
            <Field type="password" name="password2" id="password2" />
            <ErrorMessage name="password2" component="div" />
            <p />
            <label htmlFor="date">Date of birth</label>
            <Field type="date" name="date" id="date" />
            <ErrorMessage name="date" component="div" />
            <p />
            <label htmlFor="gender">Gender</label>
            <Field
              as="select"
              value={values.gender}
              placeholder="Choose"
              name="gender"
              id="gender"
            >
              <option onSelected disabled selected></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="div" />
            <p />
            <label htmlFor="phoneNumber">Phone number</label>
            <InputMask
              mask="+375 (99) 999-99-99"
              value={values.phoneNumber}
              onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
              placeholder="+375 (29) 777-77-77"
              id="phoneNumber"
            />
            <ErrorMessage name="phoneNumber" component="div" />
            <p />
            <button type="submit" disabled={isSubmitting} onclick="enterNum()">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Basic;
