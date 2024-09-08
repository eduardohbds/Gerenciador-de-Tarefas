import React from 'react';
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
    name: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
    });
    const handleSubmit = (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>) => {
        console.log(values);
        setSubmitting(false);
    }

    return (
        <div className="mx-auto max-w-md space-y-6" >
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Create an account</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your details to get started.
                </p>
            </div>
            <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ handleSubmit }: FormikProps<FormValues>) => (
                    <Form className="space-y-4" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Field type="text" name="name" as={Form.Control} />
                            <Form.Control.Feedback type="invalid" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Field type="text" name="email" as={Form.Control} />
                            <Form.Control.Feedback type="invalid" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Email</Form.Label>
                            <Field type="text" name="email" as={Form.Control} />
                            <Form.Control.Feedback type="invalid" />
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Register;