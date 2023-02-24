import { useState } from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';

const ArtworkCard = ({ objectID }) => {
    const [isLoading, setIsLoading] = useState(true);

    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
        async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
                const error = new Error('An error occurred while fetching the data.');
                error.info = await res.json();
                error.status = res.status;
                throw error;
            }
            return res.json();
        }
    );

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    const { title = 'N/A', objectDate = 'N/A', classification = 'N/A', medium = 'N/A', primaryImageSmall } = data;

    const imageSrc = primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

    return (
        <Card>
            <Card.Img variant="top" src={imageSrc} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate}
                    <br />
                    <strong>Classification:</strong> {classification}
                    <br />
                    <strong>Medium:</strong> {medium}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="primary">{objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ArtworkCard;
