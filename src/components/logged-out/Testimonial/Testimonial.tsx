import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/components/Testimonials.css";
import { Container } from "react-bootstrap";
import leftShape from "../../../../public/images/brush.png";

const testimonials = [
  {
    name: "Darija",
    title: "Majka troje dece",
    image: "../../../../public/images/marija.png", // Replace with actual image URL
    quote:
      "KlikSigurnost mi je konačno omogućio da budem mirna dok su moja deca na internetu. Sada znam da su zaštićeni od neprimerenog sadržaja i mogu bez brige da im dam telefon.",
    color: "#22c55e",
  },
  {
    name: "Maja",
    title: "Majka troje dece",
    image: "../../../../public/images/maja.png", // Replace with actual image URL
    quote:
      "U našoj porodici digitalni uređaji su deo svakodnevnog života, ali nam je važno i vreme bez ekrana. KlikSigurnost nam pomaže da pronađemo tu pravu ravnotežu.",
    color: "#6366f1",
  },
  {
    name: "Dejan",
    title: "Otac jedne ćerke",
    image: "../../../../public/images/dejan.png", // Replace with actual image URL
    quote:
      "Pre nego što sam instalirao KlikSigurnost, nisam imao uvid u to koliko vremena moja ćerka provodi na telefonu i koje aplikacije koristi. Sada mogu lako da pratim njenu aktivnost i postavim zdrave granice, bez narušavanja njene privatnosti.",
    color: "#facc15",
  },
  {
    name: "Petra",
    title: "Majka dve devojcice",
    image: "../../../../public/images/petra.png", // Replace with actual image URL
    quote:
      "Uz KlikSigurnost, ne moram da brinem da li su moja deca bezbedna na internetu. Sada im mogu dati više slobode, znajući da su zaštićena od opasnosti.",
    color: "#facc15",
  },
  {
    name: "Marina",
    title: "Majka dva dečaka",
    image: "../../../../public/images/marina.jpg", // Replace with actual image URL
    quote:
      "Mojim sinovima je internet deo svakodnevnice, ali sam želela način da ih zaštitim bez stalnog nadgledanja. KlikSigurnost mi je dao upravo to – bezbedno okruženje bez nepotrebnih zabrana.",
    color: "#22c55e",
  },
  {
    name: "Mira",
    title: "Majka jedne devojcice",
    image: "../../../../public/images/mira.png", // Replace with actual image URL
    quote:
      "Pre nego što smo počeli da koristimo KlikSigurnost, brinula sam šta sve moje dete može videti na internetu. Sada imam potpunu kontrolu i mogu da budem sigurna da je zaštićena od neprikladnog sadržaja.",
    color: "#facc15",
  },
];

const TestimonialSlider = () => {
  return (
    <section className="testimonial-section">
      <Container>
        <div className="title-area made-title text-center">
          <div className="left-shape">
            <img src={leftShape} alt="" />
          </div>
          <div className="fechard-title">
            <h2 className="section-title">
              Iskustva roditelja koji koriste KlikSigurnost
            </h2>

            <div className="border-area">
              <div className="underline-border"></div>
            </div>
          </div>
        </div>
        <div className="testimonial-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonial-slider"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="testimonial-card">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-img"
                />
                <h4>{testimonial.name}</h4>
                <p className="testimonial-title">{testimonial.title}</p>
                <p
                  className="testimonial-quote"
                  style={{ borderLeftColor: testimonial.color }}
                >
                  <FaQuoteLeft
                    className="quote-icon"
                    style={{ color: testimonial.color, marginRight: "8px" }}
                  />
                  {testimonial.quote}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination"></div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSlider;
