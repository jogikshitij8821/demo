import React from 'react';
import { Carousel, Container, Card } from 'react-bootstrap';
import '../styles/reviewsection.css';

function Review() {
  const donorReviews = [
    {
      id: 1,
      name: 'Donor1',
      rating: 5,
      text: "I've been using this donation app for a while now, and it's been an amazing experience. It's so easy to make donations to my favorite causes, and the app keeps me informed about the impact of my contributions. It's a great way to make a positive difference in the world.",
    },
    {
      id: 2,
      name: 'Donor2',
      rating: 5,
      text: 'I love how this app allows me to support multiple charities effortlessly. The user interface is intuitive, and the ability to set up recurring donations ensures that I can continue to give regularly. ',
    },
    {
      id: 3,
      name: 'Donor3',
      rating: 4,
      text: 'This donation app is a fantastic way to give back to the community. It\'s reliable and secure, and I appreciate the transparency in reporting how my donations are used. It would be even better if it offered more payment options.',
    },
    // Add more donor reviews here as needed
  ];

  return (
    <Container className="mt-5">
      <Carousel controls={false} indicators={false} interval={3000} className="custom-carousel" slide={true}>
        {donorReviews.map((review) => (
          <Carousel.Item key={review.id}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>{review.name}</Card.Title>
                <Card.Text>{review.text}</Card.Text>
                <div className="rating">
                  {[...Array(review.rating)].map((_, index) => (
                    <span key={index} className="star">⭐</span>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Review;
