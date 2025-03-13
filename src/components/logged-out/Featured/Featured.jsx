import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import leftShape from "/images/brush.png";


const FeaturedComponent = () => {
    return (
        <section className="featured-section">

            <div className="title-area made-title text-center">
                <div className="left-shape">
                    <img src={leftShape} alt="" />
                </div>
                <div className="fechard-title">
                    <h2 className="section-title">Featured in the media</h2>

                    <div className="border-area">
                        <div className="underline-border"></div>
                    </div>
                </div>
            </div>
            <Container className="featured-container">

                <Row className="justify-content-center">

                    <Col md={3} sm={12} className="featured-box">
                        <h3 className="featured-title">Parents</h3>
                        <p className="featured-text">
                            “Everything you need to know about your kid’s screen time is beautifully displayed on Qustodio’s online dashboard.”
                        </p>
                    </Col>
                    <Col md={3} sm={12} className="featured-box">
                        <h3 className="featured-title chicago-font">Chicago Tribune</h3>
                        <p className="featured-text">
                            “Makes device monitoring easy for parents.”
                        </p>
                    </Col>
                    <Col md={3} sm={12} className="featured-box">
                        <h3 className="featured-title">Mashable</h3>
                        <p className="featured-text">
                            “From YouTube monitoring to a panic button for kids away from home, Qustodio covers just about everything.”
                        </p>
                    </Col>
                    <Col md={3} sm={12} className="featured-box">
                        <h3 className="featured-title">BUSINESS INSIDER</h3>
                        <p className="featured-text">
                            “Most complete parental control application available.”
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default FeaturedComponent;
