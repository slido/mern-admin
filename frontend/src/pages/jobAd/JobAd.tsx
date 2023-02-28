import { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "../../api/api";
import "./jobAd.scss";
interface FormValues {
  inputTitle: string;
  inputSalary: string;
  inputSkills: string;
  inputCompany: string;
  inputContract: string;
}

const JobAd: FC = () => {
  const validationSchema = Yup.object().shape({
    inputTitle: Yup.string().required("inputData is required"),
    inputSalary: Yup.string().required("inputData is required"),
    inputSkills: Yup.string().required("inputData is required"),
    inputCompany: Yup.string().required("inputData is required"),
    inputContract: Yup.string().required("inputData is required"),
  });

  const [loadedResponse, setLoadedResponse] = useState();

  return (
    <div className="newBlogForm">
      <div className="top">
        <h1>Write a job ad</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <Formik
            initialValues={{
              inputTitle: "",
              inputSalary: "",
              inputSkills: "",
              inputCompany: "",
              inputContract: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues) => {
              const url = "/ai/business/jobad";
              console.log("waaat");
              const postData = {
                title: values.inputTitle,
                salary: values.inputSalary,
                skills: values.inputSkills,
                company: values.inputCompany,
                contract: values.inputContract,
              };

              try {
                post(url, postData).then((response) => {
                  setLoadedResponse(response.data.output);
                });
              } catch {
                console.log("error");
              }
            }}
          >
            {() => (
              <Form>
                <div className="formInput" key={12}>
                  <h2>Job data</h2>

                  <Field
                    className="inputForm"
                    as={TextField}
                    type="text"
                    name="inputTitle"
                    placeholder="Enter a job title"
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage name="name" component="div" />
                  <Field
                    className="inputForm"
                    as={TextField}
                    type="text"
                    name="inputSalary"
                    placeholder="Enter a salary for this job"
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage name="name" component="div" />
                  <Field
                    className="inputForm"
                    as={TextField}
                    type="text"
                    name="inputSkills"
                    placeholder="Enter skills needed for this job"
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage name="name" component="div" />
                  <Field
                    className="inputForm"
                    as={TextField}
                    type="text"
                    name="inputCompany"
                    placeholder="Enter a Company whos ofering job"
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage name="name" component="div" />
                  <Field
                    className="inputForm"
                    as={TextField}
                    type="text"
                    name="inputContract"
                    placeholder="Enter a type of contract"
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage name="name" component="div" />
                </div>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="right">
          <h2>Results</h2>
          <p> {loadedResponse}</p>
        </div>
      </div>
    </div>
  );
};

export default JobAd;
