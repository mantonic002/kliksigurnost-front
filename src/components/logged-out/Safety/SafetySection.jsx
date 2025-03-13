import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/autoplay";
import '../../../styles/components/Safety.css';
import saftyImg from "/images/happy_family_brush.png";

const brands = [
    "/images/clients-1.png",
    "/images/clients-2.png",
    "/public/images/clients-3.png",
    "/public/images/clients-4.png",
    "/public/images/clients-5.png",
    "/public/images/clients-6.png",
    "/public/images/clients-7.png",
    "/public/images/clients-8.png"
];

const SafetySection = () => {
    return (
        <section className="safety-section">
            <Container className="text-center">
                <div className="title-area made-title text-center">
                    <h5>QUSTODIO IN NUMBERS</h5>
                    <h2 className="section-title">Family safety in expert hands</h2>
                    <div className="border-area">
                        <div className="underline-border"></div>
                    </div>
                </div>
                <Row className="stats py-4 align-items-center">
                    <Col lg={6} className="d-flex justify-content-center">
                        <div className="safety-img">
                            <img src={saftyImg} alt="Safety" className="img-fluid" />
                        </div>
                    </Col>
                    <Col lg={6} className="card-p">
                        <div className="safety-card">
                            <Row>
                                <Col md={6} className="mb-4"> {/* Added margin-bottom for spacing */}
                                    <div className="stat-box">
                                        <h1>3 billion</h1>
                                        <p>Threats averted</p>
                                    </div>
                                </Col>
                                <Col md={6} className="mb-4"> {/* Added margin-bottom for spacing */}
                                    <div className="stat-box">
                                        <h1>7 million</h1>
                                        <p>Families protected</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className="stat-box flex items-center gap-2">
                                        <h1 className="text-xl font-bold mb-0">4.3</h1>
                                        <div className="flex text-yellow-500 stars">
                                            {[...Array(5)].map((_, i) =>
                                                i < 4 ? <FaStar key={i} /> : <FaRegStar key={i} />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-3">Top-rated app</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <h5 className="mt-4">FEATURED IN</h5>
                <Swiper
                    spaceBetween={30}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    className="brand-slider"
                    breakpoints={{
                        320: { slidesPerView: 4 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    {brands.map((brand, index) => (
                        <SwiperSlide key={index}>
                            <img src={`/images/${brand}`} alt="brand" className="brand-logo" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
};

export default SafetySection;