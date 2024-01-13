// Render Prop
import React from "react";
import "./App.css";
import { Input, Select, Button } from "antd";
import InputMask from "react-input-mask";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Basic = () => {
  return (
    <div className="main">
      <h1>Registration form</h1>
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
            errors.firstName = "Enter the name from 2 to 25 characters";
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
            alert("Вы успешно зарегистрировались!");
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <p className="container">
              <label className="input-container" htmlFor="firstName">
                <a className="title">Full Name</a>
              </label>
              <Field
                className="inputAll"
                type="input"
                name="firstName"
                id="firstName"
                required
              />
              <ErrorMessage
                className="errorMessage"
                name="firstName"
                component="div"
              />
            </p>
            <p className="container">
              <label htmlFor="email">
                <a className="title">Email</a>
              </label>
              <Field
                className="inputAll "
                name="email"
                id="email"
                placeholder="some@some.some"
              />
              <ErrorMessage
                className="errorMessage"
                name="email"
                component="div"
              />
            </p>
            <p className="container">
              <label htmlFor="password">
                <a className="title">Password</a>
              </label>
              <Field
                className="inputAll"
                type="password"
                name="password"
                id="password"
              />
              <ErrorMessage
                className="errorMessage"
                name="password"
                component="div"
              />
            </p>
            <p className="container">
              <label htmlFor="password2">
                <a className="title">Check password</a>
              </label>
              <Field
                className="inputAll"
                type="password"
                name="password2"
                id="password2"
              />
              <ErrorMessage
                className="errorMessage"
                name="password2"
                component="div"
              />
            </p>
            <p className="container">
              <label htmlFor="date">
                <a className="title">Date of birth</a>
              </label>
              <Field
                className="inputAll"
                type="date"
                id="date"
                name="date"
                value={values.date}
                onChange={(e) => setFieldValue("date", e.currentTarget.value)}
              />
              <ErrorMessage
                className="errorMessage"
                name="date"
                component="div"
              />
            </p>
            <p className="container">
              <label htmlFor="gender">
                <a className="title">Gender</a>
              </label>
              <Select
                as={Select}
                value={values.gender}
                placeholder="Choose"
                name="gender"
                id="gender"
                className="genderField"
                onChange={(value) => setFieldValue("gender", value)}
              >
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
              <ErrorMessage
                className="errorMessage"
                name="gender"
                component="div"
              />
            </p>

            <p className="container input-container">
              <label htmlFor="phoneNumber">
                <a className="title">Phone number</a>
              </label>
              <InputMask
                className="inputAll"
                mask="+375 (99) 999-99-99"
                value={values.phoneNumber}
                onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
                placeholder="+375 (29) 777-77-77"
                id="phoneNumber"
              />
              <ErrorMessage
                className="errorMessage"
                name="phoneNumber"
                component="div"
              />
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="buttonPush"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Basic;
