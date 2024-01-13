// Render Prop
import React from "react";
import "./App.css";
import { Input, Select, Button } from "antd";
import InputMask from "react-input-mask";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Basic = () => {
  return (
    <div className="main">
      <h1>Форма регистрации</h1>
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
            errors.firstName = "Введите имя от 2 до 25 символов";
          }

          if (!values.email) {
            errors.email = "Введите email";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Неверный адрес электронной почты";
          }

          if (!values.password) {
            errors.password = "Введите пароль";
          } else if (values.password.length < 6) {
            errors.password =
              "Пароль должен быть не менее 6 символов и содержать большие буквы";
          } else if (!/[A-Z]/.test(values.password)) {
            errors.password =
              "Пароль должен содержать хотя бы одну большую букву";
          }

          if (!values.password2) {
            errors.password2 = "Введите пароль";
          } else if (values.password2.length < 6) {
            errors.password2 =
              "Пароль должен быть не менее 6 символов и содержать большие буквы";
          } else if (!/[A-Z]/.test(values.password)) {
            errors.password2 =
              "Пароль должен быть не менее 6 символов и содержать большие буквы";
          } else if (values.password2 !== values.password) {
            errors.password2 = "Введите идетичный пароль";
          }

          if (!values.date) {
            errors.date = "Выберите дату рождения";
          } else if (birthDate > today) {
            errors.date = "Выберите корректную дату рождения";
          } else if (birthDate > date18) {
            errors.date = "Вы моложе 18 лет";
          }

          if (!values.gender) {
            errors.gender = "ВЫберите свой пол";
          }

          if (!values.phoneNumber) {
            errors.phoneNumber = "Введите номер телефона";
          } else if (
            !/^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(values.phoneNumber)
          ) {
            errors.phoneNumber = "Введите корректный номер телефона";
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
                <a className="title">Имя</a>
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
                <a className="title">Пароль</a>
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
                <a className="title">Пароль (повторно)</a>
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
                <a className="title">Дата рождения</a>
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
                <a className="title">Пол</a>
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
                <Select.Option value="Male">Мужчина</Select.Option>
                <Select.Option value="Female">Женщина</Select.Option>
                <Select.Option value="Other">Другой</Select.Option>
              </Select>
              <ErrorMessage
                className="errorMessage"
                name="gender"
                component="div"
              />
            </p>

            <p className="container input-container">
              <label htmlFor="phoneNumber">
                <a className="title">Номер телефона</a>
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
