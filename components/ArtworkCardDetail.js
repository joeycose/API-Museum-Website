import useSWR from 'swr';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Error from 'next/error';

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    const {
        title,
        primaryImage,
        objectDate,
        classification,
        medium,
        artistDisplayName,
        artistWikidata_URL,
        creditLine,
        dimensions,
    } = data;

    return (
        <Card>
            {primaryImage && <Card.Img variant="top" src={primaryImage} />}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    Object Date: {objectDate || 'N/A'}
                    <br />
                    Classification: {classification || 'N/A'}
                    <br />
                    Medium: {medium || 'N/A'}
                    <br />
                    <br />
                    {artistDisplayName && (
                        <>
                            Artist: {artistDisplayName}{' '}
                            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                                wiki
                            </a>
                            <br />
                        </>
                    )}
                    Credit Line: {creditLine || 'N/A'}
                    <br />
                    Dimensions: {dimensions || 'N/A'}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Card.Link>View Artwork {objectID}</Card.Link>
                </Link>
            </Card.Body>
        </Card>
    );
}
