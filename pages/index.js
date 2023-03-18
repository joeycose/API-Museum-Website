/*********************************************************************************
* BTI425 – Assignment 4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Giuseppe Cosentino Student / Date: March 11, 2023
*
********************************************************************************/

import Layout from "@/components/Layout";
import React from "react";
import { Image, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Layout>
        <Row>
          <Col md={6}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
              fluid
              rounded
            />
          </Col>
          <Col md={6}>
            <p>
              The Metropolitan Museum of Art, colloquially "the Met," is located in New York City and is the largest art museum in the United States. With 6.3 million visitors in 2019, it is also the third most visited art museum in the world. Its permanent collection contains over 2 million works, divided among 17 curatorial departments.
            </p>
            <p>
              <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
                Learn more about the Metropolitan Museum of Art on Wikipedia.
              </a>
            </p>
          </Col>
        </Row>
      </Layout>
    </>
  );
}
