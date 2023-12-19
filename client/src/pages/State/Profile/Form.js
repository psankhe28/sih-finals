import React, { useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { supabase } from "../../../client";
import './Form.css'

export const StateForm = ({ token }) => {
  const [formData, setFormData] = useState({
    Name: "",
    CollegeId: "",
    HomeState: "",
    Institute: "",
    created_at: new Date().toISOString(),
    Email: "",
    Age: "",
    Gender: "",
    Address: "",
    Phone_no: "",
    ValidityYear:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("Students")
        .insert([formData]);

      if (error) {
        console.error("Error creating new user:", error.message);
        return;
      }

      console.log("New user created successfully:", data);
    } catch (error) {
      console.error("Error creating new user:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleInputChangeGender = (e) => {
    const {value } = e.target;

    // Mapping for Gender values
    const genderValue = {
      "0": "",
      "1": "Female",
      "2": "Male",
    };

    setFormData((prevData) => ({
      ...prevData,
      Gender: genderValue[value],
    }));
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4 text-center" style={{ fontWeight: "bold" }}>
          General information
        </h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="Name">
                <Form.Label>Name of the Person</Form.Label>
                {token && token.user ? (
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    defaultValue={token.user.user_metadata.full_name}
                    value={formData.Name}
                    onChange={handleInputChange}
                    id="Name"
                    name="Name"
                  />
                ) : (
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your name"
                    value={formData.Name}
                    onChange={handleInputChange}
                    id="Name"
                    name="Name"
                  />
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="regId">
                <Form.Label>State Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your clg id"
                  value={formData.CollegeId}
                  onChange={handleInputChange}
                  id="CollegeId"
                  name="CollegeId"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="age">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter your age"
                  value={formData.Age}
                  onChange={handleInputChange}
                  id="Age"
                  name="Age"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                {token && token.user ? (
                  <Form.Control
                    type="email"
                    placeholder="address@gmail.com"
                    defaultValue={token.user.user_metadata.email}
                    value={formData.Email}
                    onChange={handleInputChange}
                    id="Email"
                    name="Email"
                  />
                ) : (
                  <Form.Control
                    required
                    type="email"
                    placeholder="address@gmail.com"
                    value={formData.Email}
                    onChange={handleInputChange}
                    id="Email"
                    name="Email"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};