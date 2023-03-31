export default function ArtworkCardDetail({ artwork, onFavouriteToggle, isFavourited }) {
    const objectID = artwork.objectID;
    const { data, error } = useSWR(
        objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
    );

    const [showAdded, setShowAdded] = useState(isFavourited);

    useEffect(() => {
        setShowAdded(isFavourited);
    }, [isFavourited]);

    useEffect(() => {
        if (data) {
            setShowAdded(favouritesList.some((fav) => fav.objectID === objectID));
        }
    }, [favouritesList, data, objectID]);

    function favouritesClicked() {
        const artwork = {
            objectID,
            title: data.title || 'N/A',
            primaryImage: data.primaryImage,
            artistDisplayName: data.artistDisplayName,
            artistWikidata_URL: data.artistWikidata_URL
        };
        onFavouriteToggle(objectID);
        setShowAdded(!showAdded);
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
        dimensions
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
                        className="favourite-btn"
                        data-artwork-id={objectID}
                    >
                        {showAdded ? '+ Favorite (added)' : '+ Favorite'}
                    </Button>
                </div>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Card.Link>View Artwork {objectID}</Card.Link>
                </Link>
            </Card.Body>
        </Card>
    );
}
