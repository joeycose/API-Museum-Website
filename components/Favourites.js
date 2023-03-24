import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCardDetail from './ArtworkCardDetail';
import { useEffect } from 'react'

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    useEffect(() => {
        const storedFavouritesList = localStorage.getItem('favouritesList');
        if (storedFavouritesList) {
            const parsedFavouritesList = JSON.parse(storedFavouritesList);
            const newFavouritesList = parsedFavouritesList.filter(
                (fav) => !favouritesList.some((f) => f.objectID === fav.objectID)
            );
            setFavouritesList([...favouritesList, ...newFavouritesList]);
        }
    }, [favouritesList, setFavouritesList]);

    useEffect(() => { // new useEffect hook to update localStorage
        localStorage.setItem('favouritesList', JSON.stringify(favouritesList));
    }, [favouritesList]);

    const handleFavouriteToggle = (objectID) => {
        const index = favouritesList.findIndex((fav) => fav.objectID === objectID);
        if (index !== -1) {
            const updatedList = [...favouritesList];
            updatedList.splice(index, 1);
            setFavouritesList(updatedList);
        } else {
            const artwork = {
                objectID,
                title: "",
                primaryImage: "",
                artistDisplayName: "",
                artistWikidata_URL: "",
            };
            setFavouritesList((currentList) => [...currentList, artwork]);
        }
    };

    return (
        <div className="container">
            <h1>Favourites</h1>
            {favouritesList.length === 0 ? (
                <p>Nothing Here. Try adding some new artwork to the list.</p>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {favouritesList.map(({ objectID }) => (
                        <div className="col" key={objectID}>
                            <ArtworkCardDetail
                                objectID={objectID}
                                onFavouriteToggle={() => handleFavouriteToggle(objectID)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
