import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import React, { useState } from 'react';


export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
    );

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    const [showAdded, setShowAdded] = useState(favouritesList.some(fav => fav.objectID === objectID));

    function favouritesClicked() {
        const artwork = {
            objectID,
            title: data.title || 'N/A',
            primaryImage: data.primaryImage,
            artistDisplayName: data.artistDisplayName,
            artistWikidata_URL: data.artistWikidata_URL
        };
        if (showAdded) {
            setFavouritesList(current => current.filter(fav => fav.objectID !== objectID));
            setShowAdded(false);
        } else {
            setFavouritesList(current => [...current, artwork]);
            setShowAdded(true);
        }
    }

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
                <div style={{ marginBottom: '10px' }}>
                    <Button
                        variant={showAdded ? 'primary' : 'outline-primary'}
                        onClick={favouritesClicked}
                    >
                        {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                    </Button>
                </div>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Card.Link>View Artwork {objectID}</Card.Link>
                </Link>
            </Card.Body>
        </Card>
    );
}
