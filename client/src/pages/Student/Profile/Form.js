import React, { useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { supabase } from "../../../client";

export const StudentForm = ({ token }) => {
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
                <Form.Label>Name</Form.Label>
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
                <Form.Label>College Id</Form.Label>
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
                <Form.Label>Age</Form.Label>
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
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  defaultValue="0"
                  value={formData.Gender === "Female" ? "1" : formData.Gender === "Male" ? "2" : "0"}
                  onChange={handleInputChangeGender}
                  id="Gender"
                  name="Gender"
                >
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={7} className="mb-3">
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

            <Col md={5} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                {token && token.user ? (
                  <Form.Control
                    type="number"
                    placeholder="+91 xxxxxxxxxx"
                    defaultValue={token.user.phone}
                    readOnly
                    id="Phone_no"
                    name="Phone_no"
                  />
                ) : (
                  <Form.Control
                    required
                    type="number"
                    placeholder="+91 xxxxxxxxxx"
                    value={formData.Phone_no}
                    onChange={handleInputChange}
                    id="Phone_no"
                    name="Phone_no"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="institute">
                <Form.Label>Institution Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your institute name"
                  value={formData.Institute}
                  onChange={handleInputChange}
                  id="Institute"
                  name="Institute"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">
            <b>Address</b>
          </h5>
          <Row>
            <Col sm={8} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your address"
                  value={formData.Address}
                  onChange={handleInputChange}
                  id="Address"
                  name="Address"
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2" id="state">
                <Form.Label>Home State</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="State"
                  value={formData.HomeState}
                  onChange={handleInputChange}
                  id="HomeState"
                  name="HomeState"
                />
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